import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum MessageType {
  TEXT = 'text',
  FILE = 'file',
  IMAGE = 'image',
  SYSTEM = 'system',
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Conversation', required: true })
  conversationId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  recipient: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: String, enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @Prop({ default: false })
  read: boolean;

  @Prop()
  readAt: Date;

  @Prop({ type: [String] })
  attachments: string[];

  @Prop({ type: Object })
  metadata: {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    thumbnail?: string;
  };

  @Prop({ default: false })
  edited: boolean;

  @Prop()
  editedAt: Date;

  @Prop({ default: false })
  deleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
