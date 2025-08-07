import { IsOptional, IsString, IsEnum, IsDateString, IsObject, IsNumber, IsArray } from 'class-validator';
import { SessionStatus, SessionType } from '../schema/session.schema';

export class UpdateSessionRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mentee?: string; // Will be converted to ObjectId

  @IsOptional()
  @IsString()
  program?: string; // Will be converted to ObjectId

  @IsOptional()
  @IsString()
  goal?: string; // Will be converted to ObjectId

  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @IsOptional()
  @IsEnum(SessionType)
  type?: SessionType;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  meetingLink?: string;

  @IsOptional()
  @IsObject()
  feedback?: {
    mentee?: string;
    mentor?: string;
    rating?: number;
    comments?: string;
  };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notes?: string[];

  @IsOptional()
  @IsObject()
  metrics?: {
    duration?: number;
    attendance?: boolean;
    engagement?: number;
    satisfaction?: number;
  };
}
