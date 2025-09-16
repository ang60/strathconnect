import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum SessionStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum SessionType {
  VIRTUAL = 'virtual',
  IN_PERSON = 'in_person',
  HYBRID = 'hybrid',
}

@Schema({ timestamps: true })
export class Session {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  status: SessionStatus;

  @Prop({ required: true })
  type: SessionType;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  coach: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  coachee: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Program' })
  program: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Goal' })
  goal: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop()
  duration: number; // in minutes

  @Prop()
  location: string;

  @Prop()
  meetingLink: string;

  @Prop({ type: [String] })
  topics: string[];

  @Prop({ type: [String] })
  objectives: string[];

  @Prop({ type: [String] })
  agenda: string[];

  @Prop({ type: [String] })
  notes: string[];

  @Prop({ type: Object })
  feedback: {
    coach?: {
      rating?: number;
      comments?: string;
      coacheeEngagement?: number;
      goalProgress?: number;
    };
    coachee?: {
      rating?: number;
      comments?: string;
      coachEffectiveness?: number;
      sessionValue?: number;
    };
  };

  @Prop({ type: Object })
  metrics: {
    actualDuration?: number;
    topicsCovered?: number;
    objectivesMet?: number;
    followUpRequired?: boolean;
  };

  @Prop({ type: [String] })
  attachments: string[];

  @Prop({ type: [String] })
  resources: string[];

  @Prop()
  reminderSent: boolean;

  @Prop()
  reminderSentAt: Date;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: Object })
  settings: {
    allowRecording?: boolean;
    requirePreparation?: boolean;
    sendReminders?: boolean;
    autoReschedule?: boolean;
  };
}

export const SessionSchema = SchemaFactory.createForClass(Session);
