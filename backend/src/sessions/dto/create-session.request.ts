import { IsString, IsOptional, IsEnum, IsArray, IsDateString, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SessionStatus, SessionType } from '../schema/session.schema';

export class CreateSessionRequest {
  @ApiProperty({ description: 'Session title', example: 'React Fundamentals Review' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Session description', example: 'Review of React fundamentals and component lifecycle' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Session status', enum: SessionStatus, example: SessionStatus.SCHEDULED })
  @IsEnum(SessionStatus)
  status: SessionStatus;

  @ApiProperty({ description: 'Session type', enum: SessionType, example: SessionType.VIRTUAL })
  @IsEnum(SessionType)
  type: SessionType;

  @ApiPropertyOptional({ description: 'Mentee user ID', example: '507f1f77bcf86cd799439011' })
  @IsOptional()
  @IsString()
  mentee?: string;

  @ApiPropertyOptional({ description: 'Program ID', example: '507f1f77bcf86cd799439012' })
  @IsOptional()
  @IsString()
  program?: string;

  @ApiPropertyOptional({ description: 'Goal ID', example: '507f1f77bcf86cd799439013' })
  @IsOptional()
  @IsString()
  goal?: string;

  @ApiProperty({ description: 'Session start time', example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ description: 'Session end time', example: '2024-01-15T11:00:00Z' })
  @IsDateString()
  endTime: string;

  @ApiPropertyOptional({ description: 'Session duration in minutes', example: 60, minimum: 15, maximum: 480 })
  @IsOptional()
  @IsNumber()
  @Min(15)
  @Max(480)
  duration?: number;

  @ApiPropertyOptional({ description: 'Session location', example: 'Room 101, Building A' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Meeting link for virtual sessions', example: 'https://meet.google.com/abc-defg-hij' })
  @IsOptional()
  @IsString()
  meetingLink?: string;

  @ApiPropertyOptional({ description: 'Session topics', example: ['React Hooks', 'State Management', 'Component Lifecycle'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  topics?: string[];

  @ApiPropertyOptional({ description: 'Session objectives', example: ['Understand React Hooks', 'Learn state management patterns'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  objectives?: string[];

  @ApiPropertyOptional({ description: 'Session agenda', example: ['Introduction (5 min)', 'Hooks overview (20 min)', 'Practice (30 min)', 'Q&A (5 min)'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  agenda?: string[];

  @ApiPropertyOptional({ description: 'Session tags', example: ['React', 'Frontend', 'Tutorial'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Session resources', example: ['React documentation', 'Code examples', 'Slides'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resources?: string[];
}
