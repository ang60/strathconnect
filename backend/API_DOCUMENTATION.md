# StrathConnect API Documentation

This document provides comprehensive documentation for the StrathConnect Backend API.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require authentication.

### Getting a Token

1. **Login with email/password**:
   ```http
   POST /auth/login
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

2. **Google OAuth**:
   ```http
   GET /auth/google
   ```

### Using the Token

Include the token in the Authorization header:
```http
Authorization: Bearer <your-jwt-token>
```

### Token Refresh

When your access token expires, use the refresh token:
```http
POST /auth/refresh
Authorization: Bearer <refresh-token>
```

## API Endpoints

### Authentication

#### POST /auth/login
Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "mentor",
    "department": "Computer Science"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /auth/logout
Logout user and invalidate tokens.

**Headers:**
```http
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Headers:**
```http
Authorization: Bearer <refresh-token>
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "mentor",
    "department": "Computer Science"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /auth/google
Initiate Google OAuth login.

#### GET /auth/google/callback
Google OAuth callback endpoint.

### Users

#### POST /users
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "mentor",
  "department": "Computer Science",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "Experienced software engineer"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "mentor",
  "department": "Computer Science",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "Experienced software engineer",
  "status": "active",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### GET /users
Get all users with optional filtering.

**Query Parameters:**
- `role` (optional): Filter by user role (mentor, mentee, admin)
- `department` (optional): Filter by department
- `status` (optional): Filter by status (active, inactive, suspended)

**Headers:**
```http
Authorization: Bearer <access-token>
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "mentor",
    "department": "Computer Science",
    "avatar": "https://example.com/avatar.jpg",
    "status": "active"
  }
]
```

#### GET /users/mentors
Get all mentors.

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "mentor",
    "department": "Computer Science",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Experienced software engineer"
  }
]
```

#### GET /users/mentees
Get all mentees.

#### GET /users/profile
Get current user's profile.

**Headers:**
```http
Authorization: Bearer <access-token>
```

#### PUT /users/profile
Update current user's profile.

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "bio": "Updated bio",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

#### GET /users/:id
Get user by ID.

#### PUT /users/:id
Update user by ID.

#### DELETE /users/:id
Delete user by ID.

### Programs

#### POST /programs
Create a new mentorship program.

**Request Body:**
```json
{
  "name": "Software Engineering Mentorship",
  "description": "A comprehensive mentorship program for software engineering students",
  "type": "career",
  "status": "active",
  "tags": ["Software Engineering", "Career Development"],
  "skills": ["JavaScript", "React", "Node.js"],
  "requirements": ["Basic programming knowledge", "Commitment to learning"],
  "duration": 12,
  "maxParticipants": 50,
  "mentors": ["507f1f77bcf86cd799439011"],
  "coordinators": ["507f1f77bcf86cd799439012"],
  "startDate": "2024-01-15",
  "endDate": "2024-04-15",
  "departments": ["Computer Science", "Engineering"]
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Software Engineering Mentorship",
  "description": "A comprehensive mentorship program for software engineering students",
  "type": "career",
  "status": "active",
  "currentParticipants": 0,
  "mentors": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### GET /programs
Get all programs with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by program status
- `type` (optional): Filter by program type
- `department` (optional): Filter by department

#### GET /programs/active
Get all active programs.

#### GET /programs/:id
Get program by ID.

#### PUT /programs/:id
Update program by ID.

#### DELETE /programs/:id
Delete program by ID.

#### POST /programs/:id/participants
Add participant to program.

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439014"
}
```

#### DELETE /programs/:id/participants/:userId
Remove participant from program.

#### POST /programs/:id/mentors
Add mentor to program.

#### DELETE /programs/:id/mentors/:userId
Remove mentor from program.

### Goals

#### POST /goals
Create a new goal.

