import { IsEmail, IsStrongPassword, IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../auth/rbac/roles.enum';

export class CreateUserRequest {
  @ApiProperty({ description: 'User email address', example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password (must be strong)', example: 'StrongP@ssw0rd123' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'User role in the platform (assigned by admin)', enum: Role, example: Role.COACHEE })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({ description: 'User department', example: 'Computer Science' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({ description: 'User position/title', example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({ description: 'User bio/description', example: 'Passionate about mentoring and learning' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ description: 'User skills', example: ['JavaScript', 'React', 'Node.js'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ description: 'User interests', example: ['Web Development', 'AI', 'Open Source'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @ApiPropertyOptional({ description: 'User expertise areas', example: ['Frontend Development', 'Backend Development'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  expertise?: string[];
}
