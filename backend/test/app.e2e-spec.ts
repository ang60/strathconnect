import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  let authToken: string;
  let userId: string;
  let programId: string;
  let goalId: string;
  let sessionId: string;
  let conversationId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get<Connection>(getConnectionToken());
    await app.init();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await app.close();
  });

  describe('Authentication', () => {
    it('/auth/login (POST) - should login user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('user');
      authToken = response.body.accessToken;
    });

    it('/auth/login (POST) - should fail with invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('Users', () => {
    it('/users (POST) - should create user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'mentor',
          department: 'Computer Science',
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('Test User');
      expect(response.body.email).toBe('test@example.com');
      userId = response.body._id;
    });

    it('/users (GET) - should get users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('/users/mentors (GET) - should get mentors', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/mentors')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('/users/mentees (GET) - should get mentees', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/mentees')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('/users/profile (GET) - should get current user profile', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('email');
    });

    it('/users/:id (GET) - should get user by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body._id).toBe(userId);
    });
  });

  describe('Programs', () => {
    it('/programs (POST) - should create program', async () => {
      const response = await request(app.getHttpServer())
        .post('/programs')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Program',
          description: 'A test mentorship program',
          type: 'career',
          status: 'active',
          tags: ['Test', 'Mentorship'],
          skills: ['JavaScript', 'React'],
          requirements: ['Basic knowledge'],
          duration: 12,
          maxParticipants: 20,
          mentors: [userId],
          startDate: '2024-01-15',
          endDate: '2024-04-15',
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('Test Program');
      programId = response.body._id;
    });

    it('/programs (GET) - should get programs', async () => {
      const response = await request(app.getHttpServer())
        .get('/programs')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('/programs/active (GET) - should get active programs', async () => {
      const response = await request(app.getHttpServer())
        .get('/programs/active')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('/programs/:id (GET) - should get program by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/programs/${programId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body._id).toBe(programId);
    });

    it('/programs/:id (PUT) - should update program', async () => {
      const response = await request(app.getHttpServer())
        .put(`/programs/${programId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Test Program',
          description: 'An updated test mentorship program',
        })
        .expect(200);

      expect(response.body.name).toBe('Updated Test Program');
    });
  });

  describe('Goals', () => {
    it('/goals (POST) - should create goal', async () => {
      const response = await request(app.getHttpServer())
        .post('/goals')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Goal',
          description: 'A test goal for learning',
          priority: 'high',
          deadline: '2024-03-15',
          milestones: [
            {
              title: 'Complete Tutorial',
              description: 'Finish the tutorial',
              dueDate: '2024-02-01',
            },
          ],
          tags: ['Test', 'Learning'],
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe('Test Goal');
      goalId = response.body._id;
    });

    it('/goals (GET) - should get goals', async () => {
      const response = await request(app.getHttpServer())
        .get('/goals')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('/goals/my-goals (GET) - should get user goals', async () => {
      const response = await request(app.getHttpServer())
        .get('/goals/my-goals')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('/goals/:id (GET) - should get goal by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/goals/${goalId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body._id).toBe(goalId);
    });

    it('/goals/:id/progress (PUT) - should update goal progress', async () => {
      const response = await request(app.getHttpServer())
        .put(`/goals/${goalId}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ progress: 50 })
        .expect(200);

      expect(response.body.progress).toBe(50);
    });
  });

  describe('Sessions', () => {
    it('/sessions (POST) - should create session', async () => {
      const response = await request(app.getHttpServer())
        .post('/sessions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Session',
          description: 'A test mentorship session',
          status: 'scheduled',
          type: 'virtual',
          mentee: userId,
          program: programId,
          goal: goalId,
          startTime: '2024-01-20T10:00:00Z',
          endTime: '2024-01-20T11:00:00Z',
          duration: 60,
          location: 'Virtual Meeting',
          meetingLink: 'https://meet.google.com/test',
          topics: ['Test Topic'],
          objectives: ['Test Objective'],
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe('Test Session');
      sessionId = response.body._id;
    });

    it('/sessions (GET) - should get sessions', async () => {
      const response = await request(app.getHttpServer())
        .get('/sessions')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('/sessions/upcoming (GET) - should get upcoming sessions', async () => {
      const response = await request(app.getHttpServer())
        .get('/sessions/upcoming')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('/sessions/past (GET) - should get past sessions', async () => {
      const response = await request(app.getHttpServer())
        .get('/sessions/past')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('/sessions/stats (GET) - should get session stats', async () => {
      const response = await request(app.getHttpServer())
        .get('/sessions/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('completed');
      expect(response.body).toHaveProperty('upcoming');
    });

    it('/sessions/:id (GET) - should get session by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/sessions/${sessionId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body._id).toBe(sessionId);
    });

    it('/sessions/:id/status (PUT) - should update session status', async () => {
      const response = await request(app.getHttpServer())
        .put(`/sessions/${sessionId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'completed' })
        .expect(200);

      expect(response.body.status).toBe('completed');
    });
  });

  describe('Communication', () => {
    it('/communication/conversations (POST) - should create conversation', async () => {
      const response = await request(app.getHttpServer())
        .post('/communication/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'direct',
          participants: [userId],
          name: 'Test Conversation',
          description: 'A test conversation',
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('Test Conversation');
      conversationId = response.body._id;
    });

    it('/communication/conversations (GET) - should get conversations', async () => {
      const response = await request(app.getHttpServer())
        .get('/communication/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('/communication/conversations/:id (GET) - should get conversation by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/communication/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body._id).toBe(conversationId);
    });

    it('/communication/conversations/:id/messages (POST) - should send message', async () => {
      const response = await request(app.getHttpServer())
        .post(`/communication/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          recipient: userId,
          content: 'Hello, this is a test message!',
          type: 'text',
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.content).toBe('Hello, this is a test message!');
    });

    it('/communication/conversations/:id/messages (GET) - should get messages', async () => {
      const response = await request(app.getHttpServer())
        .get(`/communication/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('/communication/unread-count (GET) - should get unread count', async () => {
      const response = await request(app.getHttpServer())
        .get('/communication/unread-count')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('count');
      expect(typeof response.body.count).toBe('number');
    });
  });

  describe('Error Handling', () => {
    it('should return 401 for unauthorized requests', async () => {
      await request(app.getHttpServer())
        .get('/users/profile')
        .expect(401);
    });

    it('should return 404 for non-existent resources', async () => {
      await request(app.getHttpServer())
        .get('/users/nonexistent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should return 400 for invalid data', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'invalid-email',
          password: '123',
        })
        .expect(400);
    });
  });

  describe('Cleanup', () => {
    it('should delete session', async () => {
      await request(app.getHttpServer())
        .delete(`/sessions/${sessionId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should delete goal', async () => {
      await request(app.getHttpServer())
        .delete(`/goals/${goalId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should delete program', async () => {
      await request(app.getHttpServer())
        .delete(`/programs/${programId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should delete user', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });
});
