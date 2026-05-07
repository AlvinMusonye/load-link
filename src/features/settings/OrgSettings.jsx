import { useState } from 'react'
import { Building, Users, Bell, Shield, Globe, ChevronRight, Check, Save } from 'lucide-react'
import { Button } from '../../components/ui'

const TABS = [
  { id: 'org', label: 'Organisation', Icon: Building },
  { id: 'team', label: 'Team & Roles', Icon: Users },
  { id: 'notifications', label: 'Notifications', Icon: Bell },
  { id: 'security', label: 'Security', Icon: Shield },
  { id: 'regional', label: 'Regional', Icon: Globe },
]

const TEAM_MEMBERS = [
  { id: 'u1', name: 'James Omondi', email: 'james@loadlink.co.ke', role: 'Admin', status: 'Active', lastLogin: '2025-05-06' },
  { id: 'u2', name: 'Fatuma Mwangi', email: 'fatuma@loadlink.co.ke', role: 'Operations Manager', status: 'Active', lastLogin: '2025-05-06' },
  { id: 'u3', name: 'Ronald Ssemakula', email: 'ronald@loadlink.co.ke', role: 'Warehouse Manager', status: 'Active', lastLogin: '2025-05-05' },
  { id: 'u4', name: 'Alice Njoroge', email: 'alice@loadlink.co.ke', role: 'Customs Officer', status: 'Active', lastLogin: '2025-05-04' },
  { id: 'u5', name: 'Peter Kamau', email: 'peter@loadlink.co.ke', role: 'Finance Officer', status: 'Active', lastLogin: '2025-05-03' },
  { id: 'u6', name: 'Grace Achieng', email: 'grace@loadlink.co.ke', role: 'Driver Coordinator', status: 'Inactive', lastLogin: '2025-04-20' },
]

const ROLES = ['Admin', 'Operations Manager', 'Warehouse Manager', 'Customs Officer', 'Finance Officer', 'Driver Coordinator', 'View Only']

const NOTIFICATION_SETTINGS = [
  { id: 'n1', label: 'Shipment status changes', description: 'Get notified when a shipment status updates', email: true, sms: false, push: true },
  { id: 'n2', label: 'Customs clearance alerts', description: 'Notifications for customs entry updates', email: true, sms: true, push: true },
  { id: 'n3', label: 'Payment received', description: 'When a customer payment is confirmed', email: true, sms: false, push: false },
  { id: 'n4', label: 'Invoice due reminders', description: 'Reminders for overdue invoices', email: true, sms: true, push: false },
  { id: 'n5', label: 'Vehicle maintenance alerts', description: 'Service reminders and maintenance due', email: false, sms: true, push: true },
  { id: 'n6', label: 'Driver exceptions', description: 'Delays, incidents, or deviations', email: true, sms: true, push: true },
]

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      className="w-10 h-5 rounded-full relative cursor-pointer transition-colors"
      style={{ background: value ? '#1D4ED8' : '#D1D5DB' }}
    >
      <div
        className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
        style={{ transform: value ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </div>
  )
}

function OrgTab() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: 'Load Link Logistics Ltd',
    kraPin: 'P050000000L',
    email: 'info@loadlink.co.ke',
    phone: '+254 700 000 000',
    address: 'Upper Hill, Nairobi, Kenya',
    website: 'www.loadlink.co.ke',
    currency: 'KES',
    timezone: 'Africa/Nairobi',
  })

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { key: 'name', label: 'Organisation Name', type: 'text' },
          { key: 'kraPin', label: 'KRA PIN', type: 'text' },
          { key: 'email', label: 'Contact Email', type: 'email' },
          { key: 'phone', label: 'Phone Number', type: 'tel' },
          { key: 'website', label: 'Website', type: 'url' },
          { key: 'currency', label: 'Default Currency', type: 'text' },
        ].map(({ key, label, type }) => (
          <div key={key}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="form-label">Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>
      <Button variant="default" onClick={handleSave} className="flex items-center gap-2">
        {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saved ? 'Saved' : 'Save Changes'}
      </Button>
    </div>
  )
}

function TeamTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{TEAM_MEMBERS.length} team members</p>
        <Button variant="default" className="text-sm">Invite Member</Button>
      </div>
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
        <table className="min-w-full divide-y divide-blue-100">
          <thead style={{ backgroundColor: '#EFF6FF' }}>
            <tr>
              {['Name', 'Email', 'Role', 'Status', 'Last Login', ''].map((col) => (
                <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {TEAM_MEMBERS.map((member) => {
              const initials = member.name.split(' ').map((n) => n[0]).join('').toUpperCase()
              return (
                <tr key={member.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>{initials}</div>
                      <span className="text-sm font-medium" style={{ color: '#374151' }}>{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#6B7280' }}>{member.email}</td>
                  <td className="px-4 py-3">
                    <select className="text-xs border border-blue-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400" defaultValue={member.role}>
                      {ROLES.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={member.status === 'Active' ? { background: 'rgb(220 252 231)', color: 'rgb(21 128 61)' } : { background: 'rgb(243 244 246)', color: 'rgb(107 114 128)' }}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#6B7280' }}>{member.lastLogin}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-red-500 hover:text-red-700 transition-colors">Remove</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function NotificationsTab() {
  const [settings, setSettings] = useState(NOTIFICATION_SETTINGS)
  function toggle(id, channel) {
    setSettings((prev) => prev.map((n) => n.id === id ? { ...n, [channel]: !n[channel] } : n))
  }
  return (
    <div className="space-y-4 max-w-3xl">
      <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wider px-5">
        <div className="col-span-2">Notification</div>
        <div className="text-center">Email</div>
        <div className="text-center">SMS</div>
      </div>
      {settings.map((n) => (
        <div
          key={n.id}
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(191,219,254,0.45)',
            borderRadius: '0.75rem',
          }}
          className="p-5 grid grid-cols-4 gap-4 items-center"
        >
          <div className="col-span-2">
            <p className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>{n.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{n.description}</p>
          </div>
          <div className="flex justify-center">
            <Toggle value={n.email} onChange={(v) => toggle(n.id, 'email')} />
          </div>
          <div className="flex justify-center">
            <Toggle value={n.sms} onChange={(v) => toggle(n.id, 'sms')} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-5 max-w-2xl">
      {[
        { title: 'Change Password', description: 'Update your account password', action: 'Update Password' },
        { title: 'Two-Factor Authentication', description: '2FA is currently disabled. Enable it for additional security.', action: 'Enable 2FA' },
        { title: 'Active Sessions', description: '1 active session on MacBook Pro, Nairobi', action: 'Revoke All' },
        { title: 'API Keys', description: '2 active API keys for integrations', action: 'Manage Keys' },
      ].map(({ title, description, action }) => (
        <div
          key={title}
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(191,219,254,0.45)',
            borderRadius: '0.75rem',
          }}
          className="p-5 flex items-center justify-between gap-4"
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>{title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          </div>
          <button className="text-sm font-medium text-blue-700 hover:text-blue-900 whitespace-nowrap transition-colors">{action}</button>
        </div>
      ))}
    </div>
  )
}

function RegionalTab() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ timezone: 'Africa/Nairobi', dateFormat: 'DD/MM/YYYY', currency: 'KES', language: 'English' })
  return (
    <div className="space-y-5 max-w-md">
      {[
        { key: 'timezone', label: 'Timezone', options: ['Africa/Nairobi', 'Africa/Kampala', 'Africa/Dar_es_Salaam', 'Africa/Kigali'] },
        { key: 'dateFormat', label: 'Date Format', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] },
        { key: 'currency', label: 'Default Currency', options: ['KES', 'UGX', 'TZS', 'RWF', 'USD'] },
        { key: 'language', label: 'Language', options: ['English', 'Swahili'] },
      ].map(({ key, label, options }) => (
        <div key={key}>
          <label className="form-label">{label}</label>
          <select
            value={form[key]}
            onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}
      <Button variant="default" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }} className="flex items-center gap-2">
        {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saved ? 'Saved' : 'Save Regional Settings'}
      </Button>
    </div>
  )
}

const TAB_CONTENT = { org: OrgTab, team: TeamTab, notifications: NotificationsTab, security: SecurityTab, regional: RegionalTab }

export default function OrgSettings() {
  const [activeTab, setActiveTab] = useState('org')
  const TabContent = TAB_CONTENT[activeTab]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>Settings</h1>
        <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>Manage your organisation, team, and platform preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <nav className="flex flex-col gap-1 w-48 flex-shrink-0">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
              style={activeTab === id
                ? { background: '#EFF6FF', color: '#1D4ED8' }
                : { color: '#374151' }}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(191,219,254,0.45)',
            borderRadius: '1rem',
          }}
          className="flex-1 p-6 min-w-0"
        >
          <TabContent />
        </div>
      </div>
    </div>
  )
}
