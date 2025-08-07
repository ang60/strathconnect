# StrathConnect Backend Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/strathconnect

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-make-it-long-and-random

# Google OAuth Configuration (optional for now)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Application Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

### 3. Database Setup

Make sure MongoDB is running on your system. The application will automatically create the necessary collections when it starts.

### 4. Start the Development Server

```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000`

### 5. Verify Installation

Test the health endpoint:
```bash
curl http://localhost:3000/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## API Testing

You can test the API endpoints using tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

## Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run linting
- `npm run format` - Format code with Prettier

## Database Collections

The application will create the following collections in MongoDB:
- `users` - User accounts and profiles
- `programs` - Mentorship programs
- `goals` - User goals and milestones
- `sessions` - Mentorship sessions
- `messages` - Communication messages
- `conversations` - Chat conversations

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file
   - Verify network connectivity

2. **JWT Errors**
   - Ensure JWT_SECRET and JWT_REFRESH_SECRET are set
   - Make sure the secrets are long and random

3. **CORS Errors**
   - Check that FRONTEND_URL is correctly set
   - Ensure the frontend is running on the expected port

4. **Port Already in Use**
   - Change the PORT in .env file
   - Or kill the process using the current port

### Logs

Check the console output for detailed error messages and logs.

## Next Steps

1. Set up the frontend application
2. Configure Google OAuth (optional)
3. Set up email notifications (future enhancement)
4. Configure production environment variables
5. Set up monitoring and logging (future enhancement)
