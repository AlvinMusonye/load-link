// Load Link UI State Store
// Zustand store for UI concerns: sidebar, modals, notifications, theme

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUIStore = create(
  persist(
    (set, get) => ({
      // Sidebar state
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Modal state
      activeModal: null,
      modalProps: {},
      openModal: (modalType, props = {}) => set({ 
        activeModal: modalType, 
        modalProps: props 
      }),
      closeModal: () => set({ 
        activeModal: null, 
        modalProps: {} 
      }),

      // Toast notification queue
      toastQueue: [],
      addToast: (toast) => set((state) => ({
        toastQueue: [...state.toastQueue, { 
          id: Date.now() + Math.random(), 
          timestamp: new Date().toISOString(),
          ...toast 
        }]
      })),
      removeToast: (toastId) => set((state) => ({
        toastQueue: state.toastQueue.filter(toast => toast.id !== toastId)
      })),
      clearToasts: () => set({ toastQueue: [] }),

      // Command palette
      commandPaletteOpen: false,
      openCommandPalette: () => set({ commandPaletteOpen: true }),
      closeCommandPalette: () => set({ commandPaletteOpen: false }),
      toggleCommandPalette: () => set((state) => ({ 
        commandPaletteOpen: !state.commandPaletteOpen 
      })),

      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      // Loading states
      loadingStates: {},
      setLoading: (key, loading) => set((state) => ({
        loadingStates: { ...state.loadingStates, [key]: loading }
      })),
      isLoading: (key) => get().loadingStates[key] || false,

      // Error states
      errorStates: {},
      setError: (key, error) => set((state) => ({
        errorStates: { ...state.errorStates, [key]: error }
      })),
      clearError: (key) => set((state) => {
        const newErrorStates = { ...state.errorStates };
        delete newErrorStates[key];
        return { errorStates: newErrorStates };
      }),
      getError: (key) => get().errorStates[key] || null,

      // Keyboard shortcuts
      keyboardShortcuts: {
        'ctrl+k': () => get().toggleCommandPalette(),
        'cmd+k': () => get().toggleCommandPalette(),
        'escape': () => {
          const state = get();
          if (state.commandPaletteOpen) {
            state.closeCommandPalette();
          } else if (state.activeModal) {
            state.closeModal();
          }
        },
      },

      // View preferences
      viewPreferences: {
        shipments: {
          pageSize: 20,
          sortBy: 'created_at',
          sortOrder: 'desc',
          columns: ['reference', 'customer', 'status', 'created_at', 'actions'],
        },
        fleet: {
          mapStyle: 'default',
          showRoutes: false,
          showHeatmap: false,
          filters: {
            status: [],
            vehicleType: [],
          },
        },
        billing: {
          pageSize: 20,
          sortBy: 'due_date',
          sortOrder: 'asc',
          showOverdueOnly: false,
        },
      },

      updateViewPreference: (module, preferences) => set((state) => ({
        viewPreferences: {
          ...state.viewPreferences,
          [module]: {
            ...state.viewPreferences[module],
            ...preferences,
          },
        },
      })),

      // Recent items for quick access
      recentItems: {
        shipments: [],
        customers: [],
        invoices: [],
        vehicles: [],
      },

      addRecentItem: (type, item) => set((state) => {
        const items = state.recentItems[type] || [];
        const filtered = items.filter(i => i.id !== item.id);
        const updated = [item, ...filtered].slice(0, 5); // Keep only 5 most recent
        return {
          recentItems: {
            ...state.recentItems,
            [type]: updated,
          },
        };
      }),

      // Global search state
      globalSearchOpen: false,
      globalSearchQuery: '',
      openGlobalSearch: () => set({ globalSearchOpen: true }),
      closeGlobalSearch: () => set({ 
        globalSearchOpen: false, 
        globalSearchQuery: '' 
      }),
      setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),

      // Breakpoint awareness
      isMobile: false,
      setIsMobile: (isMobile) => set({ isMobile }),
      
      isTablet: false,
      setIsTablet: (isTablet) => set({ isTablet }),

      // Online status
      isOnline: navigator.onLine,
      setIsOnline: (isOnline) => set({ isOnline }),

      // Network quality indicator
      networkQuality: 'good', // 'good', 'slow', 'poor'
      setNetworkQuality: (quality) => set({ networkQuality: quality }),

      // Page title management
      pageTitle: 'Load Link',
      setPageTitle: (title) => set({ 
        pageTitle: title ? `${title} - Load Link` : 'Load Link' 
      }),

      // Breadcrumb navigation
      breadcrumbs: [],
      setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

      // Help and support
      helpWidgetOpen: false,
      toggleHelpWidget: () => set((state) => ({ 
        helpWidgetOpen: !state.helpWidgetOpen 
      })),
      openHelpWidget: () => set({ helpWidgetOpen: true }),
      closeHelpWidget: () => set({ helpWidgetOpen: false }),
    }),
    {
      name: 'loadlink-ui-store',
      // Only persist certain keys, exclude temporary state
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
        viewPreferences: state.viewPreferences,
        recentItems: state.recentItems,
      }),
    }
  )
);

// Selectors for common combinations
export const useUISelectors = {
  // Check if any modal is open
  hasActiveModal: () => useUIStore((state) => !!state.activeModal),
  
  // Get current toast count
  toastCount: () => useUIStore((state) => state.toastQueue.length),
  
  // Check if app is in mobile view
  isMobileView: () => useUIStore((state) => state.isMobile),
  
  // Get current page title
  currentPageTitle: () => useUIStore((state) => state.pageTitle),
  
  // Check if there are any errors
  hasErrors: () => useUIStore((state) => Object.keys(state.errorStates).length > 0),
  
  // Get loading state for any operation
  isAnyLoading: () => useUIStore((state) => Object.values(state.loadingStates).some(Boolean)),
};

// Actions for common operations
export const useUIActions = {
  // Show success toast
  showSuccess: (message, options = {}) => {
    useUIStore.getState().addToast({
      type: 'success',
      message,
      duration: 4000,
      ...options,
    });
  },

  // Show error toast
  showError: (message, options = {}) => {
    useUIStore.getState().addToast({
      type: 'error',
      message,
      duration: 6000,
      ...options,
    });
  },

  // Show info toast
  showInfo: (message, options = {}) => {
    useUIStore.getState().addToast({
      type: 'info',
      message,
      duration: 4000,
      ...options,
    });
  },

  // Show warning toast
  showWarning: (message, options = {}) => {
    useUIStore.getState().addToast({
      type: 'warning',
      message,
      duration: 5000,
      ...options,
    });
  },

  // Set loading with error handling
  withLoading: async (key, asyncFn) => {
    const { setLoading, setError, clearError } = useUIStore.getState();
    
    try {
      setLoading(key, true);
      clearError(key);
      const result = await asyncFn();
      return result;
    } catch (error) {
      setError(key, error.message || 'An error occurred');
      throw error;
    } finally {
      setLoading(key, false);
    }
  },
};

export default useUIStore;
