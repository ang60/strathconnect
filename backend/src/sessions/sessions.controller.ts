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
import { SessionsService } from './sessions.service';
import { CreateSessionRequest } from './dto/create-session.request';
import { UpdateSessionRequest } from './dto/update-session.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/schema/user.schema';
import { SessionStatus, SessionType } from './schema/session.schema';

@ApiTags('sessions')
@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @ApiOperation({ summary: 'Create session', description: 'Create a new coaching session' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Session created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createSession(
    @CurrentUser() user: User,
    @Body() data: CreateSessionRequest,
  ) {
    return await this.sessionsService.create(data, user._id.toString());
  }

  @Get()
  async getSessions(
    @CurrentUser() user: User,
    @Query('status') status?: SessionStatus,
    @Query('type') type?: SessionType,
    @Query('coacheeId') coacheeId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const filters: any = {};
    
    if (user.role === 'coach') {
      filters.coachId = user._id.toString();
    } else if (user.role === 'coachee') {
      filters.coacheeId = user._id.toString();
    }
    
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (coacheeId) filters.coacheeId = coacheeId;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    return await this.sessionsService.findAll(filters);
  }

  @Get('upcoming')
  async getUpcomingSessions(@CurrentUser() user: User) {
    return await this.sessionsService.getUpcomingSessions(user._id.toString(), user.role);
  }

  @Get('past')
  async getPastSessions(@CurrentUser() user: User) {
    return await this.sessionsService.getPastSessions(user._id.toString(), user.role);
  }

  @Get('stats')
  async getSessionStats(@CurrentUser() user: User) {
    return await this.sessionsService.getSessionStats(user._id.toString(), user.role);
  }

  @Get('search')
  async searchSessions(
    @CurrentUser() user: User,
    @Query('q') searchTerm: string,
  ) {
    return await this.sessionsService.searchSessions(searchTerm);
  }

  @Get(':id')
  async getSession(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.sessionsService.findById(id);
  }

  @Put(':id')
  async updateSession(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() data: UpdateSessionRequest,
  ) {
    return await this.sessionsService.update(id, data);
  }

  @Delete(':id')
  async deleteSession(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.sessionsService.delete(id);
  }

  @Put(':id/status')
  async updateSessionStatus(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body('status') status: SessionStatus,
  ) {
    return await this.sessionsService.updateStatus(id, status);
  }

  @Put(':id/feedback')
  async addFeedback(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() feedback: any,
  ) {
    return await this.sessionsService.addFeedback(id, feedback, user.role);
  }

  @Put(':id/notes')
  async addNotes(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body('notes') notes: string[],
  ) {
    return await this.sessionsService.addNotes(id, notes);
  }
}
