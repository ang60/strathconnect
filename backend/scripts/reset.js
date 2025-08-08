const mongoose = require('mongoose');
require('dotenv').config();

// Import schemas
const { User } = require('../src/users/schema/user.schema');
const { Program } = require('../src/programs/schema/program.schema');
const { Goal } = require('../src/goals/schema/goal.schema');
const { Session } = require('../src/sessions/schema/session.schema');
const { Conversation } = require('../src/communication/schema/conversation.schema');
const { Message } = require('../src/communication/schema/message.schema');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/strathconnect');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function resetDatabase() {
  try {
    console.log('🗑️  Resetting database...');
    
    // Delete all documents from all collections
    const collections = [User, Program, Goal, Session, Conversation, Message];
    
    for (const collection of collections) {
      const result = await collection.deleteMany({});
      console.log(`✅ Cleared ${collection.collection.name}: ${result.deletedCount} documents`);
    }
    
    console.log('🎉 Database reset completed successfully!');
    
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

if (require.main === module) {
  resetDatabase();
}

module.exports = { resetDatabase };
