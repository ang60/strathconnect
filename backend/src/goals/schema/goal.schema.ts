import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum GoalStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum GoalPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Schema({ timestamps: true })
export class GoalMilestone {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ default: false })
  completed: boolean;

  @Prop()
  completedAt: Date;

  @Prop({ default: 0 })
  order: number;
}

@Schema({ timestamps: true })
export class Goal {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  status: GoalStatus;

  @Prop({ required: true })
  priority: GoalPriority;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  coachee: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  coach: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Program' })
  program: Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  targetDate: Date;

  @Prop()
  completedDate: Date;

  @Prop({ type: [GoalMilestone] })
  milestones: GoalMilestone[];

  @Prop({ default: 0 })
  progress: number; // 0-100

  @Prop({ type: [String] })
  objectives: string[];

  @Prop({ type: [String] })
  deliverables: string[];

  @Prop({ type: Object })
  metrics: {
    timeSpent?: number;
    sessionsCompleted?: number;
    tasksCompleted?: number;
    totalTasks?: number;
  };

  @Prop({ type: [String] })
  resources: string[];

  @Prop({ type: [String] })
  notes: string[];

  @Prop({ type: Object })
  feedback: {
    coach?: string;
    coachee?: string;
    rating?: number;
  };

  @Prop({ type: [String] })
  attachments: string[];
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
