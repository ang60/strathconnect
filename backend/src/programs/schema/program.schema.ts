import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum ProgramStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum ProgramType {
  LEADERSHIP = 'leadership',
  CAREER = 'career',
  SKILLS = 'skills',
  PERSONAL = 'personal',
  TECHNICAL = 'technical',
}

@Schema({ timestamps: true })
export class ProgramPhase {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: [String] })
  objectives: string[];

  @Prop({ type: [String] })
  deliverables: string[];

  @Prop({ default: 0 })
  order: number;
}

@Schema({ timestamps: true })
export class Program {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: ProgramType;

  @Prop({ required: true })
  status: ProgramStatus;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [String] })
  skills: string[];

  @Prop({ type: [String] })
  requirements: string[];

  @Prop({ type: [ProgramPhase] })
  phases: ProgramPhase[];

  @Prop()
  duration: number; // in weeks

  @Prop()
  maxParticipants: number;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  mentors: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  participants: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  coordinators: Types.ObjectId[];

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: 0 })
  currentParticipants: number;

  @Prop({ type: Object })
  settings: {
    allowSelfEnrollment?: boolean;
    requireApproval?: boolean;
    maxMenteesPerMentor?: number;
    sessionFrequency?: string;
    sessionDuration?: number;
  };

  @Prop({ type: Object })
  metrics: {
    completionRate?: number;
    satisfactionScore?: number;
    totalSessions?: number;
    activeMentorships?: number;
  };

  @Prop({ type: [String] })
  resources: string[];

  @Prop()
  image: string;

  @Prop({ type: [String] })
  departments: string[];
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
