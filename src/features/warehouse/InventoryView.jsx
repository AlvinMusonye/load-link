import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Package, AlertTriangle, Filter } from 'lucide-react'
import { Button } from '../../components/ui'

const INVENTORY = [
  { id: 'INV-001', sku: 'ELEC-LPT-001', description: 'Laptop Computers (Lenovo)', category: 'Electronics', quantity: 48, unit: 'units', weight: 240, location: 'A1-R3', status: 'IN_STOCK', owner: 'Kigali Tech Imports', receivedDate: '2025-04-28', expiryDate: null },
  { id: 'INV-002', sku: 'FOOD-WHT-002', description: 'Wheat Flour 50kg Bags', category: 'Food & Agriculture', quantity: 620, unit: 'bags', weight: 31000, location: 'B2-R1', status: 'IN_STOCK', owner: 'Eldoret Grain Mills', receivedDate: '2025-05-01', expiryDate: '2025-11-01' },
  { id: 'INV-003', sku: 'PART-ENG-003', description: 'Engine Parts (Assorted)', category: 'Auto Parts', quantity: 15, unit: 'sets', weight: 450, location: 'C1-R2', status: 'RESERVED', owner: 'Mombasa Port Industries', receivedDate: '2025-04-25', expiryDate: null },
  { id: 'INV-004', sku: 'BVGE-WTR-004', description: 'Bottled Water 1L (Case of 24)', category: 'Beverages', quantity: 300, unit: 'cases', weight: 7200, location: 'B3-R4', status: 'IN_STOCK', owner: 'Kisumu Imports Ltd', receivedDate: '2025-04-30', expiryDate: '2026-04-30' },
  { id: 'INV-005', sku: 'AGRI-TEA-005', description: 'Processed Tea (Export Grade)', category: 'Agriculture', quantity: 80, unit: 'chests', weight: 2400, location: 'A2-R1', status: 'RESERVED', owner: 'Nakuru Agri Export', receivedDate: '2025-05-02', expiryDate: '2025-08-02' },
  { id: 'INV-006', sku: 'TXTL-CTN-006', description: 'Cotton Fabric Rolls', category: 'Textiles', quantity: 200, unit: 'rolls', weight: 3000, location: 'D1-R2', status: 'IN_STOCK', owner: 'Kampala Fresh Foods', receivedDate: '2025-04-20', expiryDate: null },
  { id: 'INV-007', sku: 'CHEM-SOL-007', description: 'Industrial Solvent (Hazmat)', category: 'Chemicals', quantity: 40, unit: 'drums', weight: 1600, location: 'HAZ-Z1', status: 'IN_STOCK', owner: 'Nairobi Traders Ltd', receivedDate: '2025-04-22', expiryDate: '2025-10-22' },
  { id: 'INV-008', sku: 'ELEC-PHN-008', description: 'Smartphones (Samsung A55)', category: 'Electronics', quantity: 120, unit: 'units', weight: 30, location: 'A1-R1', status: 'LOW_STOCK', owner: 'Kigali Tech Imports', receivedDate: '2025-03-15', expiryDate: null },
  { id: 'INV-009', sku: 'FOOD-OIL-009', description: 'Cooking Oil 20L Jerricans', category: 'Food & Agriculture', quantity: 5, unit: 'jerricans', weight: 100, location: 'B1-R3', status: 'LOW_STOCK', owner: 'Dar es Salaam Distributors', receivedDate: '2025-04-10', expiryDate: '2026-04-10' },
  { id: 'INV-010', sku: 'MACH-GEN-010', description: 'Diesel Generators 10KVA', category: 'Machinery', quantity: 6, unit: 'units', weight: 1800, location: 'C2-R1', status: 'IN_STOCK', owner: 'Mombasa Port Industries', receivedDate: '2025-05-03', expiryDate: null },
]

const CATEGORIES = ['ALL', ...Array.from(new Set(INVENTORY.map((i) => i.category)))]
const STATUS_FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: 'IN_STOCK', label: 'In Stock' },
  { key: 'RESERVED', label: 'Reserved' },
  { key: 'LOW_STOCK', label: 'Low Stock' },
]

