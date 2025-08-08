# StrathConnect Backend API

A comprehensive NestJS backend API for the StrathConnect mentorship platform, providing authentication, user management, program management, goal tracking, session scheduling, and communication features.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Google OAuth integration
  - Role-based access control (Mentor, Mentee, Admin)
  - Refresh token mechanism

- **User Management**
  - User registration and profile management
  - Role assignment and department management
  - User search and filtering

- **Program Management**
  - Create and manage mentorship programs
  - Program phases and milestones
  - Participant and mentor assignment
  - Program metrics and analytics

- **Goal Tracking**
  - Goal creation and management
  - Milestone tracking
  - Progress monitoring
  - Feedback system

- **Session Management**
  - Session scheduling and booking
  - Virtual and in-person session support
  - Session feedback and notes
  - Calendar integration

- **Communication**
  - Real-time messaging
  - Direct and group conversations
  - Message search and history
  - File sharing support

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js, Google OAuth
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd strathconnect/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   - Set up MongoDB connection string
   - Configure JWT secrets
   - Add Google OAuth credentials
   - Set frontend URL

4. **Database Setup**
   ```bash
   # Start MongoDB (if not running)
   mongod
   
   # The application will create collections automatically
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `GET /auth/google` - Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback

### Users
- `POST /users` - Create user
- `GET /users` - Get all users (with filters)
- `GET /users/mentors` - Get all mentors
- `GET /users/mentees` - Get all mentees
- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update current user profile
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Programs
- `POST /programs` - Create program
- `GET /programs` - Get all programs (with filters)
- `GET /programs/active` - Get active programs
- `GET /programs/:id` - Get program by ID
- `PUT /programs/:id` - Update program
- `DELETE /programs/:id` - Delete program
- `POST /programs/:id/participants` - Add participant
- `DELETE /programs/:id/participants/:userId` - Remove participant
- `POST /programs/:id/mentors` - Add mentor
- `DELETE /programs/:id/mentors/:userId` - Remove mentor

### Goals
- `POST /goals` - Create goal
- `GET /goals` - Get goals (with filters)
- `GET /goals/my-goals` - Get user's goals
- `GET /goals/:id` - Get goal by ID
- `PUT /goals/:id` - Update goal
- `DELETE /goals/:id` - Delete goal
- `PUT /goals/:id/progress` - Update goal progress
- `PUT /goals/:id/milestones/:milestoneIndex/complete` - Complete milestone
- `PUT /goals/:id/feedback` - Add feedback

### Sessions
- `POST /sessions` - Create session
- `GET /sessions` - Get sessions (with filters)
- `GET /sessions/upcoming` - Get upcoming sessions
- `GET /sessions/past` - Get past sessions
- `GET /sessions/stats` - Get session statistics
- `GET /sessions/:id` - Get session by ID
- `PUT /sessions/:id` - Update session
- `DELETE /sessions/:id` - Delete session
- `PUT /sessions/:id/status` - Update session status
- `PUT /sessions/:id/feedback` - Add session feedback
- `PUT /sessions/:id/notes` - Add session notes

### Communication
- `POST /communication/conversations` - Create conversation
- `GET /communication/conversations` - Get user conversations
- `GET /communication/conversations/:id` - Get conversation
- `POST /communication/conversations/:id/messages` - Send message
- `GET /communication/conversations/:id/messages` - Get messages
- `PUT /communication/messages/:id/read` - Mark message as read
- `PUT /communication/conversations/:id/read` - Mark conversation as read
- `GET /communication/unread-count` - Get unread message count
- `DELETE /communication/messages/:id` - Delete message
- `PUT /communication/messages/:id` - Edit message
- `GET /communication/search` - Search messages
- `GET /communication/direct/:userId` - Get direct conversation

## Data Models

### User
- Basic info (name, email, password)
- Role (Mentor, Mentee, Admin)
- Department and profile information
- Authentication tokens

### Program
- Program details (name, description, type)
- Phases and milestones
- Participants and mentors
- Settings and requirements

### Goal
- Goal details (title, description, priority)
- Milestones and progress tracking
- Associated mentor and mentee
- Feedback and metrics

### Session
- Session details (title, description, type)
- Scheduling information
- Participants and program association
- Feedback and notes

### Conversation & Message
- Conversation management
- Message history and search
- Read status and notifications

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Development

### Code Style
```bash
# Format code
npm run format

# Lint code
npm run lint
```

### Database Migrations
The application uses Mongoose schemas that automatically create collections and indexes. For production, consider using a migration tool.

### Environment Variables
See `env.example` for all required environment variables.

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   - Update MongoDB connection string
   - Set secure JWT secrets
   - Configure production URLs

3. **Deploy to your preferred platform**
   - Heroku
   - AWS
   - DigitalOcean
   - Vercel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
