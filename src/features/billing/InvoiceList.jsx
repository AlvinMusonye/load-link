import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  Send,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Phone,
  FileText,
} from 'lucide-react'
import { Button, Card, CardHeader, CardBody, Modal, ModalContent, ModalHeader, ModalFooter } from '../../components/ui'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_INVOICES = [
  {
    id: 'INV-2025-0892',
    shipmentId: 'LL-2025-041',
    customer: 'Kampala Fresh Foods',
    amount: 85000,
    tax: 13600,
    total: 98600,
    currency: 'KES',
    status: 'PAID',
    issuedAt: '2025-05-03T12:00:00Z',
    dueDate: '2025-05-17T23:59:59Z',
    paidAt: '2025-05-03T13:45:00Z',
    paymentMethod: 'M-PESA',
    mpesaRef: 'QHX12Y3Z45',
  },
  {
    id: 'INV-2025-0891',
    shipmentId: 'LL-2025-042',
    customer: 'Nairobi Traders Ltd',
    amount: 120000,
    tax: 19200,
    total: 139200,
    currency: 'KES',
    status: 'PENDING',
    issuedAt: '2025-05-01T10:00:00Z',
    dueDate: '2025-05-15T23:59:59Z',
    paidAt: null,
    paymentMethod: null,
    mpesaRef: null,
  },
  {
    id: 'INV-2025-0890',
    shipmentId: 'LL-2025-040',
    customer: 'Kigali Tech Imports',
    amount: 250000,
    tax: 40000,
    total: 290000,
    currency: 'KES',
    status: 'OVERDUE',
    issuedAt: '2025-04-20T09:00:00Z',
    dueDate: '2025-05-04T23:59:59Z',
    paidAt: null,
    paymentMethod: null,
    mpesaRef: null,
  },
  {
    id: 'INV-2025-0889',
    shipmentId: 'LL-2025-039',
    customer: 'Mombasa Port Industries',
    amount: 95000,
    tax: 15200,
    total: 110200,
    currency: 'KES',
    status: 'DRAFT',
    issuedAt: '2025-05-02T14:00:00Z',
    dueDate: '2025-05-16T23:59:59Z',
    paidAt: null,
    paymentMethod: null,
    mpesaRef: null,
  },
  {
    id: 'INV-2025-0888',
    shipmentId: 'LL-2025-038',
    customer: 'Dar es Salaam Distributors',
    amount: 68000,
    tax: 10880,
    total: 78880,
    currency: 'KES',
    status: 'PAID',
    issuedAt: '2025-04-28T11:00:00Z',
    dueDate: '2025-05-12T23:59:59Z',
    paidAt: '2025-04-29T09:22:00Z',
    paymentMethod: 'BANK_TRANSFER',
    mpesaRef: null,
  },
  {
    id: 'INV-2025-0887',
    shipmentId: 'LL-2025-037',
    customer: 'Nakuru Agri Export',
    amount: 42000,
    tax: 6720,
    total: 48720,
    currency: 'KES',
    status: 'PAID',
    issuedAt: '2025-04-25T08:00:00Z',
    dueDate: '2025-05-09T23:59:59Z',
    paidAt: '2025-04-26T14:55:00Z',
    paymentMethod: 'M-PESA',
    mpesaRef: 'PLK89R2T01',
  },
  {
    id: 'INV-2025-0886',
    shipmentId: 'LL-2025-036',
    customer: 'Eldoret Grain Mills',
    amount: 78000,
    tax: 12480,
    total: 90480,
    currency: 'KES',
    status: 'CANCELLED',
    issuedAt: '2025-04-22T10:00:00Z',
    dueDate: '2025-05-06T23:59:59Z',
    paidAt: null,
    paymentMethod: null,
    mpesaRef: null,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'DRAFT', label: 'Draft' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'OVERDUE', label: 'Overdue' },
  { key: 'PAID', label: 'Paid' },
  { key: 'CANCELLED', label: 'Cancelled' },
]

