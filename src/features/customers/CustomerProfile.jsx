import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MapPin, Building, TrendingUp, Package, CreditCard, Edit, FileText } from 'lucide-react'
import { Button } from '../../components/ui'

const CUSTOMERS = [
  { id: 'cust-001', name: 'Nairobi Traders Ltd', type: 'Corporate', country: 'Kenya', city: 'Nairobi', address: 'Westlands, Nairobi, Kenya', contact: 'Alice Njoroge', phone: '+254 720 100 200', email: 'alice@nairobitarders.co.ke', kraPin: 'P051234567K', totalShipments: 48, activeShipments: 3, totalRevenue: 4820000, creditLimit: 2000000, creditUsed: 850000, status: 'ACTIVE', since: '2022-03-15', accountManager: 'James Omondi', notes: 'Preferred carrier: Trans Africa Logistics. Requires advance notice of 48hrs for all pickups.' },
  { id: 'cust-004', name: 'Mombasa Port Industries', type: 'Corporate', country: 'Kenya', city: 'Mombasa', address: 'Kilindini, Mombasa, Kenya', contact: 'Omar Abdullah', phone: '+254 733 700 800', email: 'omar@mpi.co.ke', kraPin: 'P058642097M', totalShipments: 61, activeShipments: 4, totalRevenue: 9200000, creditLimit: 5000000, creditUsed: 2100000, status: 'ACTIVE', since: '2021-11-05', accountManager: 'Fatuma Mwangi', notes: 'Specialises in industrial machinery imports. Hazmat certified cargo only through Mombasa.' },
]

const RECENT_SHIPMENTS = [
  { id: 'LL-2025-040', route: 'Nairobi → Kigali', status: 'IN_TRANSIT', date: '2025-05-01', value: 252184 },
  { id: 'LL-2025-036', route: 'Mombasa → Nairobi', status: 'DELIVERED', date: '2025-04-28', value: 145600 },
  { id: 'LL-2025-033', route: 'Nairobi → Kampala', status: 'DELIVERED', date: '2025-04-20', value: 88400 },
  { id: 'LL-2025-031', route: 'Eldoret → Mombasa', status: 'DELIVERED', date: '2025-04-15', value: 320000 },
]

const RECENT_INVOICES = [
  { id: 'INV-2025-089', date: '2025-05-04', amount: 252184, status: 'UNPAID' },
  { id: 'INV-2025-084', date: '2025-04-28', amount: 145600, status: 'PAID' },
  { id: 'INV-2025-080', date: '2025-04-20', amount: 88400, status: 'PAID' },
]

function fmtCurrency(n) {
  return `KES ${Number(n).toLocaleString('en-KE')}`
}

function shipmentStatusStyle(s) {
  const map = {
    IN_TRANSIT: { bg: 'rgb(219 234 254)', color: 'rgb(30 58 138)' },
    DELIVERED: { bg: 'rgb(220 252 231)', color: 'rgb(21 128 61)' },
    CONFIRMED: { bg: 'rgb(219 234 254)', color: 'rgb(30 58 138)' },
    DRAFT: { bg: 'rgb(243 244 246)', color: 'rgb(55 65 81)' },
  }
  return map[s] || { bg: 'rgb(243 244 246)', color: 'rgb(55 65 81)' }
}

function SectionCard({ title, Icon, children }) {
  return (
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
      <div className="px-5 py-3 border-b border-blue-100 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-blue-600" />}
        <span className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default function CustomerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const customer = CUSTOMERS.find((c) => c.id === id) || CUSTOMERS[0]

  const creditPct = Math.round((customer.creditUsed / customer.creditLimit) * 100)
  const initials = customer.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/app/customers')}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>{customer.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgb(220 252 231)', color: 'rgb(21 128 61)' }}>
                  {customer.status}
                </span>
                <span className="text-xs text-gray-500">{customer.type} · Customer since {customer.since}</span>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2 text-sm">
          <Edit className="h-4 w-4" /> Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Shipments', value: customer.totalShipments, Icon: Package, color: '#1D4ED8' },
              { label: 'Active', value: customer.activeShipments, Icon: TrendingUp, color: '#059669' },
              { label: 'Total Revenue', value: fmtCurrency(customer.totalRevenue), Icon: CreditCard, color: '#7C3AED' },
              { label: 'Credit Used', value: `${creditPct}%`, Icon: FileText, color: creditPct > 80 ? '#DC2626' : '#D97706' },
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
                <Icon style={{ width: '1rem', height: '1rem', color }} className="mb-1.5" />
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-base font-bold mt-0.5" style={{ color: '#0F2A4A' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Recent Shipments */}
          <SectionCard title="Recent Shipments" Icon={Package}>
            <div className="space-y-2">
              {RECENT_SHIPMENTS.map((s) => {
                const ss = shipmentStatusStyle(s.status)
                return (
                  <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <Link to={`/app/shipments/${s.id}`} className="text-sm font-medium text-blue-700 hover:underline">{s.id}</Link>
                      <p className="text-xs text-gray-500 mt-0.5">{s.route} · {s.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium" style={{ color: '#374151' }}>{fmtCurrency(s.value)}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: ss.bg, color: ss.color }}>{s.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </SectionCard>

          {/* Recent Invoices */}
          <SectionCard title="Recent Invoices" Icon={FileText}>
            <div className="space-y-2">
              {RECENT_INVOICES.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <Link to={`/app/billing/invoices/${inv.id}`} className="text-sm font-medium text-blue-700 hover:underline">{inv.id}</Link>
                    <p className="text-xs text-gray-500 mt-0.5">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium" style={{ color: '#374151' }}>{fmtCurrency(inv.amount)}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={inv.status === 'PAID'
                        ? { background: 'rgb(220 252 231)', color: 'rgb(21 128 61)' }
                        : { background: 'rgb(254 243 199)', color: 'rgb(120 53 15)' }}
                    >
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Contact Info */}
          <SectionCard title="Contact Info" Icon={Building}>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{customer.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-700">{customer.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-700 break-all">{customer.email}</p>
              </div>
              <div className="pt-2 border-t border-blue-100">
                <p className="text-xs text-gray-400">KRA PIN</p>
                <p className="text-sm font-mono font-medium mt-0.5" style={{ color: '#374151' }}>{customer.kraPin}</p>
              </div>
            </div>
          </SectionCard>

          {/* Credit */}
          <SectionCard title="Credit Facility" Icon={CreditCard}>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Used</span>
                  <span className="font-semibold" style={{ color: creditPct > 80 ? '#DC2626' : '#374151' }}>
                    {creditPct}% ({fmtCurrency(customer.creditUsed)})
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${creditPct}%`, height: '100%', backgroundColor: creditPct > 80 ? '#DC2626' : '#1D4ED8', borderRadius: '9999px' }} />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Credit Limit</span>
                <span className="font-semibold" style={{ color: '#0F2A4A' }}>{fmtCurrency(customer.creditLimit)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available</span>
                <span className="font-semibold text-green-700">{fmtCurrency(customer.creditLimit - customer.creditUsed)}</span>
              </div>
            </div>
          </SectionCard>

          {/* Notes */}
          <SectionCard title="Account Notes" Icon={FileText}>
            <p className="text-sm text-gray-600 leading-relaxed">{customer.notes}</p>
            <p className="text-xs text-gray-400 mt-3">Account Manager: <span className="font-medium text-gray-600">{customer.accountManager}</span></p>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
