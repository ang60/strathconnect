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
import { GoalsService } from './goals.service';
import { CreateGoalRequest } from './dto/create-goal.request';
import { UpdateGoalRequest } from './dto/update-goal.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/schema/user.schema';
import { GoalStatus, GoalPriority } from './schema/goal.schema';

@ApiTags('goals')
@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @ApiOperation({ summary: 'Create goal', description: 'Create a new goal for the current user' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Goal created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createGoal(
    @CurrentUser() user: User,
    @Body() data: CreateGoalRequest,
  ) {
    return await this.goalsService.create(data, user._id.toString());
  }

  @Get()
  async getGoals(
    @CurrentUser() user: User,
    @Query('status') status?: GoalStatus,
    @Query('priority') priority?: GoalPriority,
    @Query('mentorId') mentorId?: string,
  ) {
    const filters: any = {};
    
    if (user.role === 'coachee') {
      filters.coacheeId = user._id.toString();
    } else if (user.role === 'coach') {
      filters.coachId = user._id.toString();
    }
    
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (mentorId) filters.mentorId = mentorId;

    return await this.goalsService.findAll(filters);
  }

  @Get('my-goals')
  async getMyGoals(@CurrentUser() user: User) {
    if (user.role === 'coachee') {
      return await this.goalsService.getGoalsByCoachee(user._id.toString());
    } else if (user.role === 'coach') {
      return await this.goalsService.getGoalsByCoach(user._id.toString());
    }
    return [];
  }

  @Get('search')
  async searchGoals(
    @CurrentUser() user: User,
    @Query('q') searchTerm: string,
  ) {
    return await this.goalsService.searchGoals(searchTerm);
  }

  @Get(':id')
  async getGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.goalsService.findById(id);
  }

  @Put(':id')
  async updateGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() data: UpdateGoalRequest,
  ) {
    return await this.goalsService.update(id, data);
  }

  @Delete(':id')
  async deleteGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.goalsService.delete(id);
  }

  @Put(':id/progress')
  async updateProgress(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body('progress') progress: number,
  ) {
    return await this.goalsService.updateProgress(id, progress);
  }

  @Put(':id/milestones/:milestoneIndex/complete')
  async completeMilestone(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Param('milestoneIndex') milestoneIndex: number,
  ) {
    return await this.goalsService.completeMilestone(id, milestoneIndex);
  }

  @Put(':id/feedback')
  async addFeedback(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() feedback: { mentor?: string; mentee?: string; rating?: number },
  ) {
    return await this.goalsService.addFeedback(id, feedback);
  }
}
