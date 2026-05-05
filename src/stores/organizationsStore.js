// Load Link Organizations Store
// Manages organization and branch state using Zustand

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { organizationsService } from '../services/organizations';

const useOrganizationsStore = create(
  persist(
    (set, get) => ({
      // State
      myOrganization: null,
      branches: [],
      organizationConfig: null,
      isLoading: false,
      error: null,
      
      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      // Organization Actions
      
      // Load current user's organization
      loadMyOrganization: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const organization = await organizationsService.getMyOrganization();
          set({ 
            myOrganization: organization,
            isLoading: false 
          });
          return organization;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Update current user's organization
      updateMyOrganization: async (organizationData) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedOrganization = await organizationsService.updateMyOrganization(organizationData);
          set({ 
            myOrganization: updatedOrganization,
            isLoading: false 
          });
          return updatedOrganization;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Upload organization logo
      uploadOrganizationLogo: async (file) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await organizationsService.uploadOrganizationLogo(file);
          
          // Update organization with new logo
          if (get().myOrganization) {
            set({ 
              myOrganization: {
                ...get().myOrganization,
                logo: result.logo,
                logo_url: result.logo
              },
              isLoading: false 
            });
          }
          
          return result;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Branch Actions
      
      // Load all branches
      loadBranches: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const branches = await organizationsService.listBranches();
          set({ 
            branches,
            isLoading: false 
          });
          return branches;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Create new branch
      createBranch: async (branchData) => {
        set({ isLoading: true, error: null });
        
        try {
          const newBranch = await organizationsService.createBranch(branchData);
          set({ 
            branches: [...get().branches, newBranch],
            isLoading: false 
          });
          return newBranch;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Update branch
      updateBranch: async (branchId, branchData) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedBranch = await organizationsService.updateBranch(branchId, branchData);
          set({ 
            branches: get().branches.map(branch => 
              branch.id === branchId ? updatedBranch : branch
            ),
            isLoading: false 
          });
          return updatedBranch;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Delete branch
      deleteBranch: async (branchId) => {
        set({ isLoading: true, error: null });
        
        try {
          await organizationsService.deleteBranch(branchId);
          set({ 
            branches: get().branches.filter(branch => branch.id !== branchId),
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Set branch as headquarters
      setBranchAsHeadquarters: async (branchId) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedBranch = await organizationsService.setBranchAsHeadquarters(branchId);
          
          // Update all branches to reflect new headquarters
          set({ 
            branches: get().branches.map(branch => ({
              ...branch,
              is_headquarters: branch.id === branchId
            })),
            isLoading: false 
          });
          
          return updatedBranch;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Configuration Actions
      
      // Load organization configuration
      loadOrganizationConfig: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const config = await organizationsService.getOrganizationConfig();
          set({ 
            organizationConfig: config,
            isLoading: false 
          });
          return config;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Update organization configuration
      updateOrganizationConfig: async (configData) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedConfig = await organizationsService.updateOrganizationConfig(configData);
          set({ 
            organizationConfig: updatedConfig,
            isLoading: false 
          });
          return updatedConfig;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Super Admin Actions (for platform-wide organization management)
      
      // List all organizations (SUPER_ADMIN only)
      listAllOrganizations: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const organizations = await organizationsService.listAllOrganizations();
          set({ isLoading: false });
          return organizations;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Create organization (SUPER_ADMIN only)
      createOrganization: async (organizationData) => {
        set({ isLoading: true, error: null });
        
        try {
          const organization = await organizationsService.createOrganization(organizationData);
          set({ isLoading: false });
          return organization;
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false 
          });
          throw error;
        }
      },
      
      // Initialize organization data
      initialize: async () => {
        try {
          // Load organization data in parallel
          await Promise.all([
            get().loadMyOrganization(),
            get().loadBranches(),
            get().loadOrganizationConfig(),
          ]);
        } catch (error) {
          console.error('Failed to initialize organization data:', error);
        }
      },
    }),
    {
      name: 'organizations-storage',
      partialize: (state) => ({
        myOrganization: state.myOrganization,
        branches: state.branches,
        organizationConfig: state.organizationConfig,
      }),
    }
  )
);

export { useOrganizationsStore };
