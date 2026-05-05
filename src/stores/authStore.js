// Load Link Authentication Store
// Manages authentication state using Zustand

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/auth';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      requires2FA: false,
      tempToken: null,
      
      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      // Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await authService.login(email, password);
          
          if (result.requires_2fa) {
            set({ 
              requires2FA: true, 
              tempToken: result.temp_token,
              isLoading: false 
            });
            return { requires2FA: true };
          }
          
          set({ 
            user: result.user,
            isAuthenticated: true,
            requires2FA: false,
            tempToken: null,
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Complete 2FA login
      login2FA: async (totpCode) => {
        const { tempToken } = get();
        if (!tempToken) {
          throw new Error('No temporary token available');
        }
        
        set({ isLoading: true, error: null });
        
        try {
          const result = await authService.login2FA(tempToken, totpCode);
          
          set({ 
            user: result.user,
            isAuthenticated: true,
            requires2FA: false,
            tempToken: null,
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Register
      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const user = await authService.register(userData);
          set({ isLoading: false });
          return { success: true, user };
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Logout
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ 
            user: null,
            isAuthenticated: false,
            requires2FA: false,
            tempToken: null,
            error: null,
            isLoading: false 
          });
        }
      },
      
      // Refresh token
      refreshToken: async () => {
        try {
          const newToken = await authService.refreshToken();
          return newToken;
        } catch (error) {
          // Token refresh failed, logout user
          get().logout();
          throw error;
        }
      },
      
      // Load user profile
      loadProfile: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const user = await authService.getProfile();
          set({ 
            user,
            isAuthenticated: true,
            isLoading: false 
          });
          return user;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Update profile
      updateProfile: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedUser = await authService.updateProfile(userData);
          set({ 
            user: updatedUser,
            isLoading: false 
          });
          return updatedUser;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Change password
      changePassword: async (oldPassword, newPassword, newPasswordConfirm) => {
        set({ isLoading: true, error: null });
        
        try {
          await authService.changePassword(oldPassword, newPassword, newPasswordConfirm);
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Reset 2FA state
      reset2FAState: () => {
        set({ 
          requires2FA: false,
          tempToken: null 
        });
      },
      
      // Initialize auth state from stored tokens
      initialize: async () => {
        const token = authService.getAccessToken();
        if (!token) {
          return;
        }
        
        try {
          await get().loadProfile();
        } catch (error) {
          console.error('Failed to load user profile:', error);
          // Clear invalid tokens
          authService.clearTokens();
          set({ 
            user: null,
            isAuthenticated: false 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        requires2FA: state.requires2FA,
        tempToken: state.tempToken,
      }),
    }
  )
);

export { useAuthStore };
