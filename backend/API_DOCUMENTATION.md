# StrathConnect Backend API Documentation

## Overview
The StrathConnect backend is a NestJS application that provides a comprehensive API for the mentorship and coaching platform. It includes authentication, user management, program management, goal tracking, session scheduling, and communication features.

## Base URL
```
http://localhost:3000
```

## Authentication
The API uses JWT-based authentication with refresh tokens. All protected endpoints require a valid JWT token in the Authorization header or as an HTTP-only cookie.

### Headers
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

## API Endpoints

### Authentication

#### POST /auth/login
Login with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /auth/logout
Logout and clear tokens

#### POST /auth/refresh
Refresh access token using refresh token

#### GET /auth/google
Initiate Google OAuth login

#### GET /auth/google/callback
Google OAuth callback

### Users

#### POST /users
Create a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "mentor",
  "department": "Business Administration",
  "position": "Senior Manager",
  "bio": "Experienced business leader",
  "skills": ["Leadership", "Strategy"],
  "interests": ["Technology", "Innovation"],
  "expertise": ["Business Development"]
}
```

#### GET /users
Get all users (with optional filters)
```
/users?role=mentor&department=Business&status=active
```

#### GET /users/mentors
Get all mentors

#### GET /users/mentees
Get all mentees

#### GET /users/search?q=searchterm
Search users

#### GET /users/profile
Get current user's profile

#### PUT /users/profile
Update current user's profile

#### GET /users/:id
Get user by ID

#### PUT /users/:id
Update user

#### DELETE /users/:id
Delete user

### Programs

#### POST /programs
Create a new program
```json
{
  "name": "Leadership Development Program",
  "description": "Comprehensive leadership training",
  "type": "leadership",
  "status": "active",
  "tags": ["leadership", "management"],
  "skills": ["Communication", "Decision Making"],
  "requirements": ["2+ years experience"],
  "duration": 12,
  "maxParticipants": 20,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "phases": [
    {
      "name": "Foundation",
      "description": "Basic leadership concepts",
      "startDate": "2024-01-01",
      "endDate": "2024-03-31",
      "objectives": ["Understand leadership principles"],
      "deliverables": ["Leadership assessment"]
    }
  ]
}
```

#### GET /programs
Get all programs (with optional filters)
```
/programs?status=active&type=leadership&department=Business
```

#### GET /programs/active
Get active programs

#### GET /programs/search?q=searchterm
Search programs

#### GET /programs/:id
Get program by ID

#### PUT /programs/:id
Update program

#### DELETE /programs/:id
Delete program

#### POST /programs/:id/participants
Add participant to program
```json
{
  "userId": "user-id-here"
}
```

#### DELETE /programs/:id/participants/:userId
Remove participant from program

#### POST /programs/:id/mentors
Add mentor to program
```json
{
  "userId": "mentor-id-here"
}
```

#### DELETE /programs/:id/mentors/:userId
Remove mentor from program

### Goals

#### POST /goals
Create a new goal
```json
{
  "title": "Improve Leadership Skills",
  "description": "Develop effective leadership capabilities",
  "status": "pending",
  "priority": "high",
  "tags": ["leadership", "growth"],
  "mentor": "mentor-id-here",
  "program": "program-id-here",
  "startDate": "2024-01-01",
  "targetDate": "2024-06-30",
  "milestones": [
    {
      "title": "Complete leadership assessment",
      "description": "Take initial leadership assessment",
      "dueDate": "2024-02-01"
    }
  ],
  "objectives": ["Improve communication", "Build team management skills"],
  "deliverables": ["Leadership portfolio", "Team project"]
}
```

#### GET /goals
Get goals (filtered by user role)
```
/goals?status=in_progress&priority=high
```

#### GET /goals/my-goals
Get current user's goals

#### GET /goals/search?q=searchterm
Search goals

#### GET /goals/:id
Get goal by ID

#### PUT /goals/:id
Update goal

#### DELETE /goals/:id
Delete goal

#### PUT /goals/:id/progress
Update goal progress
```json
{
  "progress": 75
}
```

#### PUT /goals/:id/milestones/:milestoneIndex/complete
Complete a milestone

#### PUT /goals/:id/feedback
Add feedback to goal
```json
{
  "mentor": "Great progress on communication skills",
  "mentee": "Feeling more confident in team settings",
  "rating": 4
}
```

### Sessions

#### POST /sessions
Create a new session
```json
{
  "title": "Leadership Strategy Session",
  "description": "Discuss strategic leadership approaches",
  "status": "scheduled",
  "type": "virtual",
  "mentee": "mentee-id-here",
  "program": "program-id-here",
  "goal": "goal-id-here",
  "startTime": "2024-01-20T10:00:00Z",
  "endTime": "2024-01-20T11:00:00Z",
  "duration": 60,
  "location": "Zoom Meeting",
  "meetingLink": "https://zoom.us/j/123456789",
  "topics": ["Strategic thinking", "Decision making"],
  "objectives": ["Understand strategic frameworks", "Practice decision making"],
  "agenda": ["Introduction", "Case study discussion", "Action planning"]
}
```

#### GET /sessions
Get sessions (filtered by user role)
```
/sessions?status=confirmed&type=virtual&startDate=2024-01-01&endDate=2024-01-31
```

#### GET /sessions/upcoming
Get upcoming sessions

#### GET /sessions/past
Get past sessions

#### GET /sessions/stats
Get session statistics

#### GET /sessions/search?q=searchterm
Search sessions

#### GET /sessions/:id
Get session by ID

#### PUT /sessions/:id
Update session

#### DELETE /sessions/:id
Delete session

#### PUT /sessions/:id/status
Update session status
```json
{
  "status": "completed"
}
```

#### PUT /sessions/:id/feedback
Add session feedback
```json
{
  "mentor": {
    "rating": 4,
    "comments": "Excellent engagement",
    "menteeEngagement": 5,
    "goalProgress": 4
  },
  "mentee": {
    "rating": 5,
    "comments": "Very helpful session",
    "mentorEffectiveness": 5,
    "sessionValue": 5
  }
}
```

#### PUT /sessions/:id/notes
Add session notes
```json
{
  "notes": ["Key takeaway: Strategic thinking requires systematic approach"]
}
```

### Communication

#### POST /communication/conversations
Create a new conversation
```json
{
  "type": "direct",
  "participants": ["user1-id", "user2-id"],
  "name": "Mentorship Chat",
  "description": "Direct communication between mentor and mentee"
}
```

#### GET /communication/conversations
Get user's conversations

#### GET /communication/conversations/:id
Get conversation by ID

#### POST /communication/conversations/:id/messages
Send a message
```json
{
  "recipient": "recipient-id",
  "content": "Hello! How are you doing with your goals?",
  "type": "text"
}
```

#### GET /communication/conversations/:id/messages
Get conversation messages
```
/conversations/:id/messages?limit=50&offset=0
```

#### PUT /communication/messages/:id/read
Mark message as read

#### PUT /communication/conversations/:id/read
Mark conversation as read

#### GET /communication/unread-count
Get unread message count

#### DELETE /communication/messages/:id
Delete message

#### PUT /communication/messages/:id
Edit message
```json
{
  "content": "Updated message content"
}
```

#### GET /communication/search?q=searchterm
Search messages

#### GET /communication/direct/:userId
Get direct conversation with user

#### PUT /communication/conversations/:id/archive
Archive conversation

#### PUT /communication/conversations/:id/unarchive
Unarchive conversation

#### PUT /communication/conversations/:id/mute
Mute conversation

#### PUT /communication/conversations/:id/unmute
Unmute conversation

## Data Models

### User Roles
- `admin`: System administrator
- `coordinator`: Program coordinator
- `mentor`: Mentor/coach
- `mentee`: Mentee/learner

### User Status
- `active`: Active user
- `inactive`: Inactive user
- `pending`: Pending approval
- `suspended`: Suspended user

### Program Status
- `draft`: Draft program
- `active`: Active program
- `paused`: Paused program
- `completed`: Completed program
- `archived`: Archived program

### Program Types
- `leadership`: Leadership development
- `career`: Career development
- `skills`: Skills development
- `personal`: Personal development
- `technical`: Technical skills

### Goal Status
- `pending`: Pending goal
- `in_progress`: Goal in progress
- `completed`: Completed goal
- `cancelled`: Cancelled goal

### Goal Priority
- `low`: Low priority
- `medium`: Medium priority
- `high`: High priority
- `urgent`: Urgent priority

### Session Status
- `scheduled`: Scheduled session
- `confirmed`: Confirmed session
- `in_progress`: Session in progress
- `completed`: Completed session
- `cancelled`: Cancelled session
- `no_show`: No show

### Session Types
- `virtual`: Virtual session
- `in_person`: In-person session
- `hybrid`: Hybrid session

### Message Types
- `text`: Text message
- `file`: File message
- `image`: Image message
- `system`: System message

### Conversation Types
- `direct`: Direct conversation
- `group`: Group conversation
- `program`: Program conversation

## Error Responses

The API returns standard HTTP status codes and error messages:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

Common status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/strathconnect

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Application Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`
