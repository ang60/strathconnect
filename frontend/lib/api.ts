const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    department: string;
  };
  accessToken: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string; // Optional - will be assigned by admin
  department?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // Try to parse error response as JSON
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If JSON parsing fails, try to get text content
          try {
            const textContent = await response.text();
            if (textContent.includes('<!DOCTYPE')) {
              errorMessage = `Server returned HTML instead of JSON. This usually means the backend server is not running or there's a routing issue. Status: ${response.status}`;
            } else {
              errorMessage = textContent || errorMessage;
            }
          } catch (textError) {
            // If all else fails, use the default error message
            console.error('Failed to parse error response:', textError);
          }
        }
        throw new Error(errorMessage);
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response but got ${contentType}. This usually means the backend server is not running or there's a routing issue.`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // Health check method
  async healthCheck(): Promise<any> {
    return this.request('/health');
  }

  // Authentication methods
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken(): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/refresh', {
      method: 'POST',
    });
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User methods
  async getCurrentUser(): Promise<any> {
    return this.request('/users/me');
  }

  async updateProfile(data: any): Promise<any> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Programs methods
  async getPrograms(): Promise<any[]> {
    return this.request('/programs');
  }

  async getProgram(id: string): Promise<any> {
    return this.request(`/programs/${id}`);
  }

  async createProgram(data: any): Promise<any> {
    return this.request('/programs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Goals methods
  async getGoals(): Promise<any[]> {
    return this.request('/goals');
  }

  async getGoal(id: string): Promise<any> {
    return this.request(`/goals/${id}`);
  }

  async createGoal(data: any): Promise<any> {
    return this.request('/goals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Sessions methods
  async getSessions(): Promise<any[]> {
    return this.request('/sessions');
  }

  async getSession(id: string): Promise<any> {
    return this.request(`/sessions/${id}`);
  }

  async createSession(data: any): Promise<any> {
    return this.request('/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Communication methods
  async getConversations(): Promise<any[]> {
    return this.request('/communication/conversations');
  }

  async getMessages(conversationId: string): Promise<any[]> {
    return this.request(`/communication/conversations/${conversationId}/messages`);
  }

  async sendMessage(conversationId: string, data: any): Promise<any> {
    return this.request(`/communication/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Admin methods
  async getPendingUsers(): Promise<any[]> {
    return this.request('/users/pending');
  }

  async assignRole(userId: string, role: string): Promise<any> {
    return this.request(`/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }
}

export const apiService = new ApiService();
