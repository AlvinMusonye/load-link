import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Phone,
  ExternalLink,
  FileText,
  Package,
  Building,
  MessageSquare,
} from 'lucide-react'
import { Button, Card, CardHeader, CardBody, Modal, ModalContent, ModalHeader, ModalFooter } from '../../components/ui'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CUSTOMS = {
  'CE-2025-089': {
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
    dutyRate: 12,
    dutyAmount: 144000,
    vatRate: 16,
    vatAmount: 57600,
    totalPayable: 201600,
    status: 'UNDER_REVIEW',
    submittedAt: '2025-05-03T10:00:00Z',
    kraRef: 'KRA-IMP-2025-67821',
    port: 'Nairobi ICD',
    broker: 'Swift Clearance Ltd',
    shipment: {
      id: 'LL-2025-040',
      customer: 'Kigali Tech Imports',
      route: 'Nairobi → Kigali',
      status: 'AT_CUSTOMS',
    },
    container: {
      number: 'TCKU3105814',
      vessel: 'MV Uhuru',
      berth: 'B-14',
      arrivalDate: '2025-05-02T06:00:00Z',
    },
    documents: [
      { name: 'Bill of Lading', required: true, uploaded: true },
      { name: 'Commercial Invoice', required: true, uploaded: true },
      { name: 'Packing List', required: true, uploaded: false },
      { name: 'Certificate of Origin', required: true, uploaded: false },
      { name: 'Import Declaration Form', required: true, uploaded: true },
    ],
    messages: [
      {
        id: 1,
        from: 'KRA Officer - J. Mwakio',
        date: '2025-05-04T14:30:00Z',
        text: 'Your declaration is under review. Please provide the packing list and certificate of origin to expedite clearance.',
      },
      {
        id: 2,
        from: 'KRA System',
        date: '2025-05-03T10:05:00Z',
        text: 'Declaration CE-2025-089 received and assigned reference KRA-IMP-2025-67821. Processing will commence within 2 business hours.',
      },
      {
        id: 3,
        from: 'KRA System',
        date: '2025-05-03T12:00:00Z',
        text: 'Goods selected for physical examination. Please ensure the consignee is available at Nairobi ICD on 2025-05-05 at 09:00 AM.',
      },
    ],
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function formatCurrency(amount, currency = 'KES') {
  return `${currency} ${Number(amount).toLocaleString('en-KE')}`
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// KRA eTIMS step indicator
const CLEARANCE_STEPS = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'assessed', label: 'Assessed' },
  { key: 'cleared', label: 'Cleared' },
]

function getCurrentStepIndex(status) {
  switch (status) {
    case 'UNDER_REVIEW':
      return 1
    case 'PENDING_PAYMENT':
      return 2
    case 'CLEARED':
      return 3
    default:
      return 0
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CustomsEntryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [phone, setPhone] = useState('+254')
  const [payLoading, setPayLoading] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)

  const entry = MOCK_CUSTOMS[id] || MOCK_CUSTOMS['CE-2025-089']
  const currentStep = getCurrentStepIndex(entry.status)

  function handlePayNow() {
    setPayLoading(true)
    setTimeout(() => {
      setPayLoading(false)
      setPaySuccess(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/customs')}
            className="p-2 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>
                {entry.id}
              </h1>
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={getStatusStyle(entry.status)}
              >
                {getStatusLabel(entry.status)}
              </span>
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={
                  entry.declarationType === 'IMPORT'
                    ? { background: 'rgb(224 231 255)', color: 'rgb(67 56 202)' }
                    : { background: 'rgb(209 250 229)', color: 'rgb(6 95 70)' }
                }
              >
                {entry.declarationType}
              </span>
            </div>
            <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
              KRA Ref: {entry.kraRef} · Submitted {formatDate(entry.submittedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — 3/5 */}
        <div className="lg:col-span-3 space-y-6">

          {/* Declaration Details */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                Declaration Details
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Declaration Type', value: entry.declarationType },
                  { label: 'KRA Reference', value: entry.kraRef },
                  { label: 'HS Code', value: entry.hsCode },
                  { label: 'Port / Station', value: entry.port },
                  { label: 'Date Submitted', value: formatDate(entry.submittedAt) },
                  { label: 'Clearing Broker', value: entry.broker },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#6B7280' }}>
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium" style={{ color: '#374151' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Goods Details */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                Goods Details
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Item Description', value: entry.itemDescription },
                  { label: 'Quantity', value: `${entry.quantity.toLocaleString()} units` },
                  { label: 'Gross Weight', value: `${entry.weight.toLocaleString()} kg` },
                  { label: 'Customs Value', value: formatCurrency(entry.customsValue, entry.currency) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#6B7280' }}>
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium" style={{ color: '#374151' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Duty Calculation */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                Duty Calculation
              </h2>
            </CardHeader>
            <CardBody className="p-0">
              <table className="min-w-full">
                <tbody className="divide-y divide-blue-50">
                  {[
                    { label: 'Customs Value (CIF)', value: formatCurrency(entry.customsValue) },
                    { label: `Import Duty (${entry.dutyRate}%)`, value: formatCurrency(entry.dutyAmount) },
                    { label: `VAT (${entry.vatRate}%)`, value: formatCurrency(entry.vatAmount) },
                  ].map(({ label, value }) => (
                    <tr key={label}>
                      <td className="px-6 py-3 text-sm" style={{ color: '#374151' }}>
                        {label}
                      </td>
                      <td className="px-6 py-3 text-sm font-medium text-right" style={{ color: '#374151' }}>
                        {value}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: '#EFF6FF' }}>
                    <td className="px-6 py-4 text-sm font-bold" style={{ color: '#0F2A4A' }}>
                      Total Payable
                    </td>
                    <td className="px-6 py-4 text-base font-bold text-right" style={{ color: '#1D4ED8' }}>
                      {formatCurrency(entry.totalPayable, entry.currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
              {entry.totalPayable > 0 && (
                <div className="px-6 py-4 border-t border-blue-100">
                  <Button
                    variant="default"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setPayModalOpen(true)}
                  >
                    <Phone className="h-4 w-4" />
                    Pay Now via M-Pesa
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>

          {/* KRA eTIMS Status */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                KRA eTIMS Clearance Status
              </h2>
            </CardHeader>
            <CardBody>
              <div className="relative">
                {/* Step track */}
                <div className="flex items-center justify-between relative">
                  <div
                    className="absolute top-4 left-0 right-0 h-1 rounded-full"
                    style={{ background: 'rgb(219 234 254)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        background: 'rgb(29 78 216)',
                        width: `${(currentStep / (CLEARANCE_STEPS.length - 1)) * 100}%`,
                      }}
                    />
                  </div>

                  {CLEARANCE_STEPS.map((step, index) => {
                    const isDone = index < currentStep
                    const isActive = index === currentStep
                    return (
                      <div key={step.key} className="relative flex flex-col items-center z-10">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                          style={{
                            background: isDone
                              ? 'rgb(21 128 61)'
                              : isActive
                              ? 'rgb(29 78 216)'
                              : 'white',
                            borderColor: isDone
                              ? 'rgb(21 128 61)'
                              : isActive
                              ? 'rgb(29 78 216)'
                              : 'rgb(209 213 219)',
                            ...(isActive && {
                              boxShadow: '0 0 0 4px rgba(29,78,216,0.2)',
                              animation: 'pulse 2s infinite',
                            }),
                          }}
                        >
                          {isDone ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : isActive ? (
                            <Clock className="h-4 w-4 text-white" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-gray-300" />
                          )}
                        </div>
                        <p
                          className="mt-2 text-xs font-medium text-center w-20"
                          style={{ color: isActive ? '#1D4ED8' : isDone ? '#15803D' : '#6B7280' }}
                        >
                          {step.label}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right — 2/5 */}
        <div className="lg:col-span-2 space-y-6">

          {/* Linked Shipment */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                Linked Shipment
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: '#6B7280' }}>Shipment ID</p>
                  <Link
                    to={`/app/shipments/${entry.shipment.id}`}
                    className="text-sm font-semibold text-blue-700 hover:underline flex items-center gap-1"
                  >
                    {entry.shipment.id}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: '#6B7280' }}>Customer</p>
                  <p className="text-sm font-medium" style={{ color: '#374151' }}>{entry.shipment.customer}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: '#6B7280' }}>Route</p>
                  <p className="text-sm font-medium" style={{ color: '#374151' }}>{entry.shipment.route}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: '#6B7280' }}>Status</p>
                  <span className="status-badge status-at-customs text-xs">At Customs</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Documents Required */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                Required Documents
              </h2>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <Upload className="h-3.5 w-3.5" />
                Upload
              </Button>
            </CardHeader>
            <CardBody>
              <ul className="space-y-3">
                {entry.documents.map((doc) => (
                  <li key={doc.name} className="flex items-center gap-3">
                    <div
                      className="h-5 w-5 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: doc.uploaded ? 'rgb(220 252 231)' : 'rgb(254 226 226)',
                        border: `1px solid ${doc.uploaded ? 'rgb(134 239 172)' : 'rgb(252 165 165)'}`,
                      }}
                    >
                      {doc.uploaded ? (
                        <CheckCircle className="h-3 w-3" style={{ color: 'rgb(21 128 61)' }} />
                      ) : (
                        <AlertCircle className="h-3 w-3" style={{ color: 'rgb(185 28 28)' }} />
                      )}
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: doc.uploaded ? '#374151' : '#B91C1C' }}
                    >
                      {doc.name}
                    </span>
                    {!doc.uploaded && (
                      <span className="ml-auto text-xs font-medium text-red-600">Missing</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs" style={{ color: '#6B7280' }}>
                {entry.documents.filter((d) => d.uploaded).length} of {entry.documents.length} documents uploaded
              </p>
            </CardBody>
          </Card>

          {/* KPA Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-600" />
                <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                  KPA Port Status
                </h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {[
                  { label: 'Container No.', value: entry.container.number },
                  { label: 'Vessel', value: entry.container.vessel },
                  { label: 'Berth', value: entry.container.berth },
                  { label: 'Arrival Date', value: formatDate(entry.container.arrivalDate) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <p className="text-sm" style={{ color: '#6B7280' }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: '#374151' }}>{value}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Communication Log */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                  KRA Communications
                </h2>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-4">
                {entry.messages.map((msg) => (
                  <li key={msg.id} className="relative pl-4 border-l-2 border-blue-200">
                    <p className="text-xs font-semibold" style={{ color: '#1D4ED8' }}>
                      {msg.from}
                    </p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>
                      {formatDate(msg.date)}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: '#374151' }}>
                      {msg.text}
                    </p>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* M-Pesa Pay Modal */}
      <Modal isOpen={payModalOpen} onClose={() => { setPayModalOpen(false); setPaySuccess(false); setPayLoading(false) }}>
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-600" />
              <h3 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                Pay via M-Pesa STK Push
              </h3>
            </div>
          </ModalHeader>

          {paySuccess ? (
            <div className="py-6 text-center">
              <CheckCircle className="h-14 w-14 mx-auto text-green-500 mb-3" />
              <p className="font-semibold text-lg" style={{ color: '#0F2A4A' }}>Payment Initiated</p>
              <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                An M-Pesa STK push has been sent to <strong>{phone}</strong>.
                <br />
                Please enter your M-Pesa PIN to complete the payment.
              </p>
              <p className="mt-3 text-sm font-medium text-green-700">
                Amount: {formatCurrency(entry.totalPayable, entry.currency)}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: '#374151' }}>
                    Amount to Pay
                  </p>
                  <p className="text-2xl font-bold" style={{ color: '#1D4ED8' }}>
                    {formatCurrency(entry.totalPayable, entry.currency)}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                    KRA Reference: {entry.kraRef}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                  <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                    You will receive a push notification on this number to confirm payment.
                  </p>
                </div>
              </div>
              <ModalFooter>
                <Button variant="outline" onClick={() => setPayModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  onClick={handlePayNow}
                  disabled={payLoading}
                >
                  {payLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Phone className="h-4 w-4" />
                      Send STK Push
                    </>
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
