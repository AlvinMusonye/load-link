import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Download, Send, CheckCircle, Clock, AlertCircle, FileText, Building } from 'lucide-react'
import { Button } from '../../components/ui'

const INVOICES = [
  {
    id: 'INV-2025-089',
    shipmentId: 'LL-2025-040',
    customer: 'Kigali Tech Imports',
    customerAddress: 'Gaculiro, Kigali, Rwanda',
    customerPin: 'RW-0012345',
    issueDate: '2025-05-04',
    dueDate: '2025-06-03',
    currency: 'KES',
    status: 'UNPAID',
    lineItems: [
      { description: 'Air Freight — Nairobi to Kigali', qty: 1, unit: 'shipment', rate: 180000, amount: 180000 },
      { description: 'Customs Clearance Fee', qty: 1, unit: 'service', rate: 15000, amount: 15000 },
      { description: 'Handling & Documentation', qty: 1, unit: 'service', rate: 8000, amount: 8000 },
      { description: 'Insurance (1.2% of cargo value)', qty: 1, unit: 'service', rate: 14400, amount: 14400 },
    ],
    subtotal: 217400,
    tax: 34784,
    total: 252184,
    notes: 'Payment due within 30 days. M-Pesa Paybill: 123456, Account: INV-2025-089',
    paymentTerms: 'Net 30',
  },
]

const FALLBACK = INVOICES[0]

function statusMeta(s) {
  if (s === 'PAID') return { bg: 'rgb(220 252 231)', color: 'rgb(21 128 61)', label: 'Paid', Icon: CheckCircle }
  if (s === 'UNPAID') return { bg: 'rgb(254 243 199)', color: 'rgb(120 53 15)', label: 'Unpaid', Icon: Clock }
  if (s === 'OVERDUE') return { bg: 'rgb(254 226 226)', color: 'rgb(185 28 28)', label: 'Overdue', Icon: AlertCircle }
  return { bg: 'rgb(243 244 246)', color: 'rgb(55 65 81)', label: s, Icon: FileText }
}

function fmtCurrency(n, currency = 'KES') {
  return `${currency} ${Number(n).toLocaleString('en-KE')}`
}

export default function InvoiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const invoice = INVOICES.find((i) => i.id === id) || FALLBACK
  const meta = statusMeta(invoice.status)
  const StatusIcon = meta.Icon

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/app/billing/invoices')}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>{invoice.id}</h1>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: meta.bg, color: meta.color }}>
                <StatusIcon className="h-3 w-3" />
                {meta.label}
              </span>
            </div>
            <p className="text-sm mt-0.5" style={{ color: '#6B7280' }}>Shipment {invoice.shipmentId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          {invoice.status !== 'PAID' && (
            <Button variant="default" className="flex items-center gap-2 text-sm">
              <Send className="h-4 w-4" /> Send Reminder
            </Button>
          )}
        </div>
      </div>

      {/* Invoice Card */}
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
        {/* Invoice Top — Branding + Customer */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-blue-100">
          {/* From */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
                <Building className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#0F2A4A' }}>Load Link Logistics Ltd</p>
                <p className="text-xs text-gray-400">East Africa Operations</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Upper Hill, Nairobi, Kenya<br />
              KRA PIN: P050000000L<br />
              Email: billing@loadlink.co.ke<br />
              Tel: +254 700 000 000
            </p>
          </div>

          {/* To */}
          <div className="md:text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Bill To</p>
            <p className="font-bold text-sm" style={{ color: '#0F2A4A' }}>{invoice.customer}</p>
            <p className="text-xs text-gray-500 leading-relaxed mt-1">
              {invoice.customerAddress}<br />
              PIN: {invoice.customerPin}
            </p>
          </div>
        </div>

        {/* Invoice Meta */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-blue-100" style={{ background: '#EFF6FF' }}>
          {[
            { label: 'Invoice Number', value: invoice.id },
            { label: 'Issue Date', value: invoice.issueDate },
            { label: 'Due Date', value: invoice.dueDate },
            { label: 'Payment Terms', value: invoice.paymentTerms },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Line Items */}
        <div className="p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-100">
                <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Description</th>
                <th className="text-center py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Qty</th>
                <th className="text-center py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Unit</th>
                <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Rate</th>
                <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((item, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3 text-gray-700">{item.description}</td>
                  <td className="py-3 text-center text-gray-600">{item.qty}</td>
                  <td className="py-3 text-center text-gray-500 text-xs">{item.unit}</td>
                  <td className="py-3 text-right text-gray-600">{fmtCurrency(item.rate, invoice.currency)}</td>
                  <td className="py-3 text-right font-medium" style={{ color: '#374151' }}>{fmtCurrency(item.amount, invoice.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-6 ml-auto max-w-xs space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{fmtCurrency(invoice.subtotal, invoice.currency)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT (16%)</span>
              <span className="font-medium">{fmtCurrency(invoice.tax, invoice.currency)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-blue-200">
              <span style={{ color: '#0F2A4A' }}>Total Due</span>
              <span style={{ color: '#1D4ED8' }}>{fmtCurrency(invoice.total, invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="px-6 pb-6">
            <div className="p-4 rounded-lg" style={{ background: '#EFF6FF' }}>
              <p className="text-xs font-semibold text-blue-700 mb-1">Payment Instructions</p>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* M-Pesa pay action for unpaid */}
      {invoice.status !== 'PAID' && (
        <div
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(191,219,254,0.45)',
            borderRadius: '1rem',
          }}
          className="p-5 flex items-center justify-between gap-4 flex-wrap"
        >
          <div>
            <p className="font-semibold text-sm" style={{ color: '#0F2A4A' }}>Record Manual Payment</p>
            <p className="text-xs text-gray-500 mt-0.5">M-Pesa, bank transfer, or cash payment received</p>
          </div>
          <Button variant="default" className="text-sm">Mark as Paid</Button>
        </div>
      )}
    </div>
  )
}
