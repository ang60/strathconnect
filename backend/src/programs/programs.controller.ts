import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { CreateProgramRequest } from './dto/create-program.request';
import { UpdateProgramRequest } from './dto/update-program.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/schema/user.schema';
import { ProgramStatus, ProgramType } from './schema/program.schema';

@ApiTags('programs')
@Controller('programs')
@UseGuards(JwtAuthGuard)
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @ApiOperation({ summary: 'Create program', description: 'Create a new mentorship program' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Program created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createProgram(
    @CurrentUser() user: User,
    @Body() data: CreateProgramRequest,
  ) {
    return await this.programsService.create(data);
  }

  @ApiOperation({ summary: 'Get programs', description: 'Get all programs with optional filtering' })
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ name: 'status', enum: ProgramStatus, required: false, description: 'Filter by program status' })
  @ApiQuery({ name: 'type', enum: ProgramType, required: false, description: 'Filter by program type' })
  @ApiQuery({ name: 'department', required: false, description: 'Filter by department' })
  @ApiResponse({ status: 200, description: 'Programs retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async getPrograms(
    @CurrentUser() user: User,
    @Query('status') status?: ProgramStatus,
    @Query('type') type?: ProgramType,
    @Query('department') department?: string,
  ) {
    return await this.programsService.findAll({ status, type, department });
  }

  @Get('active')
  async getActivePrograms(@CurrentUser() user: User) {
    return await this.programsService.getActivePrograms();
  }

  @Get('search')
  async searchPrograms(
    @CurrentUser() user: User,
    @Query('q') searchTerm: string,
  ) {
    return await this.programsService.searchPrograms(searchTerm);
  }

  @Get('type/:type')
  async getProgramsByType(
    @CurrentUser() user: User,
    @Param('type') type: ProgramType,
  ) {
    return await this.programsService.getProgramsByType(type);
  }

  @Get(':id')
  async getProgram(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.programsService.findById(id);
  }

  @Put(':id')
  async updateProgram(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() data: UpdateProgramRequest,
  ) {
    return await this.programsService.update(id, data);
  }

  @Delete(':id')
  async deleteProgram(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.programsService.delete(id);
  }

  @Post(':id/participants')
  async addParticipant(
    @CurrentUser() user: User,
    @Param('id') programId: string,
    @Body('userId') userId: string,
  ) {
    return await this.programsService.addParticipant(programId, userId);
  }

  @Delete(':id/participants/:userId')
  async removeParticipant(
    @CurrentUser() user: User,
    @Param('id') programId: string,
    @Param('userId') userId: string,
  ) {
    return await this.programsService.removeParticipant(programId, userId);
  }

  @Post(':id/mentors')
  async addMentor(
    @CurrentUser() user: User,
    @Param('id') programId: string,
    @Body('userId') userId: string,
  ) {
    return await this.programsService.addMentor(programId, userId);
  }

  @Delete(':id/mentors/:userId')
  async removeMentor(
    @CurrentUser() user: User,
    @Param('id') programId: string,
    @Param('userId') userId: string,
  ) {
    return await this.programsService.removeMentor(programId, userId);
  }
}
