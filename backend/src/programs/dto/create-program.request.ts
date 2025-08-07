import { IsString, IsOptional, IsEnum, IsArray, IsNumber, IsDateString, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProgramStatus, ProgramType } from '../schema/program.schema';

export class CreateProgramPhaseRequest {
  @ApiProperty({ description: 'Phase name', example: 'Orientation Phase' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Phase description', example: 'Introduction to the program and participants' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Phase start date', example: '2024-01-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'Phase end date', example: '2024-02-15' })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({ description: 'Phase objectives', example: ['Learn basic concepts', 'Meet mentors'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  objectives?: string[];

  @ApiPropertyOptional({ description: 'Phase deliverables', example: ['Project proposal', 'Initial assessment'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  deliverables?: string[];

  @ApiPropertyOptional({ description: 'Phase order', example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateProgramRequest {
  @ApiProperty({ description: 'Program name', example: 'Software Engineering Mentorship Program' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Program description', example: 'A comprehensive mentorship program for software engineering students' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Program type', enum: ProgramType, example: ProgramType.CAREER })
  @IsEnum(ProgramType)
  type: ProgramType;

  @ApiProperty({ description: 'Program status', enum: ProgramStatus, example: ProgramStatus.ACTIVE })
  @IsEnum(ProgramStatus)
  status: ProgramStatus;

  @ApiPropertyOptional({ description: 'Program tags', example: ['Software Engineering', 'Career Development'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Required skills', example: ['JavaScript', 'React', 'Node.js'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ description: 'Program requirements', example: ['Basic programming knowledge', 'Commitment to learning'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @ApiPropertyOptional({ description: 'Program phases', type: [CreateProgramPhaseRequest] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProgramPhaseRequest)
  @IsArray()
  phases?: CreateProgramPhaseRequest[];

  @ApiPropertyOptional({ description: 'Program duration in weeks', example: 12 })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional({ description: 'Maximum number of participants', example: 50 })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @ApiPropertyOptional({ description: 'Mentor user IDs', example: ['507f1f77bcf86cd799439011'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mentors?: string[];

  @ApiPropertyOptional({ description: 'Coordinator user IDs', example: ['507f1f77bcf86cd799439012'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coordinators?: string[];

  @ApiPropertyOptional({ description: 'Program start date', example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Program end date', example: '2024-04-15' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Program settings' })
  @IsOptional()
  @IsObject()
  settings?: {
    allowSelfEnrollment?: boolean;
    requireApproval?: boolean;
    maxMenteesPerMentor?: number;
    sessionFrequency?: string;
    sessionDuration?: number;
  };

  @ApiPropertyOptional({ description: 'Program resources', example: ['Course materials', 'Online tools'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resources?: string[];

  @ApiPropertyOptional({ description: 'Program image URL', example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Target departments', example: ['Computer Science', 'Engineering'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  departments?: string[];
}
