import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

// Import schemas
import { User, UserStatus, UserSchema } from '../src/users/schema/user.schema';
import { Role } from '../src/auth/rbac/roles.enum';
import { Program, ProgramStatus, ProgramType, ProgramSchema } from '../src/programs/schema/program.schema';
import { Goal, GoalStatus, GoalPriority, GoalSchema } from '../src/goals/schema/goal.schema';
import { Session, SessionStatus, SessionType, SessionSchema } from '../src/sessions/schema/session.schema';
import { Conversation, ConversationType, ConversationSchema } from '../src/communication/schema/conversation.schema';
import { Message, MessageType, MessageSchema } from '../src/communication/schema/message.schema';

dotenv.config();

// Create Mongoose models
const UserModel = mongoose.model(User.name, UserSchema);
const ProgramModel = mongoose.model(Program.name, ProgramSchema);
const GoalModel = mongoose.model(Goal.name, GoalSchema);
const SessionModel = mongoose.model(Session.name, SessionSchema);
const ConversationModel = mongoose.model(Conversation.name, ConversationSchema);
const MessageModel = mongoose.model(Message.name, MessageSchema);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/strathconnect');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function clearDatabase() {
  console.log('🗑️  Clearing existing data...');
  await UserModel.deleteMany({});
  await ProgramModel.deleteMany({});
  await GoalModel.deleteMany({});
  await SessionModel.deleteMany({});
  await ConversationModel.deleteMany({});
  await MessageModel.deleteMany({});
  console.log('✅ Database cleared');
}

async function createUsers() {
  console.log('👥 Creating users...');
  
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      role: Role.COACH,
      department: 'Computer Science',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Senior Software Engineer with 8+ years of experience in full-stack development. Passionate about coaching and helping others grow in their careers.',
      status: UserStatus.ACTIVE,
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      interests: ['Web Development', 'Cloud Computing', 'Open Source'],
      expertise: ['Frontend Development', 'Backend Architecture', 'DevOps'],
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: hashedPassword,
      role: Role.COACH,
      department: 'Business Administration',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Business Development Manager with expertise in strategic planning and team leadership. Dedicated to helping coachees develop their leadership skills.',
      status: UserStatus.ACTIVE,
      skills: ['Strategic Planning', 'Team Leadership', 'Project Management'],
      interests: ['Leadership Development', 'Business Strategy', 'Innovation'],
      expertise: ['Business Development', 'Leadership Training', 'Strategic Planning'],
    },
    {
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      password: hashedPassword,
      role: Role.COACHEE,
      department: 'Computer Science',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Junior Developer eager to learn and grow in the software development field. Looking for guidance on career advancement and technical skills.',
      status: UserStatus.ACTIVE,
      skills: ['JavaScript', 'HTML', 'CSS', 'React'],
      interests: ['Web Development', 'Mobile Apps', 'AI/ML'],
      goals: ['Become a Full-Stack Developer', 'Learn Advanced React', 'Contribute to Open Source'],
    },
    {
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      password: hashedPassword,
      role: Role.COACHEE,
      department: 'Business Administration',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Business student with a passion for entrepreneurship and innovation. Seeking coaching to develop leadership and business skills.',
      status: UserStatus.ACTIVE,
      skills: ['Business Analysis', 'Marketing', 'Financial Planning'],
      interests: ['Entrepreneurship', 'Digital Marketing', 'Social Impact'],
      goals: ['Start a Business', 'Develop Leadership Skills', 'Network Building'],
    },
    {
      name: 'Admin User',
      email: 'admin@strathconnect.com',
      password: hashedPassword,
      role: Role.ADMIN,
      department: 'Administration',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      bio: 'System administrator responsible for managing the StrathConnect platform and supporting users.',
      status: UserStatus.ACTIVE,
      skills: ['System Administration', 'Database Management', 'Security'],
      interests: ['Technology Management', 'Platform Development', 'User Support'],
      expertise: ['Platform Administration', 'Security Management', 'Technical Support'],
    },
  ];

  const createdUsers = await UserModel.insertMany(users);
  console.log(`✅ Created ${createdUsers.length} users`);
  return createdUsers;
}

