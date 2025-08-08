# StrathConnect Backend Setup Guide

This guide will help you set up the StrathConnect backend API for development and production.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn**

## Step 1: Clone and Install

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
```

## Step 2: Environment Configuration

1. **Copy the environment template**
   ```bash
   cp env.example .env
   ```

2. **Edit the `.env` file** with your configuration:

   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/strathconnect
   
   # JWT Configuration (Generate secure secrets)
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
   
   # Google OAuth Configuration (Optional for development)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   
   # Application Configuration
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3001
   ```

## Step 3: Database Setup

1. **Start MongoDB**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   
   # Or run directly
   mongod
   ```

2. **Verify MongoDB is running**
   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # List databases
   show dbs
   
   # Exit
   exit
   ```

## Step 4: Generate JWT Secrets

For production, generate secure JWT secrets:

```bash
# Generate random strings (use these as your JWT secrets)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Step 5: Google OAuth Setup (Optional)

If you want to enable Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (development)
   - `https://yourdomain.com/auth/google/callback` (production)
6. Copy Client ID and Client Secret to your `.env` file

## Step 6: Run the Application

### Development Mode
```bash
# Start in development mode with hot reload
npm run start:dev
```

### Production Mode
```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

## Step 7: Verify Installation

1. **Check if the server is running**
   ```bash
   curl http://localhost:3000
   ```

2. **Access Swagger API Documentation**
   Open your browser and go to: `http://localhost:3000/api`

3. **Test the health endpoint**
   ```bash
   curl http://localhost:3000/health
   ```

## Step 8: Create Initial Data (Optional)

You can create some initial data for testing:

```bash
# Create a test user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "mentor",
    "department": "Computer Science"
  }'
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify MongoDB port (default: 27017)

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Or kill the process using the port:
     ```bash
     lsof -ti:3000 | xargs kill -9
     ```

3. **JWT Secret Issues**
   - Ensure JWT_SECRET and JWT_REFRESH_SECRET are set
   - Use different secrets for each environment

4. **CORS Issues**
   - Check FRONTEND_URL in `.env`
   - Ensure it matches your frontend URL

### Development Tips

1. **Enable Debug Logging**
   ```bash
   DEBUG=* npm run start:dev
   ```

2. **Monitor Database**
   ```bash
   # Connect to MongoDB shell
   mongosh strathconnect
   
   # View collections
   show collections
   
   # Query data
   db.users.find()
   ```

3. **Reset Database**
   ```bash
   # Drop the database
   mongosh --eval "use strathconnect; db.dropDatabase()"
   ```

## Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/strathconnect
JWT_SECRET=your-production-jwt-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
FRONTEND_URL=https://yourdomain.com
```

### Security Checklist

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS
- [ ] Set up proper CORS
- [ ] Use environment variables
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy

## API Testing

### Using Swagger UI
1. Go to `http://localhost:3000/api`
2. Click "Authorize" and enter your JWT token
3. Test endpoints directly from the UI

### Using curl
```bash
# Login and get token
TOKEN=$(curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | jq -r '.accessToken')

# Use token for authenticated requests
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/users/profile
```

## Next Steps

1. **Set up your frontend** to connect to this API
2. **Configure your IDE** for TypeScript development
3. **Set up testing** with Jest
4. **Configure CI/CD** pipeline
5. **Set up monitoring** and logging

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs for error messages
3. Check the API documentation at `/api`
4. Create an issue in the repository

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/) - JWT debugging
- [Swagger Documentation](https://swagger.io/docs/)
