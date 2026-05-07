import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpFromLine, Truck, Package, CheckCircle, Clock, Search } from 'lucide-react'

const OUTBOUND = [
  { id: 'OB-2025-031', shipmentRef: 'LL-2025-041', carrier: 'Trans Africa Logistics', vehicle: 'KBZ 012A', destination: 'Eldoret', items: 2, totalWeight: 900, scheduledTime: '2025-05-08 07:00', status: 'SCHEDULED', bay: 'Bay 2' },
  { id: 'OB-2025-030', shipmentRef: 'LL-2025-038', carrier: 'East Africa Express', vehicle: 'KDG 445B', destination: 'Kampala', items: 4, totalWeight: 2400, scheduledTime: '2025-05-07 12:00', status: 'LOADING', bay: 'Bay 3' },
  { id: 'OB-2025-029', shipmentRef: 'LL-2025-036', carrier: 'Trans Africa Logistics', vehicle: 'UAM 098C', destination: 'Kigali', items: 1, totalWeight: 240, scheduledTime: '2025-05-07 10:00', status: 'READY', bay: 'Bay 1' },
  { id: 'OB-2025-028', shipmentRef: 'LL-2025-034', carrier: 'Great Lakes Freight', vehicle: 'TZD 331D', destination: 'Mombasa', items: 3, totalWeight: 7200, scheduledTime: '2025-05-06 15:00', status: 'DISPATCHED', bay: 'Bay 4' },
  { id: 'OB-2025-027', shipmentRef: 'LL-2025-033', carrier: 'East Africa Express', vehicle: 'UBX 567F', destination: 'Dar es Salaam', items: 2, totalWeight: 450, scheduledTime: '2025-05-06 09:00', status: 'DISPATCHED', bay: 'Bay 2' },
]

const STATUS_META = {
  SCHEDULED: { bg: 'rgb(243 244 246)', color: 'rgb(55 65 81)', label: 'Scheduled', Icon: Clock },
  LOADING: { bg: 'rgb(224 231 255)', color: 'rgb(67 56 202)', label: 'Loading', Icon: Package },
  READY: { bg: 'rgb(254 243 199)', color: 'rgb(120 53 15)', label: 'Ready to Dispatch', Icon: ArrowUpFromLine },
  DISPATCHED: { bg: 'rgb(220 252 231)', color: 'rgb(21 128 61)', label: 'Dispatched', Icon: CheckCircle },
}

export default function OutboundDispatch() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = OUTBOUND.filter((item) => {
    const q = search.toLowerCase()
    const matchSearch = !search || item.id.toLowerCase().includes(q) || item.shipmentRef.toLowerCase().includes(q) || item.vehicle.toLowerCase().includes(q) || item.destination.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'ALL' || item.status === statusFilter
    return matchSearch && matchStatus
  })

  const pending = OUTBOUND.filter((i) => i.status !== 'DISPATCHED').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/app/warehouse')}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>Outbound Dispatch</h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>Warehouse {id} — {pending} pending dispatches</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {['ALL', ...Object.keys(STATUS_META)].map((key) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={statusFilter === key
              ? { background: '#1D4ED8', color: 'white' }
              : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
          >
            {key === 'ALL' ? 'All' : STATUS_META[key].label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search dispatches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const meta = STATUS_META[item.status]
          const StatusIcon = meta.Icon
          return (
            <div
              key={item.id}
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(191,219,254,0.45)',
                borderRadius: '1rem',
              }}
              className="p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EFF6FF' }}>
                    <StatusIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{item.id}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ background: meta.bg, color: meta.color }}>
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: '#374151' }}>
                      Shipment <span className="font-medium text-blue-700">{item.shipmentRef}</span> · {item.carrier}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm flex-wrap">
                  <div>
                    <p className="text-xs text-gray-400">Vehicle</p>
                    <div className="flex items-center gap-1">
                      <Truck className="h-3 w-3 text-gray-400" />
                      <p className="font-medium font-mono" style={{ color: '#374151' }}>{item.vehicle}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Destination</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.destination}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Items / Weight</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.items} · {item.totalWeight.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Scheduled</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.scheduledTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Bay</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.bay}</p>
                  </div>
                  {item.status !== 'DISPATCHED' && (
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                      {item.status === 'READY' ? 'Confirm Dispatch' : item.status === 'LOADING' ? 'Mark Ready' : 'Start Loading'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: '#6B7280' }}>
            <ArrowUpFromLine className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No outbound dispatches found</p>
          </div>
        )}
      </div>
    </div>
  )
}
