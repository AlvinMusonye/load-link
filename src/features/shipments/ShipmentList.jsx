import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Truck,
  Plane,
  Ship,
  Train,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Package,
} from 'lucide-react'
import { Button } from '../../components/ui'
import { Card, CardHeader, CardBody } from '../../components/ui'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_SHIPMENTS = [
  {
    id: 'LL-2025-042',
    status: 'IN_TRANSIT',
    customer: 'Nairobi Traders Ltd',
    origin: { city: 'Nairobi', country: 'Kenya' },
    destination: { city: 'Mombasa', country: 'Kenya' },
    mode: 'ROAD',
    carrier: 'Trans Africa Logistics',
    driver: 'John Kamau',
    vehicle: 'KBZ 012A',
    cargo: [{ description: 'Electronics', quantity: 50, weight: 2000000, value: 450000 }],
    totalValue: 450000,
    currency: 'KES',
    createdAt: '2025-05-01T08:00:00Z',
    estimatedDelivery: '2025-05-06T16:00:00Z',
    trackingNumber: 'TRK-892341',
  },
  {
    id: 'LL-2025-041',
    status: 'DELIVERED',
    customer: 'Kampala Fresh Foods',
    origin: { city: 'Kampala', country: 'Uganda' },
    destination: { city: 'Dar es Salaam', country: 'Tanzania' },
    mode: 'ROAD',
    carrier: 'East Africa Express',
    driver: 'Mary Wanjiku',
    vehicle: 'KDG 445B',
    cargo: [{ description: 'Fresh Produce', quantity: 200, weight: 50000000, value: 280000 }],
    totalValue: 280000,
    currency: 'KES',
    createdAt: '2025-04-28T06:00:00Z',
    estimatedDelivery: '2025-05-03T12:00:00Z',
    actualDelivery: '2025-05-03T11:30:00Z',
    trackingNumber: 'TRK-892340',
  },
  {
    id: 'LL-2025-040',
    status: 'AT_CUSTOMS',
    customer: 'Kigali Tech Imports',
    origin: { city: 'Nairobi', country: 'Kenya' },
    destination: { city: 'Kigali', country: 'Rwanda' },
    mode: 'ROAD',
    carrier: 'Great Lakes Freight',
    driver: 'David Ochieng',
    vehicle: 'UAM 098C',
    cargo: [{ description: 'Computer Equipment', quantity: 30, weight: 900000, value: 1200000 }],
    totalValue: 1200000,
    currency: 'KES',
    createdAt: '2025-04-30T10:00:00Z',
    estimatedDelivery: '2025-05-07T09:00:00Z',
    trackingNumber: 'TRK-892339',
  },
  {
    id: 'LL-2025-039',
    status: 'CONFIRMED',
    customer: 'Mombasa Port Industries',
    origin: { city: 'Mombasa', country: 'Kenya' },
    destination: { city: 'Arusha', country: 'Tanzania' },
    mode: 'ROAD',
    carrier: 'Coastal Carriers',
    driver: null,
    vehicle: null,
    cargo: [{ description: 'Industrial Parts', quantity: 15, weight: 8000000, value: 680000 }],
    totalValue: 680000,
    currency: 'KES',
    createdAt: '2025-05-02T14:00:00Z',
    estimatedDelivery: '2025-05-08T10:00:00Z',
    trackingNumber: 'TRK-892338',
  },
  {
    id: 'LL-2025-038',
    status: 'DRAFT',
    customer: 'Dar es Salaam Distributors',
    origin: { city: 'Dar es Salaam', country: 'Tanzania' },
    destination: { city: 'Nairobi', country: 'Kenya' },
    mode: 'ROAD',
    carrier: null,
    driver: null,
    vehicle: null,
    cargo: [{ description: 'Textiles', quantity: 500, weight: 5000000, value: 320000 }],
    totalValue: 320000,
    currency: 'KES',
    createdAt: '2025-05-03T09:00:00Z',
    estimatedDelivery: null,
    trackingNumber: null,
  },
  {
    id: 'LL-2025-037',
    status: 'PICKED_UP',
    customer: 'Nakuru Agri Export',
    origin: { city: 'Nakuru', country: 'Kenya' },
    destination: { city: 'Kampala', country: 'Uganda' },
    mode: 'ROAD',
    carrier: 'Trans Africa Logistics',
    driver: 'Grace Muthoni',
    vehicle: 'TZD 331D',
    cargo: [{ description: 'Agricultural Products', quantity: 100, weight: 20000000, value: 160000 }],
    totalValue: 160000,
    currency: 'KES',
    createdAt: '2025-05-03T07:00:00Z',
    estimatedDelivery: '2025-05-05T18:00:00Z',
    trackingNumber: 'TRK-892337',
  },
  {
    id: 'LL-2025-036',
    status: 'OUT_FOR_DELIVERY',
    customer: 'Eldoret Grain Mills',
    origin: { city: 'Mombasa', country: 'Kenya' },
    destination: { city: 'Eldoret', country: 'Kenya' },
    mode: 'ROAD',
    carrier: 'Trans Africa Logistics',
    driver: 'Peter Mutua',
    vehicle: 'KAC 210E',
    cargo: [{ description: 'Wheat Flour', quantity: 300, weight: 75000000, value: 420000 }],
    totalValue: 420000,
    currency: 'KES',
    createdAt: '2025-05-02T05:00:00Z',
    estimatedDelivery: '2025-05-05T14:00:00Z',
    trackingNumber: 'TRK-892336',
  },
  {
    id: 'LL-2025-035',
    status: 'EXCEPTION',
    customer: 'Kisumu Imports Ltd',
    origin: { city: 'Mombasa', country: 'Kenya' },
    destination: { city: 'Kisumu', country: 'Kenya' },
    mode: 'ROAD',
    carrier: 'Lake Victoria Freight',
    driver: 'James Otieno',
    vehicle: 'UBX 567F',
    cargo: [{ description: 'Beverages', quantity: 200, weight: 40000000, value: 180000 }],
    totalValue: 180000,
    currency: 'KES',
    createdAt: '2025-04-29T11:00:00Z',
    estimatedDelivery: '2025-05-03T16:00:00Z',
    trackingNumber: 'TRK-892335',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'DRAFT', label: 'Draft' },
  { key: 'CONFIRMED', label: 'Confirmed' },
  { key: 'IN_TRANSIT', label: 'In Transit' },
  { key: 'AT_CUSTOMS', label: 'At Customs' },
  { key: 'DELIVERED', label: 'Delivered' },
  { key: 'EXCEPTION', label: 'Exception' },
]

