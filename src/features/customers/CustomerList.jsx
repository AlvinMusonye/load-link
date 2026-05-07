import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Plus, Building, MapPin, Phone, Mail, ChevronRight, Users } from 'lucide-react'
import { Button } from '../../components/ui'

const CUSTOMERS = [
  { id: 'cust-001', name: 'Nairobi Traders Ltd', type: 'Corporate', country: 'Kenya', city: 'Nairobi', contact: 'Alice Njoroge', phone: '+254 720 100 200', email: 'alice@nairobitarders.co.ke', totalShipments: 48, activeShipments: 3, totalRevenue: 4820000, creditLimit: 2000000, status: 'ACTIVE', since: '2022-03-15' },
  { id: 'cust-002', name: 'Kampala Fresh Foods', type: 'Corporate', country: 'Uganda', city: 'Kampala', contact: 'Ronald Ssemakula', phone: '+256 700 300 400', email: 'ronald@kampalafoods.ug', totalShipments: 32, activeShipments: 2, totalRevenue: 2140000, creditLimit: 1000000, status: 'ACTIVE', since: '2023-01-10' },
  { id: 'cust-003', name: 'Kigali Tech Imports', type: 'Corporate', country: 'Rwanda', city: 'Kigali', contact: 'Marie Uwase', phone: '+250 788 500 600', email: 'marie@kigalitech.rw', totalShipments: 27, activeShipments: 1, totalRevenue: 3680000, creditLimit: 1500000, status: 'ACTIVE', since: '2023-06-20' },
  { id: 'cust-004', name: 'Mombasa Port Industries', type: 'Corporate', country: 'Kenya', city: 'Mombasa', contact: 'Omar Abdullah', phone: '+254 733 700 800', email: 'omar@mpi.co.ke', totalShipments: 61, activeShipments: 4, totalRevenue: 9200000, creditLimit: 5000000, status: 'ACTIVE', since: '2021-11-05' },
  { id: 'cust-005', name: 'Dar es Salaam Distributors', type: 'SME', country: 'Tanzania', city: 'Dar es Salaam', contact: 'Amina Rashid', phone: '+255 762 900 100', email: 'amina@dadist.tz', totalShipments: 18, activeShipments: 1, totalRevenue: 890000, creditLimit: 500000, status: 'ACTIVE', since: '2024-02-01' },
  { id: 'cust-006', name: 'Nakuru Agri Export', type: 'SME', country: 'Kenya', city: 'Nakuru', contact: 'Peter Kamau', phone: '+254 714 200 300', email: 'peter@nakuruagri.co.ke', totalShipments: 22, activeShipments: 0, totalRevenue: 1120000, creditLimit: 500000, status: 'ACTIVE', since: '2023-09-14' },
  { id: 'cust-007', name: 'Kisumu Imports Ltd', type: 'SME', country: 'Kenya', city: 'Kisumu', contact: 'Grace Achieng', phone: '+254 701 400 500', email: 'grace@kisumimports.co.ke', totalShipments: 14, activeShipments: 0, totalRevenue: 620000, creditLimit: 300000, status: 'INACTIVE', since: '2023-04-22' },
  { id: 'cust-008', name: 'Eldoret Grain Mills', type: 'Corporate', country: 'Kenya', city: 'Eldoret', contact: 'Joseph Rotich', phone: '+254 725 600 700', email: 'joseph@eldoretgrain.co.ke', totalShipments: 35, activeShipments: 2, totalRevenue: 2890000, creditLimit: 1200000, status: 'ACTIVE', since: '2022-07-30' },
]

const TYPE_FILTERS = ['ALL', 'Corporate', 'SME']
const COUNTRY_FILTERS = ['ALL', 'Kenya', 'Uganda', 'Tanzania', 'Rwanda']

function fmtRevenue(n) {
  if (n >= 1000000) return `KES ${(n / 1000000).toFixed(1)}M`
  return `KES ${(n / 1000).toFixed(0)}K`
}

export default function CustomerList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [countryFilter, setCountryFilter] = useState('ALL')

  const filtered = CUSTOMERS.filter((c) => {
    const q = search.toLowerCase()
    const matchSearch = !search || c.name.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
    const matchType = typeFilter === 'ALL' || c.type === typeFilter
    const matchCountry = countryFilter === 'ALL' || c.country === countryFilter
    return matchSearch && matchType && matchCountry
  })

  const activeCount = CUSTOMERS.filter((c) => c.status === 'ACTIVE').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>Customers</h1>
          <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>{activeCount} active customers across East Africa</p>
        </div>
        <Button variant="default" className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Customer
        </Button>
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
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {TYPE_FILTERS.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={typeFilter === t
                  ? { background: '#1D4ED8', color: 'white' }
                  : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
              >
                {t === 'ALL' ? 'All Types' : t}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {COUNTRY_FILTERS.map((c) => (
              <button
                key={c}
                onClick={() => setCountryFilter(c)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={countryFilter === c
                  ? { background: '#EDE9FE', color: '#7C3AED', border: '1px solid #C4B5FD' }
                  : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
              >
                {c === 'ALL' ? 'All Countries' : c}
              </button>
            ))}
          </div>
          <span className="text-xs ml-auto" style={{ color: '#6B7280' }}>{filtered.length} results</span>
        </div>
      </div>

      {/* Customer Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Users className="h-10 w-10 mx-auto mb-3 text-gray-300" />
          <p className="text-sm font-medium text-gray-500">No customers match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((customer) => {
            const isActive = customer.status === 'ACTIVE'
            const initials = customer.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
            return (
              <Link
                key={customer.id}
                to={`/app/customers/${customer.id}`}
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(191,219,254,0.45)',
                  borderRadius: '1rem',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '1.25rem',
                  transition: 'box-shadow 0.2s',
                }}
                className="hover:shadow-md"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: '#DBEAFE', color: '#1D4ED8' }}
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{customer.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{customer.city}, {customer.country}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                    style={isActive
                      ? { background: 'rgb(220 252 231)', color: 'rgb(21 128 61)' }
                      : { background: 'rgb(243 244 246)', color: 'rgb(107 114 128)' }}
                  >
                    {customer.status}
                  </span>
                </div>

                {/* Contact */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Building className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{customer.contact} · {customer.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600 truncate">{customer.email}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-100">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Shipments</p>
                    <p className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{customer.totalShipments}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Active</p>
                    <p className="text-sm font-bold" style={{ color: '#1D4ED8' }}>{customer.activeShipments}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Revenue</p>
                    <p className="text-sm font-bold" style={{ color: '#15803D' }}>{fmtRevenue(customer.totalRevenue)}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
