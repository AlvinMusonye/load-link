import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  Eye,
  FileText,
  Filter,
} from 'lucide-react'
import { Button, Card } from '../../components/ui'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CUSTOMS = [
  {
    id: 'CE-2025-089',
    shipmentId: 'LL-2025-040',
    declarationType: 'IMPORT',
    declarantName: 'Kigali Tech Imports',
    kraPin: 'P051234567K',
    itemDescription: 'Computer Equipment',
    hsCode: '8471.30.00',
    quantity: 30,
    weight: 900,
    customsValue: 1200000,
    currency: 'KES',
    dutyAmount: 144000,
    vatAmount: 57600,
    totalPayable: 201600,
    status: 'UNDER_REVIEW',
    submittedAt: '2025-05-03T10:00:00Z',
    kraRef: 'KRA-IMP-2025-67821',
    port: 'Nairobi ICD',
    broker: 'Swift Clearance Ltd',
  },
  {
    id: 'CE-2025-088',
    shipmentId: 'LL-2025-036',
    declarationType: 'IMPORT',
    declarantName: 'Eldoret Grain Mills',
    kraPin: 'P059876543E',
    itemDescription: 'Wheat Flour',
    hsCode: '1101.00.90',
    quantity: 300,
    weight: 75000,
    customsValue: 420000,
    currency: 'KES',
    dutyAmount: 0,
    vatAmount: 54600,
    totalPayable: 54600,
    status: 'CLEARED',
    submittedAt: '2025-05-01T08:00:00Z',
    clearedAt: '2025-05-02T14:30:00Z',
    kraRef: 'KRA-IMP-2025-67820',
    port: 'Mombasa',
    broker: 'Coastal Brokers Ltd',
  },
  {
    id: 'CE-2025-087',
    shipmentId: 'LL-2025-034',
    declarationType: 'EXPORT',
    declarantName: 'Nakuru Agri Export',
    kraPin: 'P052468013N',
    itemDescription: 'Agricultural Products',
    hsCode: '0709.99.00',
    quantity: 100,
    weight: 20000,
    customsValue: 160000,
    currency: 'KES',
    dutyAmount: 0,
    vatAmount: 0,
    totalPayable: 0,
    status: 'CLEARED',
    submittedAt: '2025-04-30T07:00:00Z',
    clearedAt: '2025-04-30T15:00:00Z',
    kraRef: 'KRA-EXP-2025-12345',
    port: 'Nairobi ICD',
    broker: 'Trans Border Agents',
  },
  {
    id: 'CE-2025-086',
    shipmentId: 'LL-2025-033',
    declarationType: 'IMPORT',
    declarantName: 'Kisumu Imports Ltd',
    kraPin: 'P051357924K',
    itemDescription: 'Beverages',
    hsCode: '2202.10.00',
    quantity: 200,
    weight: 40000,
    customsValue: 180000,
    currency: 'KES',
    dutyAmount: 36000,
    vatAmount: 28080,
    totalPayable: 64080,
    status: 'PENDING_PAYMENT',
    submittedAt: '2025-04-29T11:00:00Z',
    kraRef: 'KRA-IMP-2025-67819',
    port: 'Mombasa',
    broker: 'Coastal Brokers Ltd',
  },
  {
    id: 'CE-2025-085',
    shipmentId: 'LL-2025-032',
    declarationType: 'IMPORT',
    declarantName: 'Mombasa Port Industries',
    kraPin: 'P058642097M',
    itemDescription: 'Industrial Parts',
    hsCode: '8483.10.00',
    quantity: 15,
    weight: 8000,
    customsValue: 680000,
    currency: 'KES',
    dutyAmount: 68000,
    vatAmount: 93120,
    totalPayable: 161120,
    status: 'DOCUMENTS_REQUIRED',
    submittedAt: '2025-04-28T09:00:00Z',
    kraRef: 'KRA-IMP-2025-67818',
    port: 'Mombasa',
    broker: 'Swift Clearance Ltd',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'UNDER_REVIEW', label: 'Under Review' },
  { key: 'PENDING_PAYMENT', label: 'Pending Payment' },
  { key: 'DOCUMENTS_REQUIRED', label: 'Docs Required' },
  { key: 'CLEARED', label: 'Cleared' },
]

const TYPE_FILTERS = [
  { key: 'ALL', label: 'All Types' },
  { key: 'IMPORT', label: 'Import' },
  { key: 'EXPORT', label: 'Export' },
]

function getStatusStyle(status) {
  switch (status) {
    case 'CLEARED':
      return { background: 'rgb(220 252 231)', color: 'rgb(21 128 61)' }
    case 'UNDER_REVIEW':
      return { background: 'rgb(219 234 254)', color: 'rgb(30 58 138)' }
    case 'PENDING_PAYMENT':
      return { background: 'rgb(254 243 199)', color: 'rgb(120 53 15)' }
    case 'DOCUMENTS_REQUIRED':
      return { background: 'rgb(254 226 226)', color: 'rgb(185 28 28)' }
    case 'PENDING':
      return { background: 'rgb(243 244 246)', color: 'rgb(55 65 81)' }
    default:
      return { background: 'rgb(243 244 246)', color: 'rgb(55 65 81)' }
  }
}