async function createPrograms(users: any) {
  console.log('📚 Creating programs...');
  
  const programs = [
    {
      name: 'Software Engineering Coaching Program',
      description: 'A comprehensive coaching program designed to help aspiring software engineers develop their technical skills, build real-world projects, and advance their careers in the tech industry.',
      type: ProgramType.CAREER,
      status: ProgramStatus.ACTIVE,
      tags: ['Software Engineering', 'Career Development', 'Technical Skills'],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
      requirements: ['Basic programming knowledge', 'Commitment to learning', 'Willingness to work on projects'],
      duration: 12,
      maxParticipants: 30,
      currentParticipants: 2,
      coaches: [users.find(u => u.email === 'john.doe@example.com')?._id],
      coordinators: [users.find(u => u.email === 'admin@strathconnect.com')?._id],
      participants: [users.find(u => u.email === 'mike.johnson@example.com')?._id, users.find(u => u.email === 'sarah.wilson@example.com')?._id],
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-04-15'),
      departments: ['Computer Science', 'Engineering'],
      settings: {
        allowSelfEnrollment: true,
        requireApproval: false,
        maxCoacheesPerCoach: 5,
        sessionFrequency: 'weekly',
        sessionDuration: 60,
      },
      resources: ['Course materials', 'Online tools', 'Project templates'],
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop',
      phases: [
        {
          name: 'Foundation Phase',
          description: 'Build fundamental programming skills and understanding',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-02-15'),
          objectives: ['Learn core programming concepts', 'Understand software development lifecycle'],
          deliverables: ['Basic project portfolio', 'Code review skills'],
          order: 1,
        },
        {
          name: 'Advanced Development Phase',
          description: 'Work on advanced topics and real-world projects',
          startDate: new Date('2024-02-16'),
          endDate: new Date('2024-03-15'),
          objectives: ['Build complex applications', 'Learn advanced frameworks'],
          deliverables: ['Full-stack project', 'Deployment experience'],
          order: 2,
        },
        {
          name: 'Career Preparation Phase',
          description: 'Prepare for job interviews and career advancement',
          startDate: new Date('2024-03-16'),
          endDate: new Date('2024-04-15'),
          objectives: ['Interview preparation', 'Portfolio refinement'],
          deliverables: ['Professional portfolio', 'Interview skills'],
          order: 3,
        },
      ],
      metrics: {
        completionRate: 85,
        satisfactionScore: 4.2,
        totalSessions: 24,
        activeCoachingRelationships: 2,
      },
    },
    {
      name: 'Leadership Development Program',
      description: 'A coaching program focused on developing leadership skills, strategic thinking, and team management capabilities for future business leaders.',
      type: ProgramType.LEADERSHIP,
      status: ProgramStatus.ACTIVE,
      tags: ['Leadership', 'Management', 'Business Strategy'],
      skills: ['Strategic Planning', 'Team Leadership', 'Communication', 'Decision Making'],
      requirements: ['Interest in leadership', 'Team collaboration experience', 'Open to feedback'],
      duration: 8,
      maxParticipants: 20,
      currentParticipants: 1,
      coaches: [users.find(u => u.email === 'jane.smith@example.com')?._id],
      coordinators: [users.find(u => u.email === 'admin@strathconnect.com')?._id],
      participants: [users.find(u => u.email === 'sarah.wilson@example.com')?._id],
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-04-01'),
      departments: ['Business Administration', 'Management'],
      settings: {
        allowSelfEnrollment: true,
        requireApproval: true,
        maxMenteesPerMentor: 3,
        sessionFrequency: 'bi-weekly',
        sessionDuration: 90,
      },
      resources: ['Leadership books', 'Case studies', 'Assessment tools'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
      phases: [
        {
          name: 'Leadership Assessment',
          description: 'Evaluate current leadership skills and identify areas for growth',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-02-15'),
          objectives: ['Self-assessment', 'Leadership style identification'],
          deliverables: ['Leadership profile', 'Development plan'],
          order: 1,
        },
        {
          name: 'Skill Development',
          description: 'Develop core leadership competencies',
          startDate: new Date('2024-02-16'),
          endDate: new Date('2024-03-15'),
          objectives: ['Communication skills', 'Team building', 'Strategic thinking'],
          deliverables: ['Leadership project', 'Team leadership experience'],
          order: 2,
        },
        {
          name: 'Application & Practice',
          description: 'Apply leadership skills in real scenarios',
          startDate: new Date('2024-03-16'),
          endDate: new Date('2024-04-01'),
          objectives: ['Real-world application', 'Feedback integration'],
          deliverables: ['Leadership portfolio', 'Action plan'],
          order: 3,
        },
      ],
      metrics: {
        completionRate: 90,
        satisfactionScore: 4.5,
        totalSessions: 16,
        activeMentorships: 1,
      },
    },
  ];

  const createdPrograms = await ProgramModel.insertMany(programs);
  console.log(`✅ Created ${createdPrograms.length} programs`);
  
  return {
    softwareEngineering: createdPrograms.find(p => p.name.includes('Software Engineering')),
    leadership: createdPrograms.find(p => p.name.includes('Leadership')),
  };
}

async function createGoals(users: any, programs: any) {
  console.log('🎯 Creating goals...');
  
  const goals = [
    {
      title: 'Master React Development',
      description: 'Develop proficiency in React.js including hooks, context, and advanced patterns to build modern web applications.',
      priority: GoalPriority.HIGH,
      status: GoalStatus.IN_PROGRESS,
      progress: 60,
      coachee: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      coach: users.find(u => u.email === 'john.doe@example.com')?._id,
      program: programs.softwareEngineering._id,
      startDate: new Date('2024-01-15'),
      targetDate: new Date('2024-03-15'),
      milestones: [
        {
          title: 'Complete React Fundamentals',
          description: 'Learn React basics, components, and state management',
          dueDate: new Date('2024-01-30'),
          completed: true,
          completedAt: new Date('2024-01-25'),
        },
        {
          title: 'Build First React App',
          description: 'Create a complete React application with multiple components',
          dueDate: new Date('2024-02-15'),
          completed: true,
          completedAt: new Date('2024-02-10'),
        },
        {
          title: 'Learn Advanced React Patterns',
          description: 'Master hooks, context, and advanced React concepts',
          dueDate: new Date('2024-03-01'),
          completed: false,
        },
        {
          title: 'Deploy React Application',
          description: 'Deploy the final project to a production environment',
          dueDate: new Date('2024-03-15'),
          completed: false,
        },
      ],
      tags: ['React', 'Frontend', 'JavaScript'],
      objectives: ['Build responsive web applications', 'Understand React ecosystem', 'Deploy applications'],
      deliverables: ['Portfolio website', 'React component library', 'Deployed application'],
      metrics: {
        timeSpent: 45,
        sessionsCompleted: 8,
        tasksCompleted: 2,
        totalTasks: 4,
      },
      feedback: {
        coach: 'Excellent progress! Mike has shown great dedication to learning React.',
        coachee: 'The coaching has been incredibly helpful. I feel much more confident with React.',
        rating: 5,
      },
    },
    {
      title: 'Develop Leadership Skills',
      description: 'Build essential leadership competencies including communication, team management, and strategic thinking.',
      priority: GoalPriority.HIGH,
      status: GoalStatus.IN_PROGRESS,
      progress: 40,
      coachee: users.find(u => u.email === 'sarah.wilson@example.com')?._id,
      coach: users.find(u => u.email === 'jane.smith@example.com')?._id,
      program: programs.leadership._id,
      startDate: new Date('2024-02-01'),
      targetDate: new Date('2024-04-01'),
      milestones: [
        {
          title: 'Leadership Assessment',
          description: 'Complete leadership style assessment and identify growth areas',
          dueDate: new Date('2024-02-15'),
          completed: true,
          completedAt: new Date('2024-02-10'),
        },
        {
          title: 'Communication Skills Workshop',
          description: 'Participate in communication and presentation workshops',
          dueDate: new Date('2024-03-01'),
          completed: true,
          completedAt: new Date('2024-02-28'),
        },
        {
          title: 'Team Leadership Project',
          description: 'Lead a small team project to practice leadership skills',
          dueDate: new Date('2024-03-15'),
          completed: false,
        },
        {
          title: 'Leadership Portfolio',
          description: 'Create a comprehensive leadership portfolio',
          dueDate: new Date('2024-04-01'),
          completed: false,
        },
      ],
      tags: ['Leadership', 'Communication', 'Management'],
      objectives: ['Improve communication skills', 'Develop team management abilities', 'Build strategic thinking'],
      deliverables: ['Leadership assessment report', 'Team project leadership', 'Leadership portfolio'],
      metrics: {
        timeSpent: 30,
        sessionsCompleted: 6,
        tasksCompleted: 2,
        totalTasks: 4,
      },
      feedback: {
        coach: 'Sarah shows great potential for leadership. Her communication skills have improved significantly.',
        coachee: 'I\'ve learned so much about effective leadership and team management.',
        rating: 4,
      },
    },
  ];

  const createdGoals = await GoalModel.insertMany(goals);
  console.log(`✅ Created ${createdGoals.length} goals`);
  
  return createdGoals;
}

async function createSessions(users: any, programs: any, goals: any) {
  console.log('📅 Creating sessions...');
  
  const sessions = [
    {
      title: 'React Fundamentals Review',
      description: 'Review of React basics including components, state, and props. We\'ll also discuss the project progress and next steps.',
      status: SessionStatus.COMPLETED,
      type: SessionType.VIRTUAL,
      coach: users.find(u => u.email === 'john.doe@example.com')?._id,
      coachee: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      program: programs.softwareEngineering._id,
      goal: goals.find(g => g.title === 'Master React Development')?._id,
      startTime: new Date('2024-01-20T10:00:00Z'),
      endTime: new Date('2024-01-20T11:00:00Z'),
      duration: 60,
      location: 'Virtual Meeting',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      topics: ['React Components', 'State Management', 'Props', 'Project Review'],
      objectives: ['Review React fundamentals', 'Discuss project progress', 'Plan next steps'],
      agenda: ['Introduction (5 min)', 'React Review (30 min)', 'Project Discussion (20 min)', 'Next Steps (5 min)'],
      notes: ['Mike completed the React tutorial successfully', 'Discussed useState and useEffect hooks', 'Next session will focus on advanced patterns'],
      feedback: {
        coach: {
          rating: 5,
          comments: 'Excellent session! Mike is making great progress with React.',
          coacheeEngagement: 5,
          goalProgress: 4,
        },
        coachee: {
          rating: 5,
          comments: 'Very helpful session. I understand React much better now.',
          coachEffectiveness: 5,
          sessionValue: 5,
        },
      },
      metrics: {
        actualDuration: 60,
        topicsCovered: 4,
        objectivesMet: 3,
        followUpRequired: false,
      },
      tags: ['React', 'Frontend', 'Tutorial'],
      resources: ['React documentation', 'Code examples', 'Project files'],
    },
    {
      title: 'Leadership Communication Workshop',
      description: 'Interactive workshop on effective communication skills for leaders. We\'ll practice different communication techniques and receive feedback.',
      status: SessionStatus.SCHEDULED,
      type: SessionType.VIRTUAL,
      coach: users.find(u => u.email === 'jane.smith@example.com')?._id,
      coachee: users.find(u => u.email === 'sarah.wilson@example.com')?._id,
      program: programs.leadership._id,
      goal: goals.find(g => g.title === 'Develop Leadership Skills')?._id,
      startTime: new Date('2024-03-05T14:00:00Z'),
      endTime: new Date('2024-03-05T15:30:00Z'),
      duration: 90,
      location: 'Virtual Meeting',
      meetingLink: 'https://meet.google.com/xyz-uvw-rst',
      topics: ['Effective Communication', 'Active Listening', 'Presentation Skills', 'Feedback Techniques'],
      objectives: ['Improve communication skills', 'Practice active listening', 'Develop presentation abilities'],
      agenda: ['Introduction (10 min)', 'Communication Theory (20 min)', 'Practice Exercises (40 min)', 'Feedback Session (15 min)', 'Wrap-up (5 min)'],
      tags: ['Leadership', 'Communication', 'Workshop'],
      resources: ['Communication guide', 'Practice materials', 'Assessment tools'],
    },
    {
      title: 'Advanced React Patterns',
      description: 'Deep dive into advanced React patterns including custom hooks, context API, and performance optimization.',
      status: SessionStatus.CONFIRMED,
      type: SessionType.VIRTUAL,
      coach: users.find(u => u.email === 'john.doe@example.com')?._id,
      coachee: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      program: programs.softwareEngineering._id,
      goal: goals.find(g => g.title === 'Master React Development')?._id,
      startTime: new Date('2024-03-10T10:00:00Z'),
      endTime: new Date('2024-03-10T11:00:00Z'),
      duration: 60,
      location: 'Virtual Meeting',
      meetingLink: 'https://meet.google.com/def-ghi-jkl',
      topics: ['Custom Hooks', 'Context API', 'Performance Optimization', 'Best Practices'],
      objectives: ['Learn custom hooks', 'Understand context API', 'Optimize React performance'],
      agenda: ['Custom Hooks (20 min)', 'Context API (20 min)', 'Performance Tips (15 min)', 'Q&A (5 min)'],
      tags: ['React', 'Advanced', 'Performance'],
      resources: ['Advanced React docs', 'Performance guide', 'Code examples'],
    },
  ];

  const createdSessions = await SessionModel.insertMany(sessions);
  console.log(`✅ Created ${createdSessions.length} sessions`);
  
  return createdSessions;
}

async function createConversations(users: any) {
  console.log('💬 Creating conversations...');
  
  const conversations = [
    {
      type: ConversationType.DIRECT,
      participants: [users.find(u => u.email === 'john.doe@example.com')?._id, users.find(u => u.email === 'mike.johnson@example.com')?._id],
      name: 'John & Mike',
      description: 'Direct conversation between coach and coachee',
      isActive: true,
      lastMessage: {
        content: 'Great work on the React project!',
        sender: users.find(u => u.email === 'john.doe@example.com')?._id,
        timestamp: new Date('2024-01-25T15:30:00Z'),
        type: MessageType.TEXT,
      },
      lastSeen: {
        [users.find(u => u.email === 'john.doe@example.com')?._id]: new Date('2024-01-25T15:30:00Z'),
        [users.find(u => u.email === 'mike.johnson@example.com')?._id]: new Date('2024-01-25T15:25:00Z'),
      },
    },
    {
      type: ConversationType.DIRECT,
      participants: [users.find(u => u.email === 'jane.smith@example.com')?._id, users.find(u => u.email === 'sarah.wilson@example.com')?._id],
      name: 'Jane & Sarah',
      description: 'Direct conversation between coach and coachee',
      isActive: true,
      lastMessage: {
        content: 'Looking forward to our next session!',
        sender: users.find(u => u.email === 'sarah.wilson@example.com')?._id,
        timestamp: new Date('2024-01-26T10:15:00Z'),
        type: MessageType.TEXT,
      },
      lastSeen: {
        [users.find(u => u.email === 'jane.smith@example.com')?._id]: new Date('2024-01-26T10:20:00Z'),
        [users.find(u => u.email === 'sarah.wilson@example.com')?._id]: new Date('2024-01-26T10:15:00Z'),
      },
    },
  ];

  const createdConversations = await ConversationModel.insertMany(conversations);
  console.log(`✅ Created ${createdConversations.length} conversations`);
  
  return createdConversations;
}

async function createMessages(users: any, conversations: any) {
  console.log('💌 Creating messages...');
  
  const messages = [
    // John & Mike conversation
    {
      conversationId: conversations.find(c => c.name === 'John & Mike')?._id,
      sender: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      recipient: users.find(u => u.email === 'john.doe@example.com')?._id,
      content: 'Hi John! I completed the React tutorial you recommended.',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-25T14:00:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'John & Mike')?._id,
      sender: users.find(u => u.email === 'john.doe@example.com')?._id,
      recipient: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      content: 'That\'s great! How did you find it?',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-25T14:05:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'John & Mike')?._id,
      sender: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      recipient: users.find(u => u.email === 'john.doe@example.com')?._id,
      content: 'It was really helpful! I especially liked the hands-on exercises.',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-25T14:10:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'John & Mike')?._id,
      sender: users.find(u => u.email === 'john.doe@example.com')?._id,
      recipient: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      content: 'Perfect! Are you ready to start building your first React app?',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-25T14:15:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'John & Mike')?._id,
      sender: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      recipient: users.find(u => u.email === 'john.doe@example.com')?._id,
      content: 'Yes, I\'m excited to get started!',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-25T14:20:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'John & Mike')?._id,
      sender: users.find(u => u.email === 'john.doe@example.com')?._id,
      recipient: users.find(u => u.email === 'mike.johnson@example.com')?._id,
      content: 'Great work on the React project!',
      type: MessageType.TEXT,
      read: false,
    },
    
    // Jane & Sarah conversation
    {
      conversationId: conversations.find(c => c.name === 'Jane & Sarah')?._id,
      sender: users.find(u => u.email === 'sarah.wilson@example.com')?._id,
      recipient: users.find(u => u.email === 'jane.smith@example.com')?._id,
      content: 'Hi Jane! I completed the leadership assessment you sent.',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-26T09:00:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'Jane & Sarah')?._id,
      sender: users.find(u => u.email === 'jane.smith@example.com')?._id,
      recipient: users.find(u => u.email === 'sarah.wilson@example.com')?._id,
      content: 'Excellent! What were your key insights from the assessment?',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-26T09:05:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'Jane & Sarah')?._id,
      sender: users.find(u => u.email === 'sarah.wilson@example.com')?._id,
      recipient: users.find(u => u.email === 'jane.smith@example.com')?._id,
      content: 'I discovered that I\'m more of a collaborative leader, but I need to work on my communication skills.',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-26T09:10:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'Jane & Sarah')?._id,
      sender: users.find(u => u.email === 'jane.smith@example.com')?._id,
      recipient: users.find(u => u.email === 'sarah.wilson@example.com')?._id,
      content: 'That\'s a great insight! Communication is definitely something we can work on together.',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-26T09:15:00Z'),
    },
    {
      conversationId: conversations.find(c => c.name === 'Jane & Sarah')?._id,
      sender: users.find(u => u.email === 'sarah.wilson@example.com')?._id,
      recipient: users.find(u => u.email === 'jane.smith@example.com')?._id,
      content: 'Looking forward to our next session!',
      type: MessageType.TEXT,
      read: true,
      readAt: new Date('2024-01-26T10:15:00Z'),
    },
  ];

  const createdMessages = await MessageModel.insertMany(messages);
  console.log(`✅ Created ${createdMessages.length} messages`);
  
  return createdMessages;
}

async function main() {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    await clearDatabase();
    
    const users = await createUsers();
    const programs = await createPrograms(users);
    const goals = await createGoals(users, programs);
    const sessions = await createSessions(users, programs, goals);
    const conversations = await createConversations(users);
    const messages = await createMessages(users, conversations);
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: ${users.length}`);
    console.log(`- Programs: ${Object.keys(programs).length}`);
    console.log(`- Goals: ${goals.length}`);
    console.log(`- Sessions: ${sessions.length}`);
    console.log(`- Conversations: ${conversations.length}`);
    console.log(`- Messages: ${messages.length}`);
    
    console.log('\n🔑 Test Credentials:');
    console.log('Email: john.doe@example.com | Password: password123');
    console.log('Email: jane.smith@example.com | Password: password123');
    console.log('Email: mike.johnson@example.com | Password: password123');
    console.log('Email: sarah.wilson@example.com | Password: password123');
    console.log('Email: admin@strathconnect.com | Password: password123');
    
    console.log('\n🚀 You can now start the application and test the API!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

if (require.main === module) {
  main();
}

export { main };
