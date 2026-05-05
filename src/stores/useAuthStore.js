// Load Link Authentication Store
// Zustand store for authentication state, tokens, and permissions

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // User state
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,

      // JWT tokens
      accessToken: null,
      refreshToken: null,
      tokenExpiry: null,

      // User permissions and roles
      permissions: [],
      roles: [],
      
      // Organization context
      currentOrganization: null,
      organizations: [],

      // Authentication actions
      login: (userData, tokens) => {
        const expiryTime = new Date().getTime() + (tokens.expiresIn || 3600) * 1000;
        
        set({
          currentUser: userData,
          isAuthenticated: true,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          tokenExpiry: expiryTime,
          permissions: userData.permissions || [],
          roles: userData.roles || [],
          currentOrganization: userData.organization,
          organizations: userData.organizations || [],
          isLoading: false,
        });
      },

      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          tokenExpiry: null,
          permissions: [],
          roles: [],
          currentOrganization: null,
          organizations: [],
          isLoading: false,
        });
      },

      // Token management
      setTokens: (tokens) => {
        const expiryTime = new Date().getTime() + (tokens.expiresIn || 3600) * 1000;
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          tokenExpiry: expiryTime,
        });
      },

      updateAccessToken: (newAccessToken) => {
        set({ accessToken: newAccessToken });
      },

      // Check if token is expired or about to expire
      isTokenExpired: () => {
        const { tokenExpiry } = get();
        if (!tokenExpiry) return true;
        
        // Consider expired if less than 5 minutes remaining
        const fiveMinutesFromNow = new Date().getTime() + 5 * 60 * 1000;
        return tokenExpiry < fiveMinutesFromNow;
      },

      // User profile updates
      updateProfile: (profileData) => {
        const { currentUser } = get();
        if (currentUser) {
          set({
            currentUser: { ...currentUser, ...profileData },
          });
        }
      },

      // Permission checking
      hasPermission: (permission) => {
        const { permissions } = get();
        return permissions.includes(permission);
      },

      hasAnyPermission: (permissionList) => {
        const { permissions } = get();
        return permissionList.some(permission => permissions.includes(permission));
      },

      hasAllPermissions: (permissionList) => {
        const { permissions } = get();
        return permissionList.every(permission => permissions.includes(permission));
      },

      // Role checking
      hasRole: (role) => {
        const { roles } = get();
        return roles.includes(role);
      },

      hasAnyRole: (roleList) => {
        const { roles } = get();
        return roleList.some(role => roles.includes(role));
      },

      // Organization management
      switchOrganization: (organizationId) => {
        const { organizations } = get();
        const newOrg = organizations.find(org => org.id === organizationId);
        if (newOrg) {
          set({
            currentOrganization: newOrg,
            // Reset permissions when switching orgs
            permissions: newOrg.permissions || [],
          });
        }
      },

      updateOrganization: (orgData) => {
        const { currentOrganization, organizations } = get();
        if (currentOrganization && currentOrganization.id === orgData.id) {
          set({
            currentOrganization: { ...currentOrganization, ...orgData },
            organizations: organizations.map(org => 
              org.id === orgData.id ? { ...org, ...orgData } : org
            ),
          });
        }
      },

      // Loading state
      setLoading: (loading) => set({ isLoading: loading }),

      // Authentication state refresh
      refreshAuthState: async () => {
        const { refreshToken, isTokenExpired } = get();
        
        if (!refreshToken || isTokenExpired()) {
          get().logout();
          return false;
        }

        try {
          // This would typically call an API endpoint
          // const response = await authAPI.refreshToken(refreshToken);
          // For now, just return true if token is still valid
          return true;
        } catch (error) {
          get().logout();
          return false;
        }
      },

      // Initialize auth state from stored data
      initializeAuth: () => {
        const { accessToken, tokenExpiry, currentUser } = get();
        
        if (accessToken && tokenExpiry && currentUser) {
          if (get().isTokenExpired()) {
            get().logout();
          } else {
            set({ isAuthenticated: true });
          }
        } else {
          get().logout();
        }
      },

      // Get authorization header for API requests
      getAuthHeader: () => {
        const { accessToken } = get();
        return accessToken ? `Bearer ${accessToken}` : null;
      },

      // User preferences
      preferences: {
        language: 'en',
        timezone: 'Africa/Nairobi',
        dateFormat: 'DD/MM/YYYY',
        currency: 'KES',
      },

      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        }));
      },

      // Session tracking
      lastActivity: new Date().toISOString(),
      updateLastActivity: () => {
        set({ lastActivity: new Date().toISOString() });
      },

      // Two-factor authentication state
      twoFactorEnabled: false,
      twoFactorRequired: false,

      enableTwoFactor: () => set({ twoFactorEnabled: true }),
      requireTwoFactor: () => set({ twoFactorRequired: true }),
      clearTwoFactorRequirement: () => set({ twoFactorRequired: false }),

      // Password reset state
      passwordResetRequired: false,
      requirePasswordReset: () => set({ passwordResetRequired: true }),
      clearPasswordResetRequirement: () => set({ passwordResetRequired: false }),
    }),
    {
      name: 'loadlink-auth-store',
      // Only persist authentication data, exclude temporary loading states
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        tokenExpiry: state.tokenExpiry,
        permissions: state.permissions,
        roles: state.roles,
        currentOrganization: state.currentOrganization,
        organizations: state.organizations,
        preferences: state.preferences,
        twoFactorEnabled: state.twoFactorEnabled,
        lastActivity: state.lastActivity,
      }),
    }
  )
);

// Selectors for common authentication checks
export const useAuthSelectors = {
  // Check if user is authenticated
  isAuthenticated: () => useAuthStore((state) => state.isAuthenticated),
  
  // Get current user
  currentUser: () => useAuthStore((state) => state.currentUser),
  
  // Check if user has specific role
  isAdmin: () => useAuthStore((state) => state.roles.includes('ADMIN')),
  isOperationsManager: () => useAuthStore((state) => state.roles.includes('OPERATIONS_MANAGER')),
  isDriver: () => useAuthStore((state) => state.roles.includes('DRIVER')),
  isFinance: () => useAuthStore((state) => state.roles.includes('FINANCE')),
  
  // Get user permissions
  permissions: () => useAuthStore((state) => state.permissions),
  
  // Get current organization
  currentOrganization: () => useAuthStore((state) => state.currentOrganization),
  
  // Check if token needs refresh
  needsTokenRefresh: () => useAuthStore((state) => state.isTokenExpired()),
};

// Common permission groups
export const PERMISSION_GROUPS = {
  SHIPMENTS: ['shipment.create', 'shipment.read', 'shipment.update', 'shipment.delete'],
  FLEET: ['vehicle.read', 'vehicle.update', 'driver.read', 'driver.update'],
  BILLING: ['invoice.create', 'invoice.read', 'invoice.update', 'payment.process'],
  CUSTOMERS: ['customer.create', 'customer.read', 'customer.update', 'customer.delete'],
  REPORTS: ['report.read', 'report.export'],
  SETTINGS: ['user.manage', 'organization.update', 'role.manage'],
};

export default useAuthStore;