function getStatusStyle(status) {
  switch (status) {
    case 'PAID':
      return { background: 'rgb(220 252 231)', color: 'rgb(21 128 61)' }
    case 'PENDING':
      return { background: 'rgb(219 234 254)', color: 'rgb(30 58 138)' }
    case 'OVERDUE':
      return { background: 'rgb(254 226 226)', color: 'rgb(185 28 28)' }
    case 'DRAFT':
      return { background: 'rgb(243 244 246)', color: 'rgb(55 65 81)' }
    case 'CANCELLED':
      return { background: 'rgb(31 41 55 / 0.1)', color: 'rgb(55 65 81)' }
    default:
      return { background: 'rgb(243 244 246)', color: 'rgb(55 65 81)' }
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

// ─── Component ────────────────────────────────────────────────────────────────
export default function InvoiceList() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [reminderModal, setReminderModal] = useState(null) // invoice id
  const [phone, setPhone] = useState('+254')
  const [sendingReminder, setSendingReminder] = useState(false)
  const [reminderSent, setReminderSent] = useState(false)
  const [markingPaid, setMarkingPaid] = useState(null)

  const filtered = MOCK_INVOICES.filter(
    (inv) => statusFilter === 'ALL' || inv.status === statusFilter
  )

  const totalOutstanding = MOCK_INVOICES.filter((i) => ['PENDING', 'OVERDUE'].includes(i.status)).reduce(
    (s, i) => s + i.total,
    0
  )
  const paidMTD = MOCK_INVOICES.filter((i) => i.status === 'PAID').reduce((s, i) => s + i.total, 0)
  const overdue = MOCK_INVOICES.filter((i) => i.status === 'OVERDUE').reduce((s, i) => s + i.total, 0)

  function handleSendReminder() {
    setSendingReminder(true)
    setTimeout(() => {
      setSendingReminder(false)
      setReminderSent(true)
    }, 1500)
  }

  function closeReminderModal() {
    setReminderModal(null)
    setReminderSent(false)
    setSendingReminder(false)
    setPhone('+254')
  }

  function handleMarkPaid(invId) {
    setMarkingPaid(invId)
    setTimeout(() => setMarkingPaid(null), 1200)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>
            Invoices
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
            Manage billing and tax invoices
          </p>
        </div>
        <Button variant="default" className="flex items-center gap-2" onClick={() => navigate('/app/billing/invoices/new')}>
          <FileText className="h-4 w-4" />
          New Invoice
        </Button>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Total Outstanding',
            value: formatCurrency(totalOutstanding),
            icon: DollarSign,
            color: '#1D4ED8',
            bg: '#EFF6FF',
          },
          {
            label: 'Paid MTD',
            value: formatCurrency(paidMTD),
            icon: TrendingUp,
            color: '#15803D',
            bg: 'rgb(240 253 244)',
          },
          {
            label: 'Overdue',
            value: formatCurrency(overdue),
            icon: AlertCircle,
            color: '#B91C1C',
            bg: 'rgb(254 242 242)',
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-xl p-4 flex items-center gap-4"
            style={{ background: bg, border: '1px solid rgba(191,219,254,0.45)' }}
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}20` }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#6B7280' }}>
                {label}
              </p>
              <p className="text-lg font-bold mt-0.5" style={{ color }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Status Tabs */}
      <div
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.45)',
          borderRadius: '1rem',
        }}
        className="p-4"
      >
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
              <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                  statusFilter === tab.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {tab.key === 'ALL'
                  ? MOCK_INVOICES.length
                  : MOCK_INVOICES.filter((i) => i.status === tab.key).length}
              </span>
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
                  'Invoice #',
                  'Shipment',
                  'Customer',
                  'Issued',
                  'Due',
                  'Amount',
                  'Tax (16%)',
                  'Total',
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
                  <td colSpan={10} className="px-4 py-16 text-center">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium text-gray-500">No invoices in this category</p>
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-blue-50 transition-colors">
                    {/* Invoice # */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link
                        to={`/app/billing/invoices/${inv.id}`}
                        className="text-sm font-bold text-blue-700 hover:underline"
                      >
                        {inv.id}
                      </Link>
                      {inv.mpesaRef && (
                        <p className="text-xs text-gray-400 mt-0.5">Ref: {inv.mpesaRef}</p>
                      )}
                    </td>

                    {/* Shipment */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link
                        to={`/app/shipments/${inv.shipmentId}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {inv.shipmentId}
                      </Link>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium" style={{ color: '#374151' }}>
                        {inv.customer}
                      </p>
                    </td>

                    {/* Issued */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#374151' }}>
                      {formatDate(inv.issuedAt)}
                    </td>

                    {/* Due */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p
                        className="text-sm"
                        style={{ color: inv.status === 'OVERDUE' ? '#B91C1C' : '#374151', fontWeight: inv.status === 'OVERDUE' ? 600 : 400 }}
                      >
                        {formatDate(inv.dueDate)}
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#374151' }}>
                      {formatCurrency(inv.amount)}
                    </td>

                    {/* Tax */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#374151' }}>
                      {formatCurrency(inv.tax)}
                    </td>

                    {/* Total */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold" style={{ color: '#1D4ED8' }}>
                        {formatCurrency(inv.total, inv.currency)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={getStatusStyle(inv.status)}
                      >
                        {inv.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link to={`/app/billing/invoices/${inv.id}`}>
                          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border border-blue-200 text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </button>
                        </Link>
                        {['PENDING', 'OVERDUE'].includes(inv.status) && (
                          <button
                            onClick={() => setReminderModal(inv.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
                          >
                            <Send className="h-3.5 w-3.5" />
                            Remind
                          </button>
                        )}
                        {inv.status === 'PENDING' && (
                          <button
                            onClick={() => handleMarkPaid(inv.id)}
                            disabled={markingPaid === inv.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 transition-colors disabled:opacity-50"
                          >
                            {markingPaid === inv.id ? (
                              <div className="h-3.5 w-3.5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <CheckCircle className="h-3.5 w-3.5" />
                            )}
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Send Reminder Modal */}
      <Modal isOpen={!!reminderModal} onClose={closeReminderModal}>
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                Send Payment Reminder
              </h3>
            </div>
          </ModalHeader>

          {reminderSent ? (
            <div className="py-6 text-center">
              <CheckCircle className="h-14 w-14 mx-auto text-green-500 mb-3" />
              <p className="font-semibold" style={{ color: '#0F2A4A' }}>Reminder Sent</p>
              <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                An M-Pesa STK push reminder was sent to <strong>{phone}</strong>.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                {reminderModal && (() => {
                  const inv = MOCK_INVOICES.find((i) => i.id === reminderModal)
                  return inv ? (
                    <div className="p-3 rounded-lg" style={{ background: '#EFF6FF' }}>
                      <p className="text-sm font-medium" style={{ color: '#374151' }}>
                        {inv.id} — {inv.customer}
                      </p>
                      <p className="text-lg font-bold mt-1" style={{ color: '#1D4ED8' }}>
                        {formatCurrency(inv.total, inv.currency)}
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                        Due: {formatDate(inv.dueDate)}
                      </p>
                    </div>
                  ) : null
                })()}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
                    Customer Phone (M-Pesa)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
              </div>
              <ModalFooter>
                <Button variant="outline" onClick={closeReminderModal}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={handleSendReminder}
                  disabled={sendingReminder}
                >
                  {sendingReminder ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send Reminder
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
