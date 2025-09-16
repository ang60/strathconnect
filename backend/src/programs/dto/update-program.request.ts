import { IsOptional, IsString, IsEnum, IsArray, IsDateString, IsObject, IsNumber } from 'class-validator';
import { ProgramStatus, ProgramType } from '../schema/program.schema';

export class UpdateProgramPhaseRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  objectives?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  activities?: string[];
}

export class UpdateProgramRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProgramStatus)
  status?: ProgramStatus;

  @IsOptional()
  @IsEnum(ProgramType)
  type?: ProgramType;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  coordinator?: string; // Will be converted to ObjectId

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  participants?: string[]; // Will be converted to ObjectId[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coaches?: string[]; // Will be converted to ObjectId[]

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  phases?: UpdateProgramPhaseRequest[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  metrics?: {
    totalParticipants?: number;
    activeParticipants?: number;
    completedSessions?: number;
    averageRating?: number;
  };
}

