// Load Link Route Configuration
// React Router v6 with lazy loading and nested routes

import { lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Lazy loaded feature components
const Dashboard = lazy(() => import('../features/reports/Dashboard.jsx'));
const ShipmentList = lazy(() => import('../features/shipments/ShipmentList.jsx'));
const NewShipmentForm = lazy(() => import('../features/shipments/NewShipmentForm.jsx'));
const ShipmentDetail = lazy(() => import('../features/shipments/ShipmentDetail.jsx'));
const ShipmentDocuments = lazy(() => import('../features/shipments/ShipmentDocuments.jsx'));

const FleetMap = lazy(() => import('../features/fleet/FleetMap.jsx'));
const VehicleList = lazy(() => import('../features/fleet/VehicleList.jsx'));
const VehicleDetail = lazy(() => import('../features/fleet/VehicleDetail.jsx'));
const DriverList = lazy(() => import('../features/fleet/DriverList.jsx'));
const DriverProfile = lazy(() => import('../features/fleet/DriverProfile.jsx'));

const WarehouseOverview = lazy(() => import('../features/warehouse/WarehouseOverview.jsx'));
const InventoryView = lazy(() => import('../features/warehouse/InventoryView.jsx'));
const InboundQueue = lazy(() => import('../features/warehouse/InboundQueue.jsx'));
const OutboundDispatch = lazy(() => import('../features/warehouse/OutboundDispatch.jsx'));

const CustomsEntryList = lazy(() => import('../features/customs/CustomsEntryList.jsx'));
const CustomsEntryDetail = lazy(() => import('../features/customs/CustomsEntryDetail.jsx'));

const InvoiceList = lazy(() => import('../features/billing/InvoiceList.jsx'));
const InvoiceDetail = lazy(() => import('../features/billing/InvoiceDetail.jsx'));
const PaymentHistory = lazy(() => import('../features/billing/PaymentHistory.jsx'));

const CustomerList = lazy(() => import('../features/customers/CustomerList.jsx'));
const CustomerProfile = lazy(() => import('../features/customers/CustomerProfile.jsx'));

const CarrierList = lazy(() => import('../features/vendors/CarrierList.jsx'));

const ReportsDashboard = lazy(() => import('../features/reports/ReportsDashboard.jsx'));

const OrgSettings = lazy(() => import('../features/settings/OrgSettings.jsx'));

const PublicTrackingPage = lazy(() => import('../features/tracking/PublicTrackingPage.jsx'));
const LoginPage = lazy(() => import('../features/auth/LoginPage.jsx'));

// Layout components
const AppShell = lazy(() => import('../components/layout/AppShell.jsx'));
const AuthLayout = lazy(() => import('../components/layout/AuthLayout.jsx'));

// Loading and error components
const LoadingSpinner = lazy(() => import('../components/ui/LoadingSpinner.jsx'));
const ErrorBoundary = lazy(() => import('../components/ui/ErrorBoundary.jsx'));

// Protected route wrapper
const ProtectedRoute = lazy(() => import('../components/auth/ProtectedRoute.jsx'));

// Route definitions with lazy loading
const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <ErrorBoundary>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </ErrorBoundary>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/track/:token',
    element: (
      <ErrorBoundary>
        <PublicTrackingPage />
      </ErrorBoundary>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        ),
      },
      // Shipment routes
      {
        path: 'shipments',
        children: [
          {
            index: true,
            element: (
              <ErrorBoundary>
                <ShipmentList />
              </ErrorBoundary>
            ),
          },
          {
            path: 'new',
            element: (
              <ErrorBoundary>
                <NewShipmentForm />
              </ErrorBoundary>
            ),
          },
          {
            path: ':id',
            element: (
              <ErrorBoundary>
                <ShipmentDetail />
              </ErrorBoundary>
            ),
          },
          {
            path: ':id/documents',
            element: (
              <ErrorBoundary>
                <ShipmentDocuments />
              </ErrorBoundary>
            ),
          },
        ],
      },
      // Fleet routes
      {
        path: 'fleet',
        children: [
          {
            index: true,
            element: (
              <ErrorBoundary>
                <FleetMap />
              </ErrorBoundary>
            ),
          },
          {
            path: 'vehicles',
            children: [
              {
                index: true,
                element: (
                  <ErrorBoundary>
                    <VehicleList />
                  </ErrorBoundary>
                ),
              },
              {
                path: ':id',
                element: (
                  <ErrorBoundary>
                    <VehicleDetail />
                  </ErrorBoundary>
                ),
              },
            ],
          },
          {
            path: 'drivers',
            children: [
              {
                index: true,
                element: (
                  <ErrorBoundary>
                    <DriverList />
                  </ErrorBoundary>
                ),
              },
              {
                path: ':id',
                element: (
                  <ErrorBoundary>
                    <DriverProfile />
                  </ErrorBoundary>
                ),
              },
            ],
          },
        ],
      },
      // Warehouse routes
      {
        path: 'warehouse',
        children: [
          {
            index: true,
            element: (
              <ErrorBoundary>
                <WarehouseOverview />
              </ErrorBoundary>
            ),
          },
          {
            path: ':id/inventory',
            element: (
              <ErrorBoundary>
                <InventoryView />
              </ErrorBoundary>
            ),
          },
          {
            path: ':id/inbound',
            element: (
              <ErrorBoundary>
                <InboundQueue />
              </ErrorBoundary>
            ),
          },
          {
            path: ':id/outbound',
            element: (
              <ErrorBoundary>
                <OutboundDispatch />
              </ErrorBoundary>
            ),
          },
        ],
      },
      // Customs routes
      {
        path: 'customs',
        children: [
          {
            index: true,
            element: (
              <ErrorBoundary>
                <CustomsEntryList />
              </ErrorBoundary>
            ),
          },
          {
            path: ':id',
            element: (
              <ErrorBoundary>
                <CustomsEntryDetail />
              </ErrorBoundary>
            ),
          },
        ],
      },
      // Billing routes
      {
        path: 'billing',
        children: [
          {
            path: 'invoices',
            children: [
              {
                index: true,
                element: (
                  <ErrorBoundary>
                    <InvoiceList />
                  </ErrorBoundary>
                ),
              },
              {
                path: ':id',
                element: (
                  <ErrorBoundary>
                    <InvoiceDetail />
                  </ErrorBoundary>
                ),
              },
            ],
          },
          {
            path: 'payments',
            element: (
              <ErrorBoundary>
                <PaymentHistory />
              </ErrorBoundary>
            ),
          },
        ],
      },
      // Customer routes
      {
        path: 'customers',
        children: [
          {
            index: true,
            element: (
              <ErrorBoundary>
                <CustomerList />
              </ErrorBoundary>
            ),
          },
          {
            path: ':id',
            element: (
              <ErrorBoundary>
                <CustomerProfile />
              </ErrorBoundary>
            ),
          },
        ],
      },
      // Vendor routes
      {
        path: 'vendors',
        children: [
          {
            index: true,
            element: (
              <ErrorBoundary>
                <CarrierList />
              </ErrorBoundary>
            ),
          },
        ],
      },
      // Reports routes
      {
        path: 'reports',
        element: (
          <ErrorBoundary>
            <ReportsDashboard />
          </ErrorBoundary>
        ),
      },
      // Settings routes
      {
        path: 'settings',
        element: (
          <ErrorBoundary>
            <OrgSettings />
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <ErrorBoundary>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
            <p className="text-gray-600 mb-8">Page not found</p>
            <a 
              href="/" 
              className="btn-primary"
            >
              Go Home
            </a>
          </div>
        </div>
      </ErrorBoundary>
    ),
  },
]);

