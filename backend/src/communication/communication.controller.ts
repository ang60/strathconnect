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
import { CommunicationService } from './communication.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/schema/user.schema';
import { ConversationType } from './schema/conversation.schema';
import { MessageType } from './schema/message.schema';

@ApiTags('communication')
@Controller('communication')
@UseGuards(JwtAuthGuard)
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @ApiOperation({ summary: 'Create conversation', description: 'Create a new conversation' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Conversation created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('conversations')
  async createConversation(
    @CurrentUser() user: User,
    @Body() data: {
      type: ConversationType;
      participants: string[];
      name?: string;
      description?: string;
      program?: string;
      session?: string;
    },
  ) {
    return await this.communicationService.createConversation(data);
  }

  @Get('conversations')
  async getConversations(@CurrentUser() user: User) {
    return await this.communicationService.getConversations(user._id.toString());
  }

  @Get('conversations/:id')
  async getConversation(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.communicationService.getConversation(id);
  }

  @Post('conversations/:id/messages')
  async sendMessage(
    @CurrentUser() user: User,
    @Param('id') conversationId: string,
    @Body() data: {
      recipient: string;
      content: string;
      type?: MessageType;
      attachments?: string[];
    },
  ) {
    return await this.communicationService.sendMessage({
      conversationId,
      sender: user._id.toString(),
      ...data,
    });
  }

  @Get('conversations/:id/messages')
  async getMessages(
    @CurrentUser() user: User,
    @Param('id') conversationId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return await this.communicationService.getMessages(
      conversationId,
      limit || 50,
      offset || 0,
    );
  }

  @Put('messages/:id/read')
  async markAsRead(
    @CurrentUser() user: User,
    @Param('id') messageId: string,
  ) {
    return await this.communicationService.markAsRead(messageId, user._id.toString());
  }

  @Put('conversations/:id/read')
  async markConversationAsRead(
    @CurrentUser() user: User,
    @Param('id') conversationId: string,
  ) {
    return await this.communicationService.markConversationAsRead(conversationId, user._id.toString());
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUser() user: User) {
    return await this.communicationService.getUnreadCount(user._id.toString());
  }

  @Delete('messages/:id')
  async deleteMessage(
    @CurrentUser() user: User,
    @Param('id') messageId: string,
  ) {
    return await this.communicationService.deleteMessage(messageId, user._id.toString());
  }

  @Put('messages/:id')
  async editMessage(
    @CurrentUser() user: User,
    @Param('id') messageId: string,
    @Body('content') content: string,
  ) {
    return await this.communicationService.editMessage(messageId, user._id.toString(), content);
  }

  @Get('search')
  async searchMessages(
    @CurrentUser() user: User,
    @Query('q') searchTerm: string,
  ) {
    return await this.communicationService.searchMessages(user._id.toString(), searchTerm);
  }

  @Get('direct/:userId')
  async getDirectConversation(
    @CurrentUser() user: User,
    @Param('userId') otherUserId: string,
  ) {
    return await this.communicationService.getDirectConversation(user._id.toString(), otherUserId);
  }

  @Put('conversations/:id/archive')
  async archiveConversation(
    @CurrentUser() user: User,
    @Param('id') conversationId: string,
  ) {
    return await this.communicationService.archiveConversation(conversationId, user._id.toString());
  }

  @Put('conversations/:id/unarchive')
  async unarchiveConversation(
    @CurrentUser() user: User,
    @Param('id') conversationId: string,
  ) {
    return await this.communicationService.unarchiveConversation(conversationId, user._id.toString());
  }

  @Put('conversations/:id/mute')
  async muteConversation(
    @CurrentUser() user: User,
    @Param('id') conversationId: string,
  ) {
    return await this.communicationService.muteConversation(conversationId, user._id.toString());
  }

  @Put('conversations/:id/unmute')
  async unmuteConversation(
    @CurrentUser() user: User,
    @Param('id') conversationId: string,
  ) {
    return await this.communicationService.unmuteConversation(conversationId, user._id.toString());
  }
}
