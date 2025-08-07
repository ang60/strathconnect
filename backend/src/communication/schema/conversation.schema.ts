import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum ConversationType {
  DIRECT = 'direct',
  GROUP = 'group',
  PROGRAM = 'program',
}

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: String, enum: ConversationType, default: ConversationType.DIRECT })
  type: ConversationType;

  @Prop({ type: [Types.ObjectId], ref: 'User', required: true })
  participants: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  admins: Types.ObjectId[];

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  avatar: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Program' })
  program: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Session' })
  session: Types.ObjectId;

  @Prop({ type: Object })
  lastMessage: {
    content?: string;
    sender?: Types.ObjectId;
    timestamp?: Date;
    type?: string;
  };

  @Prop({ type: Map, of: Date })
  lastSeen: Map<string, Date>;

  @Prop({ type: Map, of: Boolean })
  muted: Map<string, boolean>;

  @Prop({ type: Map, of: Boolean })
  archived: Map<string, boolean>;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: Object })
  settings: {
    allowFileSharing?: boolean;
    allowVoiceMessages?: boolean;
    requireApproval?: boolean;
    maxParticipants?: number;
  };
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
