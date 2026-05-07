import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, ArrowRight } from 'lucide-react'

const MOCK_SHIPMENTS = {
  'TRK-LL2025040': {
    id: 'LL-2025-040',
    reference: 'TRK-LL2025040',
    status: 'IN_TRANSIT',
    origin: { city: 'Nairobi', country: 'Kenya' },
    destination: { city: 'Kigali', country: 'Rwanda' },
    carrier: 'Trans Africa Logistics',
    estimatedDelivery: '2025-05-09',
    lastUpdate: '2025-05-07 08:30',
    currentLocation: 'Gatuna Border Post, Rwanda',
    description: 'Computer Equipment — 30 units',
    weight: '900 kg',
    events: [
      { date: '2025-05-07 08:30', location: 'Gatuna Border Post', description: 'Customs cleared, en route to Kigali', status: 'active' },
      { date: '2025-05-06 22:00', location: 'Kabale, Uganda', description: 'Overnight rest stop, vehicle inspected', status: 'done' },
      { date: '2025-05-06 14:00', location: 'Kampala, Uganda', description: 'Cleared Uganda customs, transit in progress', status: 'done' },
      { date: '2025-05-05 09:00', location: 'Nairobi ICD', description: 'Shipment picked up and loaded', status: 'done' },
      { date: '2025-05-04 16:00', location: 'Nairobi', description: 'Shipment confirmed and documents processed', status: 'done' },
    ],
  },
  'TRK-LL2025036': {
    id: 'LL-2025-036',
    reference: 'TRK-LL2025036',
    status: 'DELIVERED',
    origin: { city: 'Mombasa', country: 'Kenya' },
    destination: { city: 'Nairobi', country: 'Kenya' },
    carrier: 'East Africa Express',
    estimatedDelivery: '2025-05-02',
    lastUpdate: '2025-05-02 14:30',
    currentLocation: 'Nairobi — Delivered',
    description: 'Wheat Flour — 300 bags',
    weight: '15,000 kg',
    events: [
      { date: '2025-05-02 14:30', location: 'Nairobi, Kenya', description: 'Delivered to recipient — Eldoret Grain Mills', status: 'done' },
      { date: '2025-05-02 07:00', location: 'Athi River, Kenya', description: 'Out for final delivery', status: 'done' },
      { date: '2025-05-01 22:00', location: 'Nairobi ICD', description: 'Arrived at destination depot', status: 'done' },
      { date: '2025-05-01 10:00', location: 'Mombasa Port', description: 'Departed Mombasa port warehouse', status: 'done' },
    ],
  },
}

const STATUS_META = {
  IN_TRANSIT: { label: 'In Transit', color: '#1D4ED8', bg: 'rgb(219 234 254)', Icon: Truck },
  DELIVERED: { label: 'Delivered', color: '#15803D', bg: 'rgb(220 252 231)', Icon: CheckCircle },
  CONFIRMED: { label: 'Confirmed', color: '#7C3AED', bg: 'rgb(243 232 255)', Icon: Package },
  AT_CUSTOMS: { label: 'At Customs', color: '#D97706', bg: 'rgb(254 243 199)', Icon: Clock },
}

