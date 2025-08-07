import { IsOptional, IsString, IsEnum, IsNumber, IsArray, IsDateString, IsObject } from 'class-validator';
import { GoalStatus, GoalPriority } from '../schema/goal.schema';

export class UpdateGoalRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mentor?: string; // Will be converted to ObjectId

  @IsOptional()
  @IsString()
  program?: string; // Will be converted to ObjectId

  @IsOptional()
  @IsEnum(GoalStatus)
  status?: GoalStatus;

  @IsOptional()
  @IsEnum(GoalPriority)
  priority?: GoalPriority;

  @IsOptional()
  @IsNumber()
  progress?: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  milestones?: Array<{
    title: string;
    description?: string;
    dueDate?: string;
    completed?: boolean;
    completedAt?: string;
  }>;

  @IsOptional()
  @IsObject()
  feedback?: {
    mentor?: string;
    mentee?: string;
    rating?: number;
  };

  @IsOptional()
  @IsObject()
  metrics?: {
    tasksCompleted?: number;
    timeSpent?: number;
    checkIns?: number;
  };
}
