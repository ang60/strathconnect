import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Goal, GoalStatus, GoalPriority } from './schema/goal.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateGoalRequest } from './dto/create-goal.request';
import { UpdateGoalRequest } from './dto/update-goal.request';

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel(Goal.name) private readonly goalModel: Model<Goal>,
  ) {}

  async create(data: CreateGoalRequest, menteeId: string) {
    const goal = await new this.goalModel({
      ...data,
      mentee: menteeId,
      metrics: {
        timeSpent: 0,
        sessionsCompleted: 0,
        tasksCompleted: 0,
        totalTasks: data.milestones?.length || 0,
      },
    }).save();
    return goal.toObject();
  }

  async findAll(filters?: {
    menteeId?: string;
    mentorId?: string;
    status?: GoalStatus;
    priority?: GoalPriority;
  }) {
    const query: FilterQuery<Goal> = {};
    
    if (filters?.menteeId) {
      query.mentee = filters.menteeId;
    }
    if (filters?.mentorId) {
      query.mentor = filters.mentorId;
    }
    if (filters?.status) {
      query.status = filters.status;
    }
    if (filters?.priority) {
      query.priority = filters.priority;
    }

    return this.goalModel.find(query)
      .populate('mentee mentor program', 'name email avatar role department');
  }

  async findById(id: string) {
    const goal = await this.goalModel.findById(id)
      .populate('mentee mentor program', 'name email avatar role department');
    
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    
    return goal.toObject();
  }

  async update(id: string, data: UpdateGoalRequest) {
    // Convert string IDs to ObjectId
    const updateData: any = { ...data };
    if (data.mentor) {
      updateData.mentor = new Types.ObjectId(data.mentor);
    }
    if (data.program) {
      updateData.program = new Types.ObjectId(data.program);
    }

    const goal = await this.goalModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('mentee mentor program', 'name email avatar role department');
    
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    
    return goal.toObject();
  }

  async delete(id: string) {
    const goal = await this.goalModel.findByIdAndDelete(id);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    return { message: 'Goal deleted successfully' };
  }

  async updateProgress(id: string, progress: number) {
    const goal = await this.goalModel.findById(id);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.progress = Math.max(0, Math.min(100, progress));
    
    if (goal.progress === 100 && goal.status !== GoalStatus.COMPLETED) {
      goal.status = GoalStatus.COMPLETED;
      goal.completedDate = new Date();
    }

    return await goal.save();
  }

  async completeMilestone(goalId: string, milestoneIndex: number) {
    const goal = await this.goalModel.findById(goalId);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (milestoneIndex < 0 || milestoneIndex >= goal.milestones.length) {
      throw new NotFoundException('Milestone not found');
    }

    goal.milestones[milestoneIndex].completed = true;
    goal.milestones[milestoneIndex].completedAt = new Date();

    // Update progress based on completed milestones
    const completedMilestones = goal.milestones.filter(m => m.completed).length;
    goal.progress = Math.round((completedMilestones / goal.milestones.length) * 100);

    // Update metrics
    goal.metrics.tasksCompleted = completedMilestones;

    if (goal.progress === 100 && goal.status !== GoalStatus.COMPLETED) {
      goal.status = GoalStatus.COMPLETED;
      goal.completedDate = new Date();
    }

    return await goal.save();
  }

  async getGoalsByMentee(menteeId: string) {
    return this.goalModel.find({ mentee: menteeId })
      .populate('mentor program', 'name email avatar role department');
  }

  async getGoalsByMentor(mentorId: string) {
    return this.goalModel.find({ mentor: mentorId })
      .populate('mentee program', 'name email avatar role department');
  }

  async getGoalsByStatus(status: GoalStatus) {
    return this.goalModel.find({ status })
      .populate('mentee mentor program', 'name email avatar role department');
  }

  async searchGoals(searchTerm: string) {
    return this.goalModel.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { tags: { $in: [new RegExp(searchTerm, 'i')] } },
      ],
    }).populate('mentee mentor program', 'name email avatar role department');
  }

  async addFeedback(goalId: string, feedback: { mentor?: string; mentee?: string; rating?: number }) {
    const goal = await this.goalModel.findById(goalId);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.feedback = { ...goal.feedback, ...feedback };
    return await goal.save();
  }

  async updateMetrics(goalId: string, metrics: Partial<Goal['metrics']>) {
    const goal = await this.goalModel.findById(goalId);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.metrics = { ...goal.metrics, ...metrics };
    return await goal.save();
  }
}
