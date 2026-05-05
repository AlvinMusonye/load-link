// Load Link Authentication Service
// Handles all authentication API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('API Base URL configured as:', API_BASE_URL);

class AuthService {
  constructor() {
    this.baseURL = `${API_BASE_URL}`;
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    // Check if response is HTML (error page) instead of JSON
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (response.ok) {
      if (response.status === 204) {
        return null;
      }
      
      // Check if we're getting HTML instead of JSON
      if (contentType && contentType.includes('text/html')) {
        const html = await response.text();
        console.error('Received HTML instead of JSON:', html.substring(0, 200));
        throw new Error('Server returned HTML instead of JSON. Check if the backend is running and the endpoint exists.');
      }
      
      return await response.json();
    }
    
    // Handle error responses
    if (contentType && contentType.includes('text/html')) {
      const html = await response.text();
      console.error('Error response is HTML:', html.substring(0, 200));
      throw new Error(`Server error (${response.status}): Backend may not be running or endpoint doesn't exist`);
    }
    
    try {
      const error = await response.json();
      throw new Error(error.error?.message || `Server error: ${response.status}`);
    } catch (jsonError) {
      throw new Error(`Server error (${response.status}): Unable to parse error response`);
    }
  }

  // Get stored tokens
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  // Store tokens
  setTokens(access, refresh) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  // Clear tokens
  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Get auth headers
  getAuthHeaders() {
    const token = this.getAccessToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // 1. Authentication
  
  // Register a new user
  async register(userData) {
    const response = await fetch(`${this.baseURL}/api/v1/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return this.handleResponse(response);
  }

  // Login
  async login(email, password) {
    const url = `${this.baseURL}/api/v1/auth/login/`;
    console.log('Attempting login to:', url);
    console.log('Login payload:', { email, password: '***' });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await this.handleResponse(response);
    
    // Handle 2FA requirement
    if (data.requires_2fa) {
      return { requires_2fa: true, temp_token: data.temp_token };
    }

    // Store tokens and return user data
    this.setTokens(data.access, data.refresh);
    return { user: data.user, requires_2fa: false };
  }

  // Complete 2FA login
  async login2FA(tempToken, totpCode) {
    const response = await fetch(`${this.baseURL}/api/v1/auth/login/2fa/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ temp_token: tempToken, totp_code: totpCode }),
    });

    const data = await this.handleResponse(response);
    this.setTokens(data.access, data.refresh);
    return { user: data.user };
  }

  // Refresh access token
  async refreshToken() {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.baseURL}/api/v1/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    const data = await this.handleResponse(response);
    this.setTokens(data.access, data.refresh);
    return data.access;
  }

  // Logout
  async logout() {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      this.clearTokens();
      return;
    }

    try {
      await fetch(`${this.baseURL}/api/v1/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({ refresh }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  // 2. Email Verification

  // Verify email
  async verifyEmail(token) {
    const response = await fetch(`${this.baseURL}/email/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    return this.handleResponse(response);
  }

  // Resend verification email
  async resendVerificationEmail(email) {
    const response = await fetch(`${this.baseURL}/email/resend/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return this.handleResponse(response);
  }

  // 3. Password Management

  // Request password reset
  async requestPasswordReset(email) {
    const response = await fetch(`${this.baseURL}/password/reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return this.handleResponse(response);
  }

  // Confirm password reset
  async confirmPasswordReset(token, newPassword, newPasswordConfirm) {
    const response = await fetch(`${this.baseURL}/password/reset/confirm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      }),
    });

    return this.handleResponse(response);
  }

  // Change password
  async changePassword(oldPassword, newPassword, newPasswordConfirm) {
    const response = await fetch(`${this.baseURL}/password/change/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      }),
    });

    return this.handleResponse(response);
  }

  // 4. 2FA Management

  // Setup 2FA
  async setup2FA() {
    const response = await fetch(`${this.baseURL}/2fa/setup/`, {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
      },
    });

    return this.handleResponse(response);
  }

  // Activate 2FA
  async activate2FA(totpCode) {
    const response = await fetch(`${this.baseURL}/2fa/activate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify({ totp_code: totpCode }),
    });

    return this.handleResponse(response);
  }

  // Disable 2FA
  async disable2FA(password) {
    const response = await fetch(`${this.baseURL}/2fa/disable/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify({ password }),
    });

    return this.handleResponse(response);
  }

  // 5. Profile Management

  // Get current user profile
  async getProfile() {
    const response = await fetch(`${this.baseURL}/api/v1/auth/me/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Update profile
  async updateProfile(userData) {
    const response = await fetch(`${this.baseURL}/api/v1/auth/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(userData),
    });

    return this.handleResponse(response);
  }

  // Upload avatar
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`${this.baseURL}/api/v1/auth/me/avatar/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });

    return this.handleResponse(response);
  }

  // 6. User Management (ORG_ADMIN+)

  // List users
  async listUsers() {
    const response = await fetch(`${this.baseURL}/users/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Invite user
  async inviteUser(email, role, branch) {
    const response = await fetch(`${this.baseURL}/users/invite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify({ email, role, branch }),
    });

    return this.handleResponse(response);
  }

  // Accept invitation
  async acceptInvitation(token, userData) {
    const response = await fetch(`${this.baseURL}/users/accept-invite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, ...userData }),
    });

    return this.handleResponse(response);
  }

  // Get specific user
  async getUser(userId) {
    const response = await fetch(`${this.baseURL}/users/${userId}/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Update user
  async updateUser(userId, userData) {
    const response = await fetch(`${this.baseURL}/users/${userId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(userData),
    });

    return this.handleResponse(response);
  }

  // Activate user
  async activateUser(userId) {
    const response = await fetch(`${this.baseURL}/users/${userId}/activate/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Deactivate user
  async deactivateUser(userId) {
    const response = await fetch(`${this.baseURL}/users/${userId}/deactivate/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }
}

export const authService = new AuthService();
