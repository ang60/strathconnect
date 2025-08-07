import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageType } from './schema/message.schema';
import { Conversation, ConversationType } from './schema/conversation.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommunicationService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    @InjectModel(Conversation.name) private readonly conversationModel: Model<Conversation>,
  ) {}

  async createConversation(data: {
    type: ConversationType;
    participants: string[];
    name?: string;
    description?: string;
    program?: string;
    session?: string;
  }) {
    const conversation = await new this.conversationModel({
      ...data,
      isActive: true,
    }).save();
    return conversation.toObject();
  }

  async getConversations(userId: string) {
    return this.conversationModel.find({
      participants: userId,
      isActive: true,
    }).populate('participants lastMessage.sender', 'name email avatar role');
  }

  async getConversation(conversationId: string) {
    const conversation = await this.conversationModel.findById(conversationId)
      .populate('participants lastMessage.sender', 'name email avatar role');
    
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    
    return conversation.toObject();
  }

  async sendMessage(data: {
    conversationId: string;
    sender: string;
    recipient: string;
    content: string;
    type?: MessageType;
    attachments?: string[];
  }) {
    const message = await new this.messageModel({
      ...data,
      type: data.type || MessageType.TEXT,
    }).save();

    // Update conversation's last message
    await this.conversationModel.findByIdAndUpdate(data.conversationId, {
      lastMessage: {
        content: data.content,
        sender: data.sender,
        timestamp: new Date(),
        type: data.type || MessageType.TEXT,
      },
    });

    return message.toObject();
  }

  async getMessages(conversationId: string, limit = 50, offset = 0) {
    return this.messageModel.find({
      conversationId,
      deleted: false,
    })
      .populate('sender recipient', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);
  }

  async markAsRead(messageId: string, userId: string) {
    const message = await this.messageModel.findById(messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.recipient.toString() === userId && !message.read) {
      message.read = true;
      message.readAt = new Date();
      await message.save();
    }

    return message.toObject();
  }

  async markConversationAsRead(conversationId: string, userId: string) {
    await this.messageModel.updateMany(
      {
        conversationId,
        recipient: userId,
        read: false,
      },
      {
        read: true,
        readAt: new Date(),
      }
    );

    // Update last seen
    await this.conversationModel.findByIdAndUpdate(conversationId, {
      $set: { [`lastSeen.${userId}`]: new Date() },
    });
  }

  async getUnreadCount(userId: string) {
    return this.messageModel.countDocuments({
      recipient: userId,
      read: false,
      deleted: false,
    });
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await this.messageModel.findById(messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.sender.toString() !== userId) {
      throw new NotFoundException('You can only delete your own messages');
    }

    message.deleted = true;
    message.deletedAt = new Date();
    return await message.save();
  }

  async editMessage(messageId: string, userId: string, content: string) {
    const message = await this.messageModel.findById(messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.sender.toString() !== userId) {
      throw new NotFoundException('You can only edit your own messages');
    }

    message.content = content;
    message.edited = true;
    message.editedAt = new Date();
    return await message.save();
  }

  async searchMessages(userId: string, searchTerm: string) {
    return this.messageModel.find({
      $or: [
        { sender: userId },
        { recipient: userId },
      ],
      content: { $regex: searchTerm, $options: 'i' },
      deleted: false,
    })
      .populate('sender recipient conversationId', 'name email avatar')
      .sort({ createdAt: -1 });
  }

  async getDirectConversation(userId1: string, userId2: string) {
    return this.conversationModel.findOne({
      type: ConversationType.DIRECT,
      participants: { $all: [userId1, userId2] },
      isActive: true,
    });
  }

  async archiveConversation(conversationId: string, userId: string) {
    await this.conversationModel.findByIdAndUpdate(conversationId, {
      $set: { [`archived.${userId}`]: true },
    });
  }

  async unarchiveConversation(conversationId: string, userId: string) {
    await this.conversationModel.findByIdAndUpdate(conversationId, {
      $set: { [`archived.${userId}`]: false },
    });
  }

  async muteConversation(conversationId: string, userId: string) {
    await this.conversationModel.findByIdAndUpdate(conversationId, {
      $set: { [`muted.${userId}`]: true },
    });
  }

  async unmuteConversation(conversationId: string, userId: string) {
    await this.conversationModel.findByIdAndUpdate(conversationId, {
      $set: { [`muted.${userId}`]: false },
    });
  }
}