// Export router provider component
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

// Export individual routes for testing or programmatic navigation
export { router };

// Route path constants for programmatic navigation
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/',
  SHIPMENTS: {
    LIST: '/shipments',
    NEW: '/shipments/new',
    DETAIL: (id) => `/shipments/${id}`,
    DOCUMENTS: (id) => `/shipments/${id}/documents`,
  },
  FLEET: {
    MAP: '/fleet',
    VEHICLES: {
      LIST: '/fleet/vehicles',
      DETAIL: (id) => `/fleet/vehicles/${id}`,
    },
    DRIVERS: {
      LIST: '/fleet/drivers',
      DETAIL: (id) => `/fleet/drivers/${id}`,
    },
  },
  WAREHOUSE: {
    OVERVIEW: '/warehouse',
    INVENTORY: (id) => `/warehouse/${id}/inventory`,
    INBOUND: (id) => `/warehouse/${id}/inbound`,
    OUTBOUND: (id) => `/warehouse/${id}/outbound`,
  },
  CUSTOMS: {
    LIST: '/customs',
    DETAIL: (id) => `/customs/${id}`,
  },
  BILLING: {
    INVOICES: {
      LIST: '/billing/invoices',
      DETAIL: (id) => `/billing/invoices/${id}`,
    },
    PAYMENTS: '/billing/payments',
  },
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id) => `/customers/${id}`,
  },
  VENDORS: {
    LIST: '/vendors',
  },
  REPORTS: '/reports',
  SETTINGS: '/settings',
  TRACKING: (token) => `/track/${token}`,
};