**Request Body:**
```json
{
  "title": "Learn React Fundamentals",
  "description": "Master React basics including components, state, and props",
  "priority": "high",
  "deadline": "2024-03-15",
  "milestones": [
    {
      "title": "Complete React Tutorial",
      "description": "Finish the official React tutorial",
      "dueDate": "2024-02-01"
    },
    {
      "title": "Build First App",
      "description": "Create a simple React application",
      "dueDate": "2024-02-15"
    }
  ],
  "tags": ["React", "Frontend", "Learning"]
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "title": "Learn React Fundamentals",
  "description": "Master React basics including components, state, and props",
  "priority": "high",
  "status": "in_progress",
  "progress": 0,
  "mentee": "507f1f77bcf86cd799439014",
  "milestones": [
    {
      "title": "Complete React Tutorial",
      "description": "Finish the official React tutorial",
      "dueDate": "2024-02-01",
      "completed": false
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### GET /goals
Get goals with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by goal status
- `priority` (optional): Filter by priority
- `mentorId` (optional): Filter by mentor ID

#### GET /goals/my-goals
Get current user's goals.

#### GET /goals/:id
Get goal by ID.

#### PUT /goals/:id
Update goal by ID.

#### DELETE /goals/:id
Delete goal by ID.

#### PUT /goals/:id/progress
Update goal progress.

**Request Body:**
```json
{
  "progress": 75
}
```

#### PUT /goals/:id/milestones/:milestoneIndex/complete
Complete a milestone.

#### PUT /goals/:id/feedback
Add feedback to goal.

**Request Body:**
```json
{
  "mentor": "Great progress! Keep it up.",
  "rating": 4
}
```

### Sessions

#### POST /sessions
Create a new session.

**Request Body:**
```json
{
  "title": "React Fundamentals Review",
  "description": "Review of React fundamentals and component lifecycle",
  "status": "scheduled",
  "type": "virtual",
  "mentee": "507f1f77bcf86cd799439014",
  "program": "507f1f77bcf86cd799439013",
  "goal": "507f1f77bcf86cd799439015",
  "startTime": "2024-01-15T10:00:00Z",
  "endTime": "2024-01-15T11:00:00Z",
  "duration": 60,
  "location": "Room 101, Building A",
  "meetingLink": "https://meet.google.com/abc-defg-hij",
  "topics": ["React Hooks", "State Management", "Component Lifecycle"],
  "objectives": ["Understand React Hooks", "Learn state management patterns"]
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439016",
  "title": "React Fundamentals Review",
  "description": "Review of React fundamentals and component lifecycle",
  "status": "scheduled",
  "type": "virtual",
  "mentor": "507f1f77bcf86cd799439011",
  "mentee": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "startTime": "2024-01-15T10:00:00.000Z",
  "endTime": "2024-01-15T11:00:00.000Z",
  "duration": 60,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### GET /sessions
Get sessions with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by session status
- `type` (optional): Filter by session type
- `menteeId` (optional): Filter by mentee ID
- `startDate` (optional): Filter by start date
- `endDate` (optional): Filter by end date

#### GET /sessions/upcoming
Get upcoming sessions for current user.

#### GET /sessions/past
Get past sessions for current user.

#### GET /sessions/stats
Get session statistics for current user.

**Response:**
```json
{
  "total": 25,
  "completed": 20,
  "upcoming": 3,
  "cancelled": 2,
  "completionRate": 80
}
```

#### GET /sessions/:id
Get session by ID.

#### PUT /sessions/:id
Update session by ID.

#### DELETE /sessions/:id
Delete session by ID.

#### PUT /sessions/:id/status
Update session status.

**Request Body:**
```json
{
  "status": "completed"
}
```

#### PUT /sessions/:id/feedback
Add feedback to session.

**Request Body:**
```json
{
  "rating": 5,
  "comments": "Excellent session, very helpful!",
  "menteeEngagement": 4,
  "goalProgress": 3
}
```

#### PUT /sessions/:id/notes
Add notes to session.

**Request Body:**
```json
{
  "notes": ["Discussed React Hooks", "Covered useState and useEffect", "Next session: Context API"]
}
```

### Communication

#### POST /communication/conversations
Create a new conversation.

**Request Body:**
```json
{
  "type": "direct",
  "participants": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439014"],
  "name": "John & Jane",
  "description": "Direct conversation between mentor and mentee"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439017",
  "type": "direct",
  "participants": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "avatar": "https://example.com/avatar2.jpg"
    }
  ],
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### GET /communication/conversations
Get user's conversations.

#### GET /communication/conversations/:id
Get conversation by ID.

#### POST /communication/conversations/:id/messages
Send a message in conversation.

**Request Body:**
```json
{
  "recipient": "507f1f77bcf86cd799439014",
  "content": "Hello! How are you doing with the React tutorial?",
  "type": "text"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439018",
  "conversationId": "507f1f77bcf86cd799439017",
  "sender": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "recipient": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "content": "Hello! How are you doing with the React tutorial?",
  "type": "text",
  "read": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### GET /communication/conversations/:id/messages
Get messages in conversation.

**Query Parameters:**
- `limit` (optional): Number of messages to return (default: 50)
- `offset` (optional): Number of messages to skip (default: 0)

#### PUT /communication/messages/:id/read
Mark message as read.

#### PUT /communication/conversations/:id/read
Mark all messages in conversation as read.

#### GET /communication/unread-count
Get unread message count.

**Response:**
```json
{
  "count": 5
}
```

#### DELETE /communication/messages/:id
Delete message.

#### PUT /communication/messages/:id
Edit message.

**Request Body:**
```json
{
  "content": "Updated message content"
}
```

#### GET /communication/search
Search messages.

**Query Parameters:**
- `q` (required): Search term

#### GET /communication/direct/:userId
Get or create direct conversation with user.

## Error Responses

### Standard Error Format
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/users"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

### Validation Errors
```json
{
  "statusCode": 422,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Unprocessable Entity"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user

## Pagination

For endpoints that return lists, pagination is supported:

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)

**Response Headers:**
```http
X-Total-Count: 150
X-Page: 1
X-Limit: 10
X-Total-Pages: 15
```

## File Upload

File upload endpoints support:
- Maximum file size: 5MB
- Supported formats: JPG, PNG, PDF, DOC, DOCX
- Files are stored securely and served via CDN

## WebSocket Support

Real-time features are available via WebSocket connections:
- Live messaging
- Session notifications
- Goal progress updates

**WebSocket URL:** `ws://localhost:3000/ws`

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @strathconnect/api-client
```

### Python
```bash
pip install strathconnect-api
```

### PHP
```bash
composer require strathconnect/api-client
```

## Testing

### Test Environment
- Base URL: `http://localhost:3000`
- Test database: `strathconnect_test`
- Test user credentials available in test suite

### Running Tests
```bash
# Unit tests
npm run test

# Integration tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Support

For API support:
- Email: api-support@strathconnect.com
- Documentation: https://docs.strathconnect.com
- GitHub Issues: https://github.com/strathconnect/api/issues

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- Authentication system
- User management
- Program management
- Goal tracking
- Session scheduling
- Communication system
