import { IsString, IsOptional, IsEnum, IsArray, IsDateString, ValidateNested, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalStatus, GoalPriority } from '../schema/goal.schema';

export class CreateGoalMilestoneRequest {
  @ApiProperty({ description: 'Milestone title', example: 'Complete project proposal' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Milestone description', example: 'Write and submit the initial project proposal' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Milestone due date', example: '2024-02-15' })
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional({ description: 'Milestone order', example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateGoalRequest {
  @ApiProperty({ description: 'Goal title', example: 'Learn React Development' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Goal description', example: 'Master React fundamentals and build a portfolio project' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Goal status', enum: GoalStatus, example: GoalStatus.IN_PROGRESS })
  @IsEnum(GoalStatus)
  status: GoalStatus;

  @ApiProperty({ description: 'Goal priority', enum: GoalPriority, example: GoalPriority.HIGH })
  @IsEnum(GoalPriority)
  priority: GoalPriority;

  @ApiPropertyOptional({ description: 'Goal tags', example: ['React', 'Frontend', 'Learning'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Coach user ID', example: '507f1f77bcf86cd799439011' })
  @IsOptional()
  @IsString()
  coach?: string;

  @ApiPropertyOptional({ description: 'Program ID', example: '507f1f77bcf86cd799439012' })
  @IsOptional()
  @IsString()
  program?: string;

  @ApiProperty({ description: 'Goal start date', example: '2024-01-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'Goal target date', example: '2024-04-15' })
  @IsDateString()
  targetDate: string;

  @ApiPropertyOptional({ description: 'Goal milestones', type: [CreateGoalMilestoneRequest] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateGoalMilestoneRequest)
  @IsArray()
  milestones?: CreateGoalMilestoneRequest[];

  @ApiPropertyOptional({ description: 'Goal progress percentage', example: 25, minimum: 0, maximum: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;

  @ApiPropertyOptional({ description: 'Goal objectives', example: ['Learn React basics', 'Build components', 'State management'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  objectives?: string[];

  @ApiPropertyOptional({ description: 'Goal deliverables', example: ['Portfolio website', 'Component library'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  deliverables?: string[];

  @ApiPropertyOptional({ description: 'Goal resources', example: ['React documentation', 'Online courses', 'Code examples'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resources?: string[];
}
