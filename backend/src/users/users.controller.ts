import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Query, 
  UseGuards,
  ParseEnumPipe,
  ParseIntPipe,
  DefaultValuePipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User, UserRole, UserStatus } from './schema/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user', description: 'Create a new user account' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return await this.usersService.create(request);
  }

  @ApiOperation({ summary: 'Get users', description: 'Get all users with optional filtering' })
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ name: 'role', enum: UserRole, required: false, description: 'Filter by user role' })
  @ApiQuery({ name: 'department', required: false, description: 'Filter by department' })
  @ApiQuery({ name: 'status', enum: UserStatus, required: false, description: 'Filter by user status' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(
    @CurrentUser() user: User,
    @Query('role') role?: UserRole,
    @Query('department') department?: string,
    @Query('status') status?: UserStatus,
  ) {
    return this.usersService.getUsers({ role, department, status });
  }

  @Get('mentors')
  @UseGuards(JwtAuthGuard)
  async getMentors(@CurrentUser() user: User) {
    return this.usersService.getMentors();
  }

  @Get('mentees')
  @UseGuards(JwtAuthGuard)
  async getMentees(@CurrentUser() user: User) {
    return this.usersService.getMentees();
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchUsers(
    @CurrentUser() user: User,
    @Query('q') searchTerm: string,
  ) {
    return this.usersService.searchUsers(searchTerm);
  }

  @Get('department/:department')
  @UseGuards(JwtAuthGuard)
  async getUsersByDepartment(
    @CurrentUser() user: User,
    @Param('department') department: string,
  ) {
    return this.usersService.getUsersByDepartment(department);
  }

  @ApiOperation({ summary: 'Get current user profile', description: 'Get the current authenticated user profile' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return this.usersService.findById(user._id.toString());
  }

  @ApiOperation({ summary: 'Get current user profile', description: 'Get the current authenticated user profile' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return this.usersService.findById(user._id.toString());
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: User,
    @Body() profileData: Partial<User>,
  ) {
    return this.usersService.updateProfile(user._id.toString(), profileData);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateData: Partial<User>,
  ) {
    return this.usersService.updateUser({ _id: id }, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return this.usersService.deleteUser(id);
  }
}
