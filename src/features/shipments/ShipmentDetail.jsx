import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Edit,
  Download,
  Printer,
  MoreHorizontal,
  Truck,
  Plane,
  Ship,
  Train,
  CheckCircle,
  Circle,
  Clock,
  AlertTriangle,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  FileText,
  DollarSign,
  Navigation,
  XCircle,
} from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/ui'
import { Button } from '../../components/ui'

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

// ─── Timeline steps definition ─────────────────────────────────────────────────
const ALL_TIMELINE_STEPS = [
  { key: 'DRAFT', label: 'Shipment Created', sub: 'Order placed and draft created' },
  { key: 'CONFIRMED', label: 'Confirmed', sub: 'Shipment confirmed by operations' },
  { key: 'PICKUP_SCHEDULED', label: 'Pickup Scheduled', sub: 'Driver assigned and pickup booked' },
  { key: 'PICKED_UP', label: 'Picked Up', sub: 'Cargo collected from origin' },
  { key: 'IN_TRANSIT', label: 'In Transit', sub: 'Cargo en route to destination' },
  { key: 'AT_CUSTOMS', label: 'At Customs', sub: 'Clearance at border / customs' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', sub: 'Last mile delivery in progress' },
  { key: 'DELIVERED', label: 'Delivered', sub: 'Cargo received at destination' },
]

const STATUS_ORDER = [
  'DRAFT',
  'CONFIRMED',
  'PICKUP_SCHEDULED',
  'PICKED_UP',
  'IN_TRANSIT',
  'AT_CUSTOMS',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
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

// Mock events feed
const buildEvents = (shipment) => [
  {
    id: 1,
    timestamp: shipment.createdAt,
    actor: 'John Admin',
    description: `Shipment ${shipment.id} created and submitted for review`,
    type: 'info',
  },
  {
    id: 2,
    timestamp: new Date(new Date(shipment.createdAt).getTime() + 3600000).toISOString(),
    actor: 'Ops Manager',
    description: 'Shipment confirmed. Carrier assigned: ' + (shipment.carrier || 'TBD'),
    type: 'success',
  },
  {
    id: 3,
    timestamp: new Date(new Date(shipment.createdAt).getTime() + 7200000).toISOString(),
    actor: 'System',
    description: 'Tracking number issued: ' + (shipment.trackingNumber || 'Pending'),
    type: 'info',
  },
  {
    id: 4,
    timestamp: new Date(new Date(shipment.createdAt).getTime() + 18000000).toISOString(),
    actor: shipment.driver || 'Unassigned Driver',
    description: `Cargo picked up from ${shipment.origin.city}. Vehicle: ${shipment.vehicle || 'TBD'}`,
    type: 'success',
  },
  {
    id: 5,
    timestamp: new Date(new Date(shipment.createdAt).getTime() + 36000000).toISOString(),
    actor: 'System',
    description: `Shipment departed ${shipment.origin.city}. GPS tracking active.`,
    type: 'info',
  },
  {
    id: 6,
    timestamp: new Date(new Date(shipment.createdAt).getTime() + 54000000).toISOString(),
    actor: 'Border Control',
    description: 'Vehicle arrived at border crossing. Documents submitted for inspection.',
    type: 'warning',
  },
  {
    id: 7,
    timestamp: new Date(new Date(shipment.createdAt).getTime() + 72000000).toISOString(),
    actor: 'Customs Officer',
    description: 'All documents verified. Customs cleared. Shipment released for delivery.',
    type: 'success',
  },
  {
    id: 8,
    timestamp: new Date(new Date(shipment.createdAt).getTime() + 90000000).toISOString(),
    actor: 'System',
    description: `Expected delivery: ${shipment.destination.city}`,
    type: 'info',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatCurrency(amount, currency = 'KES') {
  return `${currency} ${Number(amount).toLocaleString('en-KE')}`
}

function formatDate(iso, fallback = '—') {
  if (!iso) return fallback
  return new Date(iso).toLocaleDateString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(iso, fallback = '—') {
  if (!iso) return fallback
  return new Date(iso).toLocaleString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatWeight(grams) {
  return `${(grams / 1000).toLocaleString('en-KE', { maximumFractionDigits: 1 })} kg`
}

function ModeIcon({ mode, className = 'h-4 w-4' }) {
  switch (mode) {
    case 'AIR': return <Plane className={className} />
    case 'SEA': return <Ship className={className} />
    case 'RAIL': return <Train className={className} />
    default: return <Truck className={className} />
  }
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-medium text-right ml-4" style={{ color: '#374151' }}>
        {value ?? '—'}
      </span>
    </div>
  )
}

// ─── Timeline Component ────────────────────────────────────────────────────────
function ShipmentTimeline({ status }) {
  const isException = status === 'EXCEPTION' || status === 'CANCELLED'
  const currentIdx = STATUS_ORDER.indexOf(status)

  return (
    <div className="space-y-0">
      {ALL_TIMELINE_STEPS.map((step, idx) => {
        const stepIdx = STATUS_ORDER.indexOf(step.key)
        const done = !isException && stepIdx < currentIdx
        const active = !isException && stepIdx === currentIdx
        const pending = isException ? true : stepIdx > currentIdx

        return (
          <div key={step.key} className="flex gap-4">
            {/* Icon column */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  done
                    ? 'bg-green-100 text-green-600'
                    : active
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-300'
                }`}
              >
                {done ? (
                  <CheckCircle className="h-4 w-4" />
                ) : active ? (
                  <Navigation className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              {idx < ALL_TIMELINE_STEPS.length - 1 && (
                <div
                  className={`w-0.5 flex-1 my-1 min-h-6 ${
                    done ? 'bg-green-300' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-5 flex-1 min-w-0">
              <p
                className={`text-sm font-semibold ${
                  done ? 'text-green-700' : active ? 'text-blue-700' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{step.sub}</p>
            </div>
          </div>
        )
      })}

      {/* Exception / Cancelled overlay */}
      {isException && (
        <div className="flex gap-4 mt-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100 text-red-600 flex-shrink-0">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="pb-2">
            <p className="text-sm font-semibold text-red-700">
              {status === 'EXCEPTION' ? 'Exception Raised' : 'Shipment Cancelled'}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Manual intervention required</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Route Map Placeholder ─────────────────────────────────────────────────────
function RouteMapPlaceholder({ origin, destination }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%)',
        minHeight: '180px',
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #93C5FD 0, #93C5FD 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #93C5FD 0, #93C5FD 1px, transparent 1px, transparent 32px)',
        }}
      />

      {/* Route line */}
      <div className="absolute inset-0 flex items-center justify-between px-10">
        {/* Origin dot */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-blue-700 ring-4 ring-blue-200 shadow-lg" />
          <span className="text-xs font-semibold text-blue-900">{origin.city}</span>
          <span className="text-xs text-blue-600">{origin.country}</span>
        </div>

        {/* Dashed animated line */}
        <div className="flex-1 mx-4 relative h-0.5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #3B82F6 0px, #3B82F6 10px, transparent 10px, transparent 20px)',
              backgroundSize: '200% 100%',
              animation: 'marqueeScroll 2s linear infinite',
            }}
          />
          {/* Truck icon on line */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md border border-blue-200"
            style={{ animation: 'floatY 3s ease-in-out infinite' }}
          >
            <Truck className="h-4 w-4 text-blue-700" />
          </div>
        </div>

        {/* Destination dot */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-green-600 ring-4 ring-green-200 shadow-lg" />
          <span className="text-xs font-semibold text-blue-900">{destination.city}</span>
          <span className="text-xs text-blue-600">{destination.country}</span>
        </div>
      </div>

      <div className="absolute bottom-2 right-3 text-xs text-blue-400">
        Live tracking via GPS
      </div>
    </div>
  )
}

// ─── Events Feed ──────────────────────────────────────────────────────────────
function EventsFeed({ events }) {
  const iconMap = {
    info: <Clock className="h-4 w-4 text-blue-500" />,
    success: <CheckCircle className="h-4 w-4 text-green-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    error: <XCircle className="h-4 w-4 text-red-500" />,
  }
  const bgMap = {
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-amber-50 border-amber-200',
    error: 'bg-red-50 border-red-200',
  }

  return (
    <div className="space-y-3">
      {events.map((ev) => (
        <div
          key={ev.id}
          className={`flex gap-3 p-3 rounded-lg border ${bgMap[ev.type] || bgMap.info}`}
        >
          <div className="flex-shrink-0 mt-0.5">{iconMap[ev.type]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800">{ev.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{formatDateTime(ev.timestamp)}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-500">{ev.actor}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ShipmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const shipment = MOCK_SHIPMENTS.find((s) => s.id === id) || MOCK_SHIPMENTS[0]

  const freightCost = 45000
  const insuranceCost = shipment.totalValue * 0.005
  const totalCost = freightCost + insuranceCost + shipment.totalValue

  const events = buildEvents(shipment)

  const documents = [
    { id: 'd1', name: 'Waybill.pdf', type: 'Waybill', size: '245 KB' },
    { id: 'd2', name: 'Commercial Invoice.pdf', type: 'Invoice', size: '128 KB' },
    { id: 'd3', name: 'Packing List.pdf', type: 'Packing List', size: '98 KB' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/app/shipments')}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>
                {shipment.id}
              </h1>
              <span className={STATUS_CLASS_MAP[shipment.status] || 'status-badge status-draft'}>
                {STATUS_LABEL_MAP[shipment.status] || shipment.status}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
              {shipment.customer} &bull; {shipment.origin.city} → {shipment.destination.city}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700 bg-white transition-colors">
            <Edit className="h-4 w-4" /> Edit
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700 bg-white transition-colors">
            <Download className="h-4 w-4" /> POD
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700 bg-white transition-colors">
            <Printer className="h-4 w-4" /> Print
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu((p) => !p)}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 bg-white transition-colors"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {showMenu && (
              <div
                className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-200 z-20 py-1"
                onMouseLeave={() => setShowMenu(false)}
              >
                <Link
                  to={`/app/shipments/${shipment.id}/documents`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  Documents
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                  Share Tracking Link
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                  Add Note
                </button>
                <div className="my-1 border-t border-gray-100" />
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Cancel Shipment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left column (2/3) ─────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>
                Shipment Timeline
              </h2>
            </CardHeader>
            <CardBody>
              <ShipmentTimeline status={shipment.status} />
            </CardBody>
          </Card>

          {/* Cargo Table */}
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#0F2A4A' }}>
                <Package className="h-4 w-4 text-blue-600" /> Cargo Details
              </h2>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead style={{ backgroundColor: '#EFF6FF' }}>
                  <tr>
                    {['Item', 'Qty', 'Weight', 'Value (KES)', 'Hazardous'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: '#6B7280' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {shipment.cargo.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-3 text-sm font-medium" style={{ color: '#374151' }}>
                        {item.description}
                      </td>
                      <td className="px-5 py-3 text-sm" style={{ color: '#374151' }}>
                        {item.quantity}
                      </td>
                      <td className="px-5 py-3 text-sm" style={{ color: '#374151' }}>
                        {formatWeight(item.weight)}
                      </td>
                      <td className="px-5 py-3 text-sm" style={{ color: '#374151' }}>
                        {Number(item.value).toLocaleString('en-KE')}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            item.hazardous
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {item.hazardous ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Route Map */}
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#0F2A4A' }}>
                <MapPin className="h-4 w-4 text-blue-600" /> Route Overview
              </h2>
            </CardHeader>
            <CardBody>
              <RouteMapPlaceholder origin={shipment.origin} destination={shipment.destination} />
            </CardBody>
          </Card>
        </div>

        {/* ── Right column (1/3) ─────────────────────────────────── */}
        <div className="space-y-4">
          {/* Shipment Info */}
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>
                Shipment Info
              </h2>
            </CardHeader>
            <CardBody>
              <InfoRow label="Reference" value={shipment.id} />
              <InfoRow
                label="Status"
                value={
                  <span className={STATUS_CLASS_MAP[shipment.status]}>
                    {STATUS_LABEL_MAP[shipment.status]}
                  </span>
                }
              />
              <InfoRow
                label="Mode"
                value={
                  <span className="flex items-center gap-1">
                    <ModeIcon mode={shipment.mode} className="h-3.5 w-3.5" />
                    {shipment.mode.charAt(0) + shipment.mode.slice(1).toLowerCase()}
                  </span>
                }
              />
              <InfoRow label="Carrier" value={shipment.carrier} />
              <InfoRow label="Tracking #" value={shipment.trackingNumber} />
              <InfoRow label="Created" value={formatDate(shipment.createdAt)} />
              <InfoRow
                label="ETA"
                value={formatDate(shipment.actualDelivery || shipment.estimatedDelivery)}
              />
            </CardBody>
          </Card>

          {/* Customer */}
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#0F2A4A' }}>
                <User className="h-4 w-4 text-blue-600" /> Customer
              </h2>
            </CardHeader>
            <CardBody className="space-y-2">
              <p className="text-sm font-medium" style={{ color: '#374151' }}>
                {shipment.customer}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail className="h-3.5 w-3.5" />
                <span>accounts@{shipment.customer.toLowerCase().replace(/\s+/g, '')}.co.ke</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone className="h-3.5 w-3.5" />
                <span>+254 700 {Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                <span>
                  {shipment.origin.city}, {shipment.origin.country}
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Driver & Vehicle */}
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#0F2A4A' }}>
                <Truck className="h-4 w-4 text-blue-600" /> Driver &amp; Vehicle
              </h2>
            </CardHeader>
            <CardBody>
              {shipment.driver ? (
                <>
                  <InfoRow label="Driver" value={shipment.driver} />
                  <InfoRow label="Phone" value="+254 722 445 887" />
                  <InfoRow label="Plate" value={shipment.vehicle} />
                  <InfoRow label="Type" value="34-Tonne Rigid Truck" />
                </>
              ) : (
                <p className="text-xs text-gray-400 text-center py-4">
                  No driver assigned yet
                </p>
              )}
            </CardBody>
          </Card>

          {/* Financial */}
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#0F2A4A' }}>
                <DollarSign className="h-4 w-4 text-blue-600" /> Financial
              </h2>
            </CardHeader>
            <CardBody>
              <InfoRow label="Cargo Value" value={formatCurrency(shipment.totalValue)} />
              <InfoRow label="Freight Cost" value={formatCurrency(freightCost)} />
              <InfoRow
                label="Insurance (0.5%)"
                value={formatCurrency(insuranceCost.toFixed(0))}
              />
              <div className="flex items-center justify-between pt-2 mt-1 border-t border-blue-100">
                <span className="text-xs font-semibold" style={{ color: '#0F2A4A' }}>
                  Total
                </span>
                <span className="text-sm font-bold text-blue-700">
                  {formatCurrency(Math.round(totalCost))}
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Documents Quick List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#0F2A4A' }}>
                  <FileText className="h-4 w-4 text-blue-600" /> Documents
                </h2>
                <Link
                  to={`/app/shipments/${shipment.id}/documents`}
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Manage
                </Link>
              </div>
            </CardHeader>
            <CardBody className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-blue-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">{doc.name}</p>
                      <p className="text-xs text-gray-400">{doc.type}</p>
                    </div>
                  </div>
                  <button className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Events Feed */}
      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>
            Activity &amp; Events
          </h2>
        </CardHeader>
        <CardBody>
          <EventsFeed events={events} />
        </CardBody>
      </Card>
    </div>
  )
}