const MODE_FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: 'ROAD', label: 'Road' },
  { key: 'AIR', label: 'Air' },
  { key: 'SEA', label: 'Sea' },
  { key: 'RAIL', label: 'Rail' },
]

const STATUS_CLASS_MAP = {
  DRAFT: 'status-badge status-draft',
  CONFIRMED: 'status-badge status-confirmed',
  PICKUP_SCHEDULED: 'status-badge status-pickup-scheduled',
  PICKED_UP: 'status-badge status-picked-up',
  IN_TRANSIT: 'status-badge status-in-transit',
  AT_CUSTOMS: 'status-badge status-at-customs',
  OUT_FOR_DELIVERY: 'status-badge status-out-for-delivery',
  DELIVERED: 'status-badge status-delivered',
  EXCEPTION: 'status-badge status-exception',
  CANCELLED: 'status-badge status-cancelled',
}

const STATUS_LABEL_MAP = {
  DRAFT: 'Draft',
  CONFIRMED: 'Confirmed',
  PICKUP_SCHEDULED: 'Pickup Scheduled',
  PICKED_UP: 'Picked Up',
  IN_TRANSIT: 'In Transit',
  AT_CUSTOMS: 'At Customs',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  EXCEPTION: 'Exception',
  CANCELLED: 'Cancelled',
}

