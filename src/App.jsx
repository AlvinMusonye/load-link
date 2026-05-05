import { useState, useEffect } from 'react'
import React from 'react'
import { Card, CardHeader, CardBody, StatusBadge, Button } from './components/ui'
import { 
  BarChart3, 
  Package, 
  Truck, 
  MapPin, 
  DollarSign, 
  Users, 
  Bell,
  TrendingUp,
  Navigation,
  LogOut,
  Building2
} from 'lucide-react'
import { useAuthStore } from './stores/authStore'
import { useOrganizationsStore } from './stores/organizationsStore'
import ProtectedRoute from './components/auth/ProtectedRoute'
import OrganizationProfile from './components/organizations/OrganizationProfile'
import BranchesManagement from './components/organizations/BranchesManagement'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { user, logout, isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    // Initialize auth state when app loads
    if (!isAuthenticated && !isLoading) {
      useAuthStore.getState().initialize()
    }
  }, [isAuthenticated, isLoading])

  // Initialize organization data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      useOrganizationsStore.getState().initialize()
    }
  }, [isAuthenticated, user])

  const handleLogout = async () => {
    await logout()
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'shipments', label: 'Shipments', icon: Package },
    { id: 'fleet', label: 'Fleet', icon: Truck },
    { id: 'tracking', label: 'Tracking', icon: MapPin },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'organization', label: 'Organization', icon: Building2 },
  ]

  const recentShipments = [
    { id: 'LD-2024-001', status: 'IN_TRANSIT', origin: 'Nairobi', destination: 'Mombasa', progress: 65 },
    { id: 'LD-2024-002', status: 'DELIVERED', origin: 'Kampala', destination: 'Dar es Salaam', progress: 100 },
    { id: 'LD-2024-003', status: 'PICKED_UP', origin: 'Kigali', destination: 'Nairobi', progress: 25 },
    { id: 'LD-2024-004', status: 'CONFIRMED', origin: 'Mombasa', destination: 'Arusha', progress: 10 },
  ]

  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-900">Load Link</h1>
              </div>
              <p className="ml-3 text-sm text-gray-500">East African Logistics Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Notifications</span>
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user ? `${user.first_name} ${user.last_name}` : 'User'}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="ml-2 text-xs py-1 px-2"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Manage your logistics operations across East Africa
              </p>
            </div>

            {/* Dashboard Content */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Active Shipments</p>
                          <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                          <Truck className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Fleet Available</p>
                          <p className="text-2xl font-bold text-gray-900">18</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                          <Navigation className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">In Transit</p>
                          <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                          <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Revenue (KES)</p>
                          <p className="text-2xl font-bold text-gray-900">2.4M</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Recent Shipments */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Recent Shipments</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Shipment ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Route
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Progress
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentShipments.map((shipment) => (
                            <tr key={shipment.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {shipment.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {shipment.origin} → {shipment.destination}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={shipment.status} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${shipment.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-500">{shipment.progress}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            {/* Organization Tab Content */}
            {activeTab === 'organization' && (
              <div className="space-y-6">
                <OrganizationProfile />
                <BranchesManagement />
              </div>
            )}

            {/* Other Tabs Content */}
            {activeTab !== 'dashboard' && activeTab !== 'organization' && (
              <Card>
                <CardBody className="p-12 text-center">
                  <div className="mb-4">
                    {React.createElement(menuItems.find(item => item.id === activeTab)?.icon, { className: "h-16 w-16 text-gray-400 mx-auto" })}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {menuItems.find(item => item.id === activeTab)?.label}
                  </h3>
                  <p className="text-gray-600">
                    This section is under development. Check back soon for the full {menuItems.find(item => item.id === activeTab)?.label.toLowerCase()} management features.
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
      </ProtectedRoute>
  )
}

export default App
