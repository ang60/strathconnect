import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  COORDINATOR = 'coordinator',
  MENTOR = 'mentor',
  MENTEE = 'mentee',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: UserRole;

  @Prop()
  department: string;

  @Prop()
  position: string;

  @Prop()
  bio: string;

  @Prop()
  avatar: string;

  @Prop({ type: [String] })
  skills: string[];

  @Prop({ type: [String] })
  interests: string[];

  @Prop({ type: [String] })
  expertise: string[];

  @Prop({ default: UserStatus.PENDING })
  status: UserStatus;

  @Prop()
  refreshToken: string;

  @Prop()
  lastLogin: Date;

  @Prop({ type: [String] })
  preferences: string[];

  @Prop({ type: Object })
  profile: {
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
    experience?: number;
    education?: string;
  };

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  connections: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  blockedUsers: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