function ModeIcon({ mode, className = 'h-4 w-4' }) {
  switch (mode) {
    case 'AIR':
      return <Plane className={className} />
    case 'SEA':
      return <Ship className={className} />
    case 'RAIL':
      return <Train className={className} />
    default:
      return <Truck className={className} />
  }
}

function formatCurrency(amount, currency = 'KES') {
  return `${currency} ${Number(amount).toLocaleString('en-KE')}`
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const PAGE_SIZE = 5

// ─── Component ────────────────────────────────────────────────────────────────
export default function ShipmentList() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [modeFilter, setModeFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const [openMenuId, setOpenMenuId] = useState(null)

  const filtered = MOCK_SHIPMENTS.filter((s) => {
    const matchesSearch =
      !search ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.origin.city.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.city.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter
    const matchesMode = modeFilter === 'ALL' || s.mode === modeFilter
    return matchesSearch && matchesStatus && matchesMode
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleStatusTab = (key) => {
    setStatusFilter(key)
    setPage(1)
  }

  const handleModeFilter = (key) => {
    setModeFilter(key)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>
            Shipments
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
            Manage all freight shipments across East Africa
          </p>
        </div>
        <Link to="/app/shipments/new">
          <Button variant="default" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Shipment
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.45)',
          borderRadius: '1rem',
        }}
        className="p-4 space-y-4"
      >
        {/* Top row: search + result count */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by ID, customer, or city..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
            />
          </div>
          <span className="text-sm ml-auto" style={{ color: '#6B7280' }}>
            {filtered.length} {filtered.length === 1 ? 'shipment' : 'shipments'} found
          </span>
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleStatusTab(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                statusFilter === tab.key
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1">
            {MODE_FILTERS.map((m) => (
              <button
                key={m.key}
                onClick={() => handleModeFilter(m.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  modeFilter === m.key
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shipments Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead style={{ backgroundColor: '#EFF6FF' }}>
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  Shipment ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  Route
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  Mode
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  Value
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  ETA
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <Package className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium text-gray-500">No shipments match your filters</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                paginated.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <Link
                        to={`/app/shipments/${shipment.id}`}
                        className="text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        {shipment.id}
                      </Link>
                      {shipment.trackingNumber && (
                        <p className="text-xs text-gray-400 mt-0.5">{shipment.trackingNumber}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium" style={{ color: '#374151' }}>
                        {shipment.customer}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm" style={{ color: '#374151' }}>
                        {shipment.origin.city}
                        <span className="mx-1.5 text-gray-400">→</span>
                        {shipment.destination.city}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {shipment.origin.country} → {shipment.destination.country}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm" style={{ color: '#374151' }}>
                        <ModeIcon mode={shipment.mode} />
                        <span>{shipment.mode.charAt(0) + shipment.mode.slice(1).toLowerCase()}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={STATUS_CLASS_MAP[shipment.status] || 'status-badge status-draft'}>
                        {STATUS_LABEL_MAP[shipment.status] || shipment.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#374151' }}>
                      {formatCurrency(shipment.totalValue, shipment.currency)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm" style={{ color: '#374151' }}>
                      {shipment.actualDelivery
                        ? formatDate(shipment.actualDelivery)
                        : formatDate(shipment.estimatedDelivery)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/app/shipments/${shipment.id}`}>
                          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-blue-200 text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </button>
                        </Link>
                        <div className="relative">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === shipment.id ? null : shipment.id)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                          {openMenuId === shipment.id && (
                            <div
                              className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1"
                              onMouseLeave={() => setOpenMenuId(null)}
                            >
                              <Link
                                to={`/app/shipments/${shipment.id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                              >
                                View Details
                              </Link>
                              <Link
                                to={`/app/shipments/${shipment.id}/documents`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                              >
                                Documents
                              </Link>
                              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                                Download POD
                              </button>
                              <div className="my-1 border-t border-gray-100" />
                              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-blue-100 bg-white rounded-b-lg">
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Showing{' '}
              <span className="font-medium text-gray-800">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{' '}
              of <span className="font-medium text-gray-800">{filtered.length}</span> shipments
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
