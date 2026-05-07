import { useState } from 'react'
import { CreditCard, Smartphone, Building, Download, Search, TrendingUp } from 'lucide-react'

const PAYMENTS = [
  { id: 'PAY-2025-051', invoiceId: 'INV-2025-088', customer: 'Eldoret Grain Mills', amount: 145600, currency: 'KES', method: 'MPESA', reference: 'QKG7X3M2N1', date: '2025-05-02', receivedBy: 'System (M-Pesa STK)' },
  { id: 'PAY-2025-050', invoiceId: 'INV-2025-086', customer: 'Nakuru Agri Export', amount: 88400, currency: 'KES', method: 'BANK_TRANSFER', reference: 'KCB-TRF-20250501', date: '2025-05-01', receivedBy: 'Finance Desk' },
  { id: 'PAY-2025-049', invoiceId: 'INV-2025-084', customer: 'Nairobi Traders Ltd', amount: 320000, currency: 'KES', method: 'MPESA', reference: 'PJH4R8K5L2', date: '2025-04-30', receivedBy: 'System (M-Pesa STK)' },
  { id: 'PAY-2025-048', invoiceId: 'INV-2025-083', customer: 'Kampala Fresh Foods', amount: 210000, currency: 'KES', method: 'BANK_TRANSFER', reference: 'ABSA-TRF-20250429', date: '2025-04-29', receivedBy: 'Finance Desk' },
  { id: 'PAY-2025-047', invoiceId: 'INV-2025-082', customer: 'Kigali Tech Imports', amount: 95200, currency: 'KES', method: 'MPESA', reference: 'WWN2A1P9Q8', date: '2025-04-28', receivedBy: 'System (M-Pesa STK)' },
  { id: 'PAY-2025-046', invoiceId: 'INV-2025-081', customer: 'Mombasa Port Industries', amount: 480000, currency: 'KES', method: 'BANK_TRANSFER', reference: 'EQUITY-TRF-20250427', date: '2025-04-27', receivedBy: 'Finance Desk' },
  { id: 'PAY-2025-045', invoiceId: 'INV-2025-080', customer: 'Dar es Salaam Distributors', amount: 62400, currency: 'KES', method: 'MPESA', reference: 'ZXV5T7U3O4', date: '2025-04-26', receivedBy: 'System (M-Pesa STK)' },
  { id: 'PAY-2025-044', invoiceId: 'INV-2025-079', customer: 'Kisumu Imports Ltd', amount: 175000, currency: 'KES', method: 'CASH', reference: 'RCPT-2025-044', date: '2025-04-25', receivedBy: 'James Omondi' },
]

const METHOD_META = {
  MPESA: { label: 'M-Pesa', Icon: Smartphone, color: '#15803D', bg: 'rgb(220 252 231)' },
  BANK_TRANSFER: { label: 'Bank Transfer', Icon: Building, color: '#1D4ED8', bg: 'rgb(219 234 254)' },
  CASH: { label: 'Cash', Icon: CreditCard, color: '#7C3AED', bg: 'rgb(243 232 255)' },
}

function fmtCurrency(n, currency = 'KES') {
  return `${currency} ${Number(n).toLocaleString('en-KE')}`
}

export default function PaymentHistory() {
  const [search, setSearch] = useState('')
  const [methodFilter, setMethodFilter] = useState('ALL')

  const filtered = PAYMENTS.filter((p) => {
    const q = search.toLowerCase()
    const matchSearch = !search || p.id.toLowerCase().includes(q) || p.invoiceId.toLowerCase().includes(q) || p.customer.toLowerCase().includes(q) || p.reference.toLowerCase().includes(q)
    const matchMethod = methodFilter === 'ALL' || p.method === methodFilter
    return matchSearch && matchMethod
  })

  const totalReceived = filtered.reduce((s, p) => s + p.amount, 0)
  const mpesaCount = PAYMENTS.filter((p) => p.method === 'MPESA').length
  const bankCount = PAYMENTS.filter((p) => p.method === 'BANK_TRANSFER').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>Payment History</h1>
          <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>All received payments across all invoices</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Received (filtered)', value: fmtCurrency(totalReceived), Icon: TrendingUp, color: '#15803D' },
          { label: 'Total Transactions', value: filtered.length, Icon: CreditCard, color: '#1D4ED8' },
          { label: 'M-Pesa Payments', value: mpesaCount, Icon: Smartphone, color: '#059669' },
          { label: 'Bank Transfers', value: bankCount, Icon: Building, color: '#7C3AED' },
        ].map(({ label, value, Icon, color }) => (
          <div
            key={label}
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(191,219,254,0.45)',
              borderRadius: '1rem',
            }}
            className="p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon style={{ width: '1rem', height: '1rem', color }} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
            <p className="text-lg font-bold" style={{ color: '#0F2A4A' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
        <div className="flex gap-1.5">
          {['ALL', 'MPESA', 'BANK_TRANSFER', 'CASH'].map((key) => (
            <button
              key={key}
              onClick={() => setMethodFilter(key)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={methodFilter === key
                ? { background: '#1D4ED8', color: 'white' }
                : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
            >
              {key === 'ALL' ? 'All Methods' : METHOD_META[key]?.label || key}
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
                {['Payment ID', 'Invoice', 'Customer', 'Method', 'Reference', 'Amount', 'Date', 'Received By'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.map((pay) => {
                const method = METHOD_META[pay.method]
                const MethodIcon = method.Icon
                return (
                  <tr key={pay.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">{pay.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">{pay.invoiceId}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: '#374151' }}>{pay.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full" style={{ background: method.bg, color: method.color }}>
                        <MethodIcon className="h-3 w-3" />
                        {method.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-500">{pay.reference}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold" style={{ color: '#15803D' }}>
                      {fmtCurrency(pay.amount, pay.currency)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ color: '#374151' }}>{pay.date}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#6B7280' }}>{pay.receivedBy}</td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">No payments match your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