function getStatusLabel(status) {
  const labels = {
    CLEARED: 'Cleared',
    UNDER_REVIEW: 'Under Review',
    PENDING_PAYMENT: 'Pending Payment',
    DOCUMENTS_REQUIRED: 'Docs Required',
    PENDING: 'Pending',
  }
  return labels[status] || status
}

function getTypeStyle(type) {
  if (type === 'IMPORT') {
    return { background: 'rgb(224 231 255)', color: 'rgb(67 56 202)' }
  }
  return { background: 'rgb(209 250 229)', color: 'rgb(6 95 70)' }
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

// ─── Component ────────────────────────────────────────────────────────────────
export default function CustomsEntryList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [typeFilter, setTypeFilter] = useState('ALL')

  const filtered = MOCK_CUSTOMS.filter((entry) => {
    const q = search.toLowerCase()
    const matchesSearch =
      !search ||
      entry.id.toLowerCase().includes(q) ||
      entry.shipmentId.toLowerCase().includes(q) ||
      entry.declarantName.toLowerCase().includes(q) ||
      entry.hsCode.toLowerCase().includes(q) ||
      entry.itemDescription.toLowerCase().includes(q)
    const matchesStatus = statusFilter === 'ALL' || entry.status === statusFilter
    const matchesType = typeFilter === 'ALL' || entry.declarationType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>
            Customs Entries
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
            Manage customs declarations and clearance
          </p>
        </div>
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => navigate('/app/customs/new')}
        >
          <Plus className="h-4 w-4" />
          New Declaration
        </Button>
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
        className="p-4 space-y-3"
      >
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by entry ID, shipment, declarant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4 text-gray-400 mr-1" />
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setTypeFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === f.key
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-sm ml-auto" style={{ color: '#6B7280' }}>
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                statusFilter === tab.key
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead style={{ backgroundColor: '#EFF6FF' }}>
              <tr>
                {[
                  'Entry ID',
                  'Shipment',
                  'Declarant',
                  'HS Code',
                  'Description',
                  'Port',
                  'Type',
                  'Customs Value',
                  'Duty + VAT',
                  'Status',
                  'Actions',
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#6B7280' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-16 text-center">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium text-gray-500">No customs entries match your filters</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                filtered.map((entry) => (
                  <tr key={entry.id} className="hover:bg-blue-50 transition-colors">
                    {/* Entry ID */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link
                        to={`/app/customs/${entry.id}`}
                        className="text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        {entry.id}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.submittedAt)}</p>
                    </td>

                    {/* Shipment */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link
                        to={`/app/shipments/${entry.shipmentId}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {entry.shipmentId}
                      </Link>
                    </td>

                    {/* Declarant */}
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium" style={{ color: '#374151' }}>
                        {entry.declarantName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{entry.kraPin}</p>
                    </td>

                    {/* HS Code */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono" style={{ color: '#374151' }}>
                        {entry.hsCode}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-4 py-4 max-w-40">
                      <p className="text-sm truncate" style={{ color: '#374151' }}>
                        {entry.itemDescription}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {entry.quantity} units · {entry.weight.toLocaleString()} kg
                      </p>
                    </td>

                    {/* Port */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-sm" style={{ color: '#374151' }}>{entry.port}</p>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={getTypeStyle(entry.declarationType)}
                      >
                        {entry.declarationType}
                      </span>
                    </td>

                    {/* Customs Value */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#374151' }}>
                      {formatCurrency(entry.customsValue, entry.currency)}
                    </td>

                    {/* Duty + VAT */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold" style={{ color: '#1D4ED8' }}>
                        {formatCurrency(entry.totalPayable, entry.currency)}
                      </p>
                      {entry.dutyAmount > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          Duty: {formatCurrency(entry.dutyAmount)} · VAT: {formatCurrency(entry.vatAmount)}
                        </p>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={getStatusStyle(entry.status)}
                      >
                        {getStatusLabel(entry.status)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <Link to={`/app/customs/${entry.id}`}>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-blue-200 text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        <div className="px-4 py-3 border-t border-blue-100 bg-white rounded-b-lg flex items-center justify-between">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Showing <span className="font-medium text-gray-800">{filtered.length}</span> of{' '}
            <span className="font-medium text-gray-800">{MOCK_CUSTOMS.length}</span> entries
          </p>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Total payable:{' '}
            <span className="font-semibold text-blue-700">
              {formatCurrency(
                filtered.reduce((sum, e) => sum + e.totalPayable, 0),
                'KES'
              )}
            </span>
          </p>
        </div>
      </Card>
    </div>
  )
}
