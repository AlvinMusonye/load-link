// Load Link Organizations Service
// Handles all organization and branch management API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('Organizations API Base URL configured as:', API_BASE_URL);

class OrganizationsService {
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
      console.error('Error response is HTML:', html.substring(0, 500));
      throw new Error(`Server error (${response.status}): Backend returned HTML instead of JSON. Check backend logs or endpoint configuration.`);
    }
    
    try {
      const errorText = await response.text();
      console.error('Error response text:', errorText);
      
      // Try to parse as JSON first
      try {
        const error = JSON.parse(errorText);
        throw new Error(error.error?.message || error.message || `Server error: ${response.status}`);
      } catch (jsonParseError) {
        // If not JSON, return the raw error text
        throw new Error(`Server error (${response.status}): ${errorText.substring(0, 200)}`);
      }
    } catch (error) {
      console.error('Error handling failed:', error);
      throw new Error(`Server error (${response.status}): ${error.message}`);
    }
  }

  // Get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    console.log('Token available:', !!token);
    console.log('Token length:', token ? token.length : 0);
    console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'none');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // 1. Organizations

  // List all organizations (SUPER_ADMIN only)
  async listAllOrganizations() {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Create new organization (SUPER_ADMIN only)
  async createOrganization(organizationData) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(organizationData),
    });

    return this.handleResponse(response);
  }

  // Get organization by slug (SUPER_ADMIN only)
  async getOrganizationBySlug(slug) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/${slug}/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Update organization by slug (SUPER_ADMIN only)
  async updateOrganization(slug, organizationData) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/${slug}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(organizationData),
    });

    return this.handleResponse(response);
  }

  // Deactivate organization (SUPER_ADMIN only)
  async deactivateOrganization(slug) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/${slug}/deactivate/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Activate organization (SUPER_ADMIN only)
  async activateOrganization(slug) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/${slug}/activate/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Get current user's organization
  async getMyOrganization() {
    const url = `${this.baseURL}/api/v1/organizations/me/`;
    console.log('Attempting to get organization from:', url);
    console.log('Auth headers:', this.getAuthHeaders());
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    console.log('Organization response status:', response.status);
    console.log('Organization response headers:', Object.fromEntries(response.headers.entries()));

    return this.handleResponse(response);
  }

  // Update current user's organization (ORG_ADMIN+)
  async updateMyOrganization(organizationData) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(organizationData),
    });

    return this.handleResponse(response);
  }

  // Upload organization logo (ORG_ADMIN+)
  async uploadOrganizationLogo(file) {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/logo/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });

    return this.handleResponse(response);
  }

  // 2. Branches

  // List all branches in the organization
  async listBranches() {
    const url = `${this.baseURL}/api/v1/organizations/me/branches/`;
    console.log('Attempting to list branches from:', url);
    console.log('Auth headers:', this.getAuthHeaders());
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    console.log('Branches response status:', response.status);
    console.log('Branches response headers:', Object.fromEntries(response.headers.entries()));

    return this.handleResponse(response);
  }

  // Create new branch (ORG_ADMIN+)
  async createBranch(branchData) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/branches/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(branchData),
    });

    return this.handleResponse(response);
  }

  // Get specific branch
  async getBranch(branchId) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/branches/${branchId}/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Update branch (ORG_ADMIN+)
  async updateBranch(branchId, branchData) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/branches/${branchId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(branchData),
    });

    return this.handleResponse(response);
  }

  // Delete branch (ORG_ADMIN+)
  async deleteBranch(branchId) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/branches/${branchId}/`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Set branch as headquarters (ORG_ADMIN+)
  async setBranchAsHeadquarters(branchId) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/branches/${branchId}/set-hq/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // 3. Configuration

  // Get organization configuration (ORG_ADMIN+)
  async getOrganizationConfig() {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/config/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Update organization configuration (ORG_ADMIN+)
  async updateOrganizationConfig(configData) {
    const response = await fetch(`${this.baseURL}/api/v1/organizations/me/config/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(configData),
    });

    return this.handleResponse(response);
  }
}

export const organizationsService = new OrganizationsService();
