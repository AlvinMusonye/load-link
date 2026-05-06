import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AppShell from './components/layout/AppShell'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { useAuthStore } from './stores/authStore'
import { useOrganizationsStore } from './stores/organizationsStore'

// Lazy load all feature pages
const Dashboard = lazy(() => import('./features/reports/Dashboard'))
const ReportsDashboard = lazy(() => import('./features/reports/ReportsDashboard'))
const ShipmentList = lazy(() => import('./features/shipments/ShipmentList'))
const NewShipmentForm = lazy(() => import('./features/shipments/NewShipmentForm'))
const ShipmentDetail = lazy(() => import('./features/shipments/ShipmentDetail'))
const ShipmentDocuments = lazy(() => import('./features/shipments/ShipmentDocuments'))
const FleetMap = lazy(() => import('./features/fleet/FleetMap'))
const VehicleList = lazy(() => import('./features/fleet/VehicleList'))
const VehicleDetail = lazy(() => import('./features/fleet/VehicleDetail'))
const DriverList = lazy(() => import('./features/fleet/DriverList'))
const DriverProfile = lazy(() => import('./features/fleet/DriverProfile'))
const WarehouseOverview = lazy(() => import('./features/warehouse/WarehouseOverview'))
const InventoryView = lazy(() => import('./features/warehouse/InventoryView'))
const InboundQueue = lazy(() => import('./features/warehouse/InboundQueue'))
const OutboundDispatch = lazy(() => import('./features/warehouse/OutboundDispatch'))
const CustomsEntryList = lazy(() => import('./features/customs/CustomsEntryList'))
const CustomsEntryDetail = lazy(() => import('./features/customs/CustomsEntryDetail'))
const InvoiceList = lazy(() => import('./features/billing/InvoiceList'))
const InvoiceDetail = lazy(() => import('./features/billing/InvoiceDetail'))
const PaymentHistory = lazy(() => import('./features/billing/PaymentHistory'))
const CustomerList = lazy(() => import('./features/customers/CustomerList'))
const CustomerProfile = lazy(() => import('./features/customers/CustomerProfile'))
const CarrierList = lazy(() => import('./features/vendors/CarrierList'))
const OrgSettings = lazy(() => import('./features/settings/OrgSettings'))

function App() {
  const { isAuthenticated, isLoading, user } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      useAuthStore.getState().initialize()
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    if (isAuthenticated && user) {
      useOrganizationsStore.getState().initialize()
    }
  }, [isAuthenticated, user])

  return (
    <ProtectedRoute>
      <AppShell>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="shipments" element={<ShipmentList />} />
            <Route path="shipments/new" element={<NewShipmentForm />} />
            <Route path="shipments/:id" element={<ShipmentDetail />} />
            <Route path="shipments/:id/documents" element={<ShipmentDocuments />} />
            <Route path="fleet" element={<FleetMap />} />
            <Route path="fleet/vehicles" element={<VehicleList />} />
            <Route path="fleet/vehicles/:id" element={<VehicleDetail />} />
            <Route path="fleet/drivers" element={<DriverList />} />
            <Route path="fleet/drivers/:id" element={<DriverProfile />} />
            <Route path="warehouse" element={<WarehouseOverview />} />
            <Route path="warehouse/:id/inventory" element={<InventoryView />} />
            <Route path="warehouse/:id/inbound" element={<InboundQueue />} />
            <Route path="warehouse/:id/outbound" element={<OutboundDispatch />} />
            <Route path="customs" element={<CustomsEntryList />} />
            <Route path="customs/:id" element={<CustomsEntryDetail />} />
            <Route path="billing/invoices" element={<InvoiceList />} />
            <Route path="billing/invoices/:id" element={<InvoiceDetail />} />
            <Route path="billing/payments" element={<PaymentHistory />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/:id" element={<CustomerProfile />} />
            <Route path="vendors" element={<CarrierList />} />
            <Route path="reports" element={<ReportsDashboard />} />
            <Route path="settings" element={<OrgSettings />} />
          </Routes>
        </Suspense>
      </AppShell>
    </ProtectedRoute>
  )
}

export default App
