import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionStatus, SessionType } from './schema/session.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateSessionRequest } from './dto/create-session.request';
import { UpdateSessionRequest } from './dto/update-session.request';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
  ) {}

  async create(data: CreateSessionRequest, coachId: string) {
    const session = await new this.sessionModel({
      ...data,
      coach: coachId,
    }).save();
    return session.toObject();
  }

  async findAll(filters?: {
    coachId?: string;
    coacheeId?: string;
    status?: SessionStatus;
    type?: SessionType;
    startDate?: Date;
    endDate?: Date;
  }) {
    const query: FilterQuery<Session> = {};
    
    if (filters?.coachId) {
      query.coach = filters.coachId;
    }
    if (filters?.coacheeId) {
      query.coachee = filters.coacheeId;
    }
    if (filters?.status) {
      query.status = filters.status;
    }
    if (filters?.type) {
      query.type = filters.type;
    }
    if (filters?.startDate || filters?.endDate) {
      query.startTime = {};
      if (filters.startDate) {
        query.startTime.$gte = filters.startDate;
      }
      if (filters.endDate) {
        query.startTime.$lte = filters.endDate;
      }
    }

    return this.sessionModel.find(query)
      .populate('coach coachee program goal', 'name email avatar role department title');
  }

  async findById(id: string) {
    const session = await this.sessionModel.findById(id)
      .populate('coach coachee program goal', 'name email avatar role department title');
    
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    
    return session.toObject();
  }

  async update(id: string, data: UpdateSessionRequest) {
    // Convert string IDs to ObjectId
    const updateData: any = { ...data };
    if (data.coachee) {
      updateData.coachee = new Types.ObjectId(data.coachee);
    }
    if (data.program) {
      updateData.program = new Types.ObjectId(data.program);
    }
    if (data.goal) {
      updateData.goal = new Types.ObjectId(data.goal);
    }

    const session = await this.sessionModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('coach coachee program goal', 'name email avatar role department title');
    
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    
    return session.toObject();
  }

  async delete(id: string) {
    const session = await this.sessionModel.findByIdAndDelete(id);
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return { message: 'Session deleted successfully' };
  }

  async updateStatus(id: string, status: SessionStatus) {
    const session = await this.sessionModel.findById(id);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    session.status = status;
    
    if (status === SessionStatus.COMPLETED) {
      session.metrics = {
        ...session.metrics,
        actualDuration: session.duration,
        topicsCovered: session.topics?.length || 0,
        objectivesMet: session.objectives?.length || 0,
      };
    }

    return await session.save();
  }

  async getUpcomingSessions(userId: string, role: string) {
    const query: FilterQuery<Session> = {
      startTime: { $gte: new Date() },
      status: { $in: [SessionStatus.SCHEDULED, SessionStatus.CONFIRMED] },
    };

    if (role === 'coach') {
      query.coach = userId;
    } else if (role === 'coachee') {
      query.coachee = userId;
    }

    return this.sessionModel.find(query)
      .populate('coach coachee program goal', 'name email avatar role department title')
      .sort({ startTime: 1 });
  }

  async getPastSessions(userId: string, role: string) {
    const query: FilterQuery<Session> = {
      startTime: { $lt: new Date() },
      status: { $in: [SessionStatus.COMPLETED, SessionStatus.CANCELLED, SessionStatus.NO_SHOW] },
    };

    if (role === 'coach') {
      query.coach = userId;
    } else if (role === 'coachee') {
      query.coachee = userId;
    }

    return this.sessionModel.find(query)
      .populate('coach coachee program goal', 'name email avatar role department title')
      .sort({ startTime: -1 });
  }

  async getSessionsByDateRange(startDate: Date, endDate: Date, userId?: string, role?: string) {
    const query: FilterQuery<Session> = {
      startTime: { $gte: startDate, $lte: endDate },
    };

    if (userId && role) {
      if (role === 'mentor') {
        query.mentor = userId;
      } else if (role === 'mentee') {
        query.mentee = userId;
      }
    }

    return this.sessionModel.find(query)
      .populate('coach coachee program goal', 'name email avatar role department title')
      .sort({ startTime: 1 });
  }

  async addFeedback(sessionId: string, feedback: any, userRole: string) {
    const session = await this.sessionModel.findById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (userRole === 'coach') {
      session.feedback.coach = feedback;
    } else if (userRole === 'coachee') {
      session.feedback.coachee = feedback;
    }

    return await session.save();
  }

  async addNotes(sessionId: string, notes: string[]) {
    const session = await this.sessionModel.findById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    session.notes = [...(session.notes || []), ...notes];
    return await session.save();
  }

  async searchSessions(searchTerm: string) {
    return this.sessionModel.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { topics: { $in: [new RegExp(searchTerm, 'i')] } },
      ],
    }).populate('coach coachee program goal', 'name email avatar role department title');
  }

  async getSessionStats(userId: string, role: string) {
    const query: FilterQuery<Session> = {};
    
    if (role === 'coach') {
      query.coach = userId;
    } else if (role === 'coachee') {
      query.coachee = userId;
    }

    const [total, completed, upcoming, cancelled] = await Promise.all([
      this.sessionModel.countDocuments(query),
      this.sessionModel.countDocuments({ ...query, status: SessionStatus.COMPLETED }),
      this.sessionModel.countDocuments({ 
        ...query, 
        startTime: { $gte: new Date() },
        status: { $in: [SessionStatus.SCHEDULED, SessionStatus.CONFIRMED] }
      }),
      this.sessionModel.countDocuments({ ...query, status: SessionStatus.CANCELLED }),
    ]);

    return {
      total,
      completed,
      upcoming,
      cancelled,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }
}