function statusStyle(s) {
  if (s === 'IN_STOCK') return { bg: 'rgb(220 252 231)', color: 'rgb(21 128 61)' }
  if (s === 'RESERVED') return { bg: 'rgb(219 234 254)', color: 'rgb(30 58 138)' }
  if (s === 'LOW_STOCK') return { bg: 'rgb(254 243 199)', color: 'rgb(120 53 15)' }
  return { bg: 'rgb(243 244 246)', color: 'rgb(55 65 81)' }
}

function statusLabel(s) {
  return { IN_STOCK: 'In Stock', RESERVED: 'Reserved', LOW_STOCK: 'Low Stock' }[s] || s
}

export default function InventoryView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = INVENTORY.filter((item) => {
    const q = search.toLowerCase()
    const matchSearch = !search || item.sku.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.owner.toLowerCase().includes(q)
    const matchCat = category === 'ALL' || item.category === category
    const matchStatus = statusFilter === 'ALL' || item.status === statusFilter
    return matchSearch && matchCat && matchStatus
  })

  const totalWeight = filtered.reduce((s, i) => s + i.weight, 0)
  const lowStockCount = INVENTORY.filter((i) => i.status === 'LOW_STOCK').length

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
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>Inventory</h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>Warehouse {id} — All Stock</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'SKUs Tracked', value: INVENTORY.length },
          { label: 'Filtered Items', value: filtered.length },
          { label: 'Total Weight (kg)', value: totalWeight.toLocaleString() },
          { label: 'Low Stock Alerts', value: lowStockCount, alert: lowStockCount > 0 },
        ].map(({ label, value, alert }) => (
          <div
            key={label}
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${alert ? 'rgba(220,38,38,0.3)' : 'rgba(191,219,254,0.45)'}`,
              borderRadius: '1rem',
            }}
            className="p-4"
          >
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-xl font-bold" style={{ color: alert ? '#DC2626' : '#0F2A4A' }}>
              {value}
              {alert && <AlertTriangle className="inline h-4 w-4 ml-1.5 text-red-500" />}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.45)',
          borderRadius: '1rem',
        }}
        className="p-4 space-y-3"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search SKU, description, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={statusFilter === f.key
                  ? { background: '#1D4ED8', color: 'white' }
                  : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <Filter className="h-4 w-4 text-gray-400 mt-1" />
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={category === c
                ? { background: '#EDE9FE', color: '#7C3AED', border: '1px solid #C4B5FD' }
                : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
            >
              {c === 'ALL' ? 'All Categories' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.45)',
          borderRadius: '1rem',
          overflow: 'hidden',
        }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead style={{ backgroundColor: '#EFF6FF' }}>
              <tr>
                {['SKU', 'Description', 'Category', 'Qty', 'Weight (kg)', 'Location', 'Owner', 'Received', 'Expiry', 'Status'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-16 text-center">
                    <Package className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium text-gray-500">No inventory items found</p>
                  </td>
                </tr>
              ) : filtered.map((item) => {
                const ss = statusStyle(item.status)
                return (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono font-medium text-blue-700">{item.sku}</td>
                    <td className="px-4 py-3 text-sm max-w-40">
                      <p className="font-medium truncate" style={{ color: '#374151' }}>{item.description}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#EDE9FE', color: '#7C3AED' }}>{item.category}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold" style={{ color: '#0F2A4A' }}>
                      {item.quantity.toLocaleString()} {item.unit}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ color: '#374151' }}>{item.weight.toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono" style={{ color: '#374151' }}>{item.location}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#374151' }}>{item.owner}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ color: '#374151' }}>{item.receivedDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ color: item.expiryDate ? '#374151' : '#9CA3AF' }}>
                      {item.expiryDate || '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ background: ss.bg, color: ss.color }}>
                        {statusLabel(item.status)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
