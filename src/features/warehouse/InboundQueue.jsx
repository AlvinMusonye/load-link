import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowDownToLine, Truck, Package, Clock, CheckCircle, Search } from 'lucide-react'

const INBOUND = [
  { id: 'IB-2025-041', shipmentRef: 'LL-2025-040', carrier: 'Trans Africa Logistics', origin: 'Nairobi', items: 3, totalWeight: 1200, eta: '2025-05-08 09:00', status: 'SCHEDULED', assignedBay: 'Bay 3', specialHandling: false },
  { id: 'IB-2025-040', shipmentRef: 'LL-2025-039', carrier: 'East Africa Express', origin: 'Mombasa Port', items: 1, totalWeight: 31000, eta: '2025-05-07 14:30', status: 'IN_TRANSIT', assignedBay: 'Bay 1', specialHandling: false },
  { id: 'IB-2025-039', shipmentRef: 'LL-2025-037', carrier: 'Great Lakes Freight', origin: 'Kampala', items: 2, totalWeight: 900, eta: '2025-05-07 11:00', status: 'ARRIVED', assignedBay: 'Bay 2', specialHandling: true },
  { id: 'IB-2025-038', shipmentRef: 'LL-2025-036', carrier: 'Trans Africa Logistics', origin: 'Kigali', items: 4, totalWeight: 2400, eta: '2025-05-06 16:00', status: 'RECEIVING', assignedBay: 'Bay 4', specialHandling: false },
  { id: 'IB-2025-037', shipmentRef: 'LL-2025-035', carrier: 'East Africa Express', origin: 'Dar es Salaam', items: 2, totalWeight: 7200, eta: '2025-05-06 10:00', status: 'RECEIVED', assignedBay: 'Bay 1', specialHandling: false },
  { id: 'IB-2025-036', shipmentRef: 'LL-2025-033', carrier: 'Great Lakes Freight', origin: 'Nairobi ICD', items: 6, totalWeight: 8000, eta: '2025-05-05 08:00', status: 'RECEIVED', assignedBay: 'Bay 5', specialHandling: true },
  { id: 'IB-2025-035', shipmentRef: 'LL-2025-031', carrier: 'Trans Africa Logistics', origin: 'Eldoret', items: 1, totalWeight: 450, eta: '2025-05-05 13:00', status: 'RECEIVED', assignedBay: 'Bay 2', specialHandling: false },
]

const STATUS_META = {
  SCHEDULED: { bg: 'rgb(243 244 246)', color: 'rgb(55 65 81)', label: 'Scheduled', Icon: Clock },
  IN_TRANSIT: { bg: 'rgb(219 234 254)', color: 'rgb(30 58 138)', label: 'In Transit', Icon: Truck },
  ARRIVED: { bg: 'rgb(254 243 199)', color: 'rgb(120 53 15)', label: 'Arrived', Icon: ArrowDownToLine },
  RECEIVING: { bg: 'rgb(224 231 255)', color: 'rgb(67 56 202)', label: 'Receiving', Icon: Package },
  RECEIVED: { bg: 'rgb(220 252 231)', color: 'rgb(21 128 61)', label: 'Received', Icon: CheckCircle },
}

export default function InboundQueue() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = INBOUND.filter((item) => {
    const q = search.toLowerCase()
    const matchSearch = !search || item.id.toLowerCase().includes(q) || item.shipmentRef.toLowerCase().includes(q) || item.carrier.toLowerCase().includes(q) || item.origin.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'ALL' || item.status === statusFilter
    return matchSearch && matchStatus
  })

  const pending = INBOUND.filter((i) => i.status !== 'RECEIVED').length

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
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>Inbound Queue</h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>Warehouse {id} — {pending} pending arrivals</p>
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
            {key === 'ALL' ? 'All Statuses' : STATUS_META[key].label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search inbound entries..."
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
                      {item.specialHandling && (
                        <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: '#FEF3C7', color: '#92400E' }}>
                          Special Handling
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: '#374151' }}>
                      Shipment <span className="font-medium text-blue-700">{item.shipmentRef}</span> via {item.carrier}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm flex-wrap">
                  <div>
                    <p className="text-xs text-gray-400">Origin</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.origin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Items</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.items}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Weight</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.totalWeight.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">ETA</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.eta}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Bay</p>
                    <p className="font-medium" style={{ color: '#374151' }}>{item.assignedBay}</p>
                  </div>
                  {item.status !== 'RECEIVED' && (
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                      {item.status === 'ARRIVED' ? 'Start Receiving' : item.status === 'RECEIVING' ? 'Mark Received' : 'View Details'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: '#6B7280' }}>
            <ArrowDownToLine className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No inbound entries found</p>
          </div>
        )}
      </div>
    </div>
  )
}
