import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Program, ProgramStatus, ProgramType } from './schema/program.schema';
import { FilterQuery, Model, UpdateQuery, Types } from 'mongoose';
import { CreateProgramRequest } from './dto/create-program.request';
import { UpdateProgramRequest } from './dto/update-program.request';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(Program.name) private readonly programModel: Model<Program>,
  ) {}

  async create(data: CreateProgramRequest) {
    const program = await new this.programModel({
      ...data,
      currentParticipants: 0,
      metrics: {
        completionRate: 0,
        satisfactionScore: 0,
        totalSessions: 0,
        activeCoachingRelationships: 0,
      },
    }).save();
    return program.toObject();
  }

  async findAll(filters?: {
    status?: ProgramStatus;
    type?: ProgramType;
    department?: string;
  }) {
    const query: FilterQuery<Program> = {};
    
    if (filters?.status) {
      query.status = filters.status;
    }
    if (filters?.type) {
      query.type = filters.type;
    }
    if (filters?.department) {
      query.departments = filters.department;
    }

    return this.programModel.find(query).populate('coaches coordinators', 'name email avatar');
  }

  async findById(id: string) {
    const program = await this.programModel.findById(id)
      .populate('coaches coordinators participants', 'name email avatar role department');
    
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    
    return program.toObject();
  }

  async update(id: string, data: UpdateProgramRequest) {
    // Convert string IDs to ObjectId
    const updateData: any = { ...data };
    if (data.coordinator) {
      updateData.coordinator = new Types.ObjectId(data.coordinator);
    }
    if (data.participants) {
      updateData.participants = data.participants.map(id => new Types.ObjectId(id));
    }
    if (data.coaches) {
      updateData.coaches = data.coaches.map(id => new Types.ObjectId(id));
    }

    const program = await this.programModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('coaches coordinators participants', 'name email avatar role department');
    
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    
    return program.toObject();
  }

  async delete(id: string) {
    const program = await this.programModel.findByIdAndDelete(id);
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    return { message: 'Program deleted successfully' };
  }

  async addParticipant(programId: string, userId: string) {
    const program = await this.programModel.findById(programId);
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const userIdObjectId = new Types.ObjectId(userId);
    if (program.participants.includes(userIdObjectId)) {
      throw new ConflictException('User is already a participant');
    }

    if (program.maxParticipants && program.currentParticipants >= program.maxParticipants) {
      throw new ConflictException('Program is at maximum capacity');
    }

    program.participants.push(userIdObjectId);
    program.currentParticipants += 1;
    
    return await program.save();
  }

  async removeParticipant(programId: string, userId: string) {
    const program = await this.programModel.findById(programId);
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const userIdObjectId = new Types.ObjectId(userId);
    const participantIndex = program.participants.indexOf(userIdObjectId);
    if (participantIndex === -1) {
      throw new NotFoundException('User is not a participant in this program');
    }

    program.participants.splice(participantIndex, 1);
    program.currentParticipants = Math.max(0, program.currentParticipants - 1);
    
    return await program.save();
  }

  async addCoach(programId: string, userId: string) {
    const program = await this.programModel.findById(programId);
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const userIdObjectId = new Types.ObjectId(userId);
    if (program.coaches.includes(userIdObjectId)) {
      throw new ConflictException('User is already a coach');
    }

    program.coaches.push(userIdObjectId);
    return await program.save();
  }

  async removeCoach(programId: string, userId: string) {
    const program = await this.programModel.findById(programId);
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const userIdObjectId = new Types.ObjectId(userId);
    const coachIndex = program.coaches.indexOf(userIdObjectId);
    if (coachIndex === -1) {
      throw new NotFoundException('User is not a coach in this program');
    }

    program.coaches.splice(coachIndex, 1);
    return await program.save();
  }

  async getActivePrograms() {
    return this.programModel.find({ status: ProgramStatus.ACTIVE })
      .populate('coaches coordinators', 'name email avatar');
  }

  async getProgramsByType(type: ProgramType) {
    return this.programModel.find({ type })
      .populate('mentors coordinators', 'name email avatar');
  }

  async searchPrograms(searchTerm: string) {
    return this.programModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { tags: { $in: [new RegExp(searchTerm, 'i')] } },
      ],
    }).populate('mentors coordinators', 'name email avatar');
  }

  async updateMetrics(programId: string, metrics: Partial<Program['metrics']>) {
    const program = await this.programModel.findById(programId);
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    program.metrics = { ...program.metrics, ...metrics };
    return await program.save();
  }
}
