import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserStatus } from './schema/user.schema';
import { Role } from '../auth/rbac/roles.enum';
import { FilterQuery, Model, UpdateQuery, Types } from 'mongoose';
import { CreateUserRequest } from './dto/create-user.request';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: CreateUserRequest) {
    const existingUser = await this.userModel.findOne({ email: data.email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await new this.userModel({
      ...data,
      role: data.role || Role.COACHEE, // Default to COACHEE if no role provided
      status: UserStatus.PENDING, // All new users start with PENDING status
      password: await hash(data.password, 10),
    }).save();
    return user.toObject();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async getUser(query: FilterQuery<User>) {
    const user = await this.userModel.findOne(query);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toObject();
  }

  async getUsers(filters?: {
    role?: Role;
    department?: string;
    status?: UserStatus;
  }) {
    const query: FilterQuery<User> = {};
    
    if (filters?.role) {
      query.role = filters.role;
    }
    if (filters?.department) {
      query.department = filters.department;
    }
    if (filters?.status) {
      query.status = filters.status;
    }

    return this.userModel.find(query).select('-password -refreshToken');
  }

  async getCoaches() {
    return this.userModel.find({ 
      role: Role.COACH, 
      status: UserStatus.ACTIVE 
    }).select('-password -refreshToken');
  }

  async getCoachees() {
    return this.userModel.find({ 
      role: Role.COACHEE, 
      status: UserStatus.ACTIVE 
    }).select('-password -refreshToken');
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data, { new: true });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true }
    );
  }

  async updateLastLogin(userId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { lastLogin: new Date() },
      { new: true }
    );
  }

  async updateProfile(userId: string, profileData: Partial<User>) {
    return this.userModel.findByIdAndUpdate(
      userId,
      profileData,
      { new: true }
    ).select('-password -refreshToken');
  }

  async getOrCreateUser(data: CreateUserRequest) {
    const user = await this.userModel.findOne({ email: data.email });
    if (user) {
      return user.toObject();
    }
    return this.create(data);
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async getUsersByDepartment(department: string) {
    return this.userModel.find({ department }).select('-password -refreshToken');
  }

  async searchUsers(searchTerm: string) {
    return this.userModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { department: { $regex: searchTerm, $options: 'i' } },
      ],
    }).select('-password -refreshToken');
  }

  async assignRole(userId: string, role: Role) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { 
        role,
        status: UserStatus.ACTIVE // Activate user when role is assigned
      },
      { new: true }
    ).select('-password -refreshToken');
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user.toObject();
  }

  async getPendingUsers() {
    return this.userModel.find({ status: UserStatus.PENDING })
      .select('-password -refreshToken')
      .sort({ createdAt: -1 });
  }
}
