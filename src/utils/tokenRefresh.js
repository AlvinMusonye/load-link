// Load Link Token Refresh Utility
// Handles automatic token refresh and API request interception

import { useAuthStore } from '../stores/authStore';

// Create a custom fetch wrapper that handles token refresh
export const createAuthenticatedFetch = () => {
  const { refreshToken } = useAuthStore.getState();

  return async (url, options = {}) => {
    const token = localStorage.getItem('access_token');
    
    // Add auth header if token exists
    const authOptions = token ? {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    } : options;

    try {
      const response = await fetch(url, authOptions);

      // If 401 Unauthorized, try to refresh token
      if (response.status === 401 && token) {
        try {
          const newToken = await refreshToken();
          
          // Retry the original request with new token
          const retryOptions = {
            ...options,
            headers: {
              ...options.headers,
              'Authorization': `Bearer ${newToken}`,
            },
          };
          
          return fetch(url, retryOptions);
        } catch (refreshError) {
          // Refresh failed, logout user
          useAuthStore.getState().logout();
          throw refreshError;
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  };
};

// Export a singleton instance
export const authenticatedFetch = createAuthenticatedFetch();

// Hook for components to use authenticated fetch
export const useAuthenticatedFetch = () => {
  return authenticatedFetch;
};
