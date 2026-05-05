// Load Link TanStack Query Configuration
// Configures caching, stale times, and error handling

import { QueryClient } from '@tanstack/react-query';
import { CACHE_TIMES } from '../utils/constants.js';

// Create a new QueryClient instance with Load Link specific configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Enable stale-while-revalidate for all queries
      staleTime: CACHE_TIMES.SHIPMENT_LIST, // 30 seconds default
      gcTime: 5 * 60 * 1000, // 5 minutes garbage collection
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for network/server errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      networkMode: 'online',
    },
    mutations: {
      retry: 1,
      networkMode: 'online',
    },
  },
});

// Query key factory functions for consistent cache key management
export const queryKeys = {
  // Shipments
  shipments: {
    all: ['shipments'],
    lists: () => [...queryKeys.shipments.all, 'list'],
    list: (filters) => [...queryKeys.shipments.lists(), filters],
    details: () => [...queryKeys.shipments.all, 'detail'],
    detail: (id) => [...queryKeys.shipments.details(), id],
    events: (id) => [...queryKeys.shipments.detail(id), 'events'],
    documents: (id) => [...queryKeys.shipments.detail(id), 'documents'],
  },
  
  // Fleet
  fleet: {
    all: ['fleet'],
    vehicles: {
      all: () => [...queryKeys.fleet.all, 'vehicles'],
      lists: () => [...queryKeys.fleet.vehicles.all(), 'list'],
      list: (filters) => [...queryKeys.fleet.vehicles.lists(), filters],
      detail: (id) => [...queryKeys.fleet.vehicles.all(), 'detail', id],
      live: () => [...queryKeys.fleet.vehicles.all(), 'live'], // Real-time positions
    },
    drivers: {
      all: () => [...queryKeys.fleet.all, 'drivers'],
      lists: () => [...queryKeys.fleet.drivers.all(), 'list'],
      list: (filters) => [...queryKeys.fleet.drivers.lists(), filters],
      detail: (id) => [...queryKeys.fleet.drivers.all(), 'detail', id],
    },
  },
  
  // Customers
  customers: {
    all: ['customers'],
    lists: () => [...queryKeys.customers.all, 'list'],
    list: (filters) => [...queryKeys.customers.lists(), filters],
    detail: (id) => [...queryKeys.customers.all, 'detail', id],
  },
  
  // Billing
  billing: {
    all: ['billing'],
    invoices: {
      all: () => [...queryKeys.billing.all, 'invoices'],
      lists: () => [...queryKeys.billing.invoices.all(), 'list'],
      list: (filters) => [...queryKeys.billing.invoices.lists(), filters],
      detail: (id) => [...queryKeys.billing.invoices.all(), 'detail', id],
    },
    payments: {
      all: () => [...queryKeys.billing.all, 'payments'],
      lists: () => [...queryKeys.billing.payments.all(), 'list'],
      list: (filters) => [...queryKeys.billing.payments.lists(), filters],
      detail: (id) => [...queryKeys.billing.payments.all(), 'detail', id],
    },
  },
  
  // Reports
  reports: {
    all: ['reports'],
    dashboard: (orgId, dateRange) => [...queryKeys.reports.all, 'dashboard', orgId, dateRange],
    builder: (config) => [...queryKeys.reports.all, 'builder', config],
  },
  
  // Settings
  settings: {
    all: ['settings'],
    org: () => [...queryKeys.settings.all, 'org'],
    users: {
      all: () => [...queryKeys.settings.all, 'users'],
      lists: () => [...queryKeys.settings.users.all(), 'list'],
      list: (filters) => [...queryKeys.settings.users.lists(), filters],
      detail: (id) => [...queryKeys.settings.users.all(), 'detail', id],
    },
    roles: () => [...queryKeys.settings.all, 'roles'],
  },
  
  // Auth
  auth: {
    all: ['auth'],
    user: () => [...queryKeys.auth.all, 'user'],
    permissions: () => [...queryKeys.auth.all, 'permissions'],
  },
};

// Default query configurations for different data types
export const queryConfig = {
  // Shipment queries
  shipmentList: {
    staleTime: CACHE_TIMES.SHIPMENT_LIST * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  },
  shipmentDetail: {
    staleTime: CACHE_TIMES.SHIPMENT_DETAIL * 1000, // 60 seconds
    gcTime: 10 * 60 * 1000, // 10 minutes
  },
  
  // Fleet queries
  fleetLive: {
    staleTime: CACHE_TIMES.FLEET_POSITIONS * 1000, // 0 seconds (always fresh)
    gcTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  },
  
  // Billing queries
  invoiceList: {
    staleTime: CACHE_TIMES.INVOICE_LIST * 1000, // 60 seconds
    gcTime: 15 * 60 * 1000, // 15 minutes
  },
  
  // Dashboard queries
  dashboardMetrics: {
    staleTime: CACHE_TIMES.DASHBOARD_METRICS * 1000, // 0 seconds (real-time)
    gcTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // Refetch every minute
  },
  
  // Customer queries
  customerList: {
    staleTime: CACHE_TIMES.CUSTOMER_LIST * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  },
  
  // Organization settings
  orgConfig: {
    staleTime: CACHE_TIMES.ORG_CONFIG * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  },
};

// Error handler for API errors
export const handleQueryError = (error) => {
  console.error('Query Error:', error);
  
  // You can add global error handling here
  // For example, showing toast notifications for certain error types
  if (error?.response?.status === 401) {
    // Handle authentication errors
    // Redirect to login or refresh token
    console.warn('Authentication error - user may need to re-login');
  }
  
  if (error?.response?.status >= 500) {
    // Handle server errors
    console.error('Server error - please try again later');
  }
};

// Success handler for mutations
export const handleMutationSuccess = (data, variables, context) => {
  console.log('Mutation Success:', { data, variables, context });
  
  // You can add global success handling here
  // For example, showing success toast notifications
};

// Optimistic update helper
export const createOptimisticUpdate = (queryClient, queryKey, updateFn) => {
  return async (variables) => {
    // Cancel any outgoing refetches
    await queryClient.cancelQueries({ queryKey });
    
    // Snapshot the previous value
    const previousData = queryClient.getQueryData(queryKey);
    
    // Optimistically update to the new value
    queryClient.setQueryData(queryKey, updateFn(variables, previousData));
    
    // Return a context object with the snapshotted value
    return { previousData };
  };
};

// Rollback helper for failed mutations
export const createRollback = (queryClient, queryKey) => {
  return (context) => {
    queryClient.setQueryData(queryKey, context.previousData);
  };
};