function TrackingResult({ shipment }) {
  const meta = STATUS_META[shipment.status] || STATUS_META.CONFIRMED
  const StatusIcon = meta.Icon

  return (
    <div className="space-y-6 mt-8">
      {/* Status Card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.5)',
          borderRadius: '1.25rem',
        }}
        className="p-6"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold" style={{ color: '#0F2A4A' }}>{shipment.id}</h2>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full" style={{ background: meta.bg, color: meta.color }}>
                <StatusIcon className="h-4 w-4" />
                {meta.label}
              </span>
            </div>
            <p className="text-sm" style={{ color: '#6B7280' }}>{shipment.description} · {shipment.weight}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Estimated Delivery</p>
            <p className="text-base font-bold" style={{ color: '#0F2A4A' }}>{shipment.estimatedDelivery}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-xs text-gray-400">From</p>
            <p className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{shipment.origin.city}</p>
            <p className="text-xs text-gray-500">{shipment.origin.country}</p>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: '#BFDBFE' }} />
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: meta.bg }}>
              <StatusIcon className="h-4 w-4" style={{ color: meta.color }} />
            </div>
            <div className="flex-1 h-px" style={{ background: '#BFDBFE' }} />
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">To</p>
            <p className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{shipment.destination.city}</p>
            <p className="text-xs text-gray-500">{shipment.destination.country}</p>
          </div>
        </div>

        {/* Current location */}
        <div className="mt-4 flex items-center gap-2 p-3 rounded-lg" style={{ background: '#EFF6FF' }}>
          <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Current Location</p>
            <p className="text-sm font-medium" style={{ color: '#0F2A4A' }}>{shipment.currentLocation}</p>
          </div>
          <p className="text-xs text-gray-400 ml-auto">Updated {shipment.lastUpdate}</p>
        </div>
      </div>

      {/* Timeline */}
      <div
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.5)',
          borderRadius: '1.25rem',
        }}
        className="p-6"
      >
        <h3 className="text-sm font-bold mb-5" style={{ color: '#0F2A4A' }}>Tracking Events</h3>
        <div className="space-y-0">
          {shipment.events.map((event, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ background: event.status === 'active' ? '#1D4ED8' : '#BFDBFE', border: event.status === 'active' ? '2px solid #1D4ED8' : 'none', boxShadow: event.status === 'active' ? '0 0 0 4px rgba(29,78,216,0.15)' : 'none' }}
                />
                {i < shipment.events.length - 1 && (
                  <div className="w-px flex-1 mt-1 mb-1" style={{ background: '#BFDBFE', minHeight: '2rem' }} />
                )}
              </div>
              <div className="pb-5">
                <p className="text-sm font-medium" style={{ color: event.status === 'active' ? '#1D4ED8' : '#374151' }}>
                  {event.description}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{event.location}</span>
                  </div>
                  <span className="text-xs text-gray-400">{event.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carrier info */}
      <div
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.5)',
          borderRadius: '1.25rem',
        }}
        className="p-5 flex items-center justify-between gap-4 flex-wrap"
      >
        <div>
          <p className="text-xs text-gray-400">Carrier</p>
          <p className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>{shipment.carrier}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-blue-600" />
          <a href="tel:+254700000000" className="text-sm text-blue-700 font-medium">Contact Support</a>
        </div>
      </div>
    </div>
  )
}

export default function PublicTrackingPage() {
  const { token } = useParams()
  const [query, setQuery] = useState(token || '')
  const [submitted, setSubmitted] = useState(!!token)
  const [notFound, setNotFound] = useState(false)

  const shipment = query ? MOCK_SHIPMENTS[query] || null : null

  function handleTrack(e) {
    e?.preventDefault()
    if (!query.trim()) return
    const found = MOCK_SHIPMENTS[query.trim().toUpperCase()]
    setNotFound(!found)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #EFF6FF 100%)' }}>
      {/* Header */}
      <header className="border-b border-blue-200 bg-white bg-opacity-70 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-700 flex items-center justify-center">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-base" style={{ color: '#0F2A4A' }}>Load Link</span>
          </div>
          <a href="/app" className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors">
            Operator Login
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16">
        {/* Hero text */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#0F2A4A' }}>Track Your Shipment</h1>
          <p className="text-base" style={{ color: '#6B7280' }}>
            Enter your tracking reference to get real-time updates on your cargo across East Africa
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleTrack}>
          <div
            style={{
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(191,219,254,0.6)',
              borderRadius: '1rem',
            }}
            className="flex items-center gap-3 p-2"
          >
            <Search className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSubmitted(false); setNotFound(false) }}
              placeholder="e.g. TRK-LL2025040"
              className="flex-1 text-base outline-none bg-transparent py-2"
              style={{ color: '#0F2A4A' }}
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-colors"
              style={{ background: '#1D4ED8' }}
            >
              Track <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Results */}
        {submitted && notFound && (
          <div className="mt-8 text-center p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(191,219,254,0.5)' }}>
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-base font-semibold" style={{ color: '#374151' }}>Shipment not found</p>
            <p className="text-sm text-gray-500 mt-1">Please check your tracking reference and try again.</p>
          </div>
        )}

        {submitted && shipment && <TrackingResult shipment={shipment} />}

        {!submitted && (
          <p className="text-center text-xs mt-6" style={{ color: '#9CA3AF' }}>
            Try: TRK-LL2025040 or TRK-LL2025036
          </p>
        )}
      </main>
    </div>
  )
}
