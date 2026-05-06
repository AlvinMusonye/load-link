import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Truck,
  BarChart3,
  Package,
  Users,
  FileText,
  DollarSign,
  Building2,
  TrendingUp,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  Boxes,
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

const PAGE_TITLES = {
  '/app': 'Dashboard',
  '/app/shipments': 'Shipments',
  '/app/shipments/new': 'New Shipment',
  '/app/fleet': 'Fleet Map',
  '/app/fleet/vehicles': 'Vehicles',
  '/app/fleet/drivers': 'Drivers',
  '/app/warehouse': 'Warehouse',
  '/app/customs': 'Customs Entries',
  '/app/billing/invoices': 'Invoices',
  '/app/billing/payments': 'Payment History',
  '/app/customers': 'Customers',
  '/app/vendors': 'Vendors & Carriers',
  '/app/reports': 'Reports & Analytics',
  '/app/settings': 'Settings',
}

function getPageTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/app/shipments/')) return 'Shipment Detail'
  if (pathname.startsWith('/app/fleet/vehicles/')) return 'Vehicle Detail'
  if (pathname.startsWith('/app/fleet/drivers/')) return 'Driver Profile'
  if (pathname.startsWith('/app/warehouse/')) return 'Warehouse'
  if (pathname.startsWith('/app/customs/')) return 'Customs Entry Detail'
  if (pathname.startsWith('/app/billing/invoices/')) return 'Invoice Detail'
  if (pathname.startsWith('/app/customers/')) return 'Customer Profile'
  return 'LoadLink'
}

function NavItem({ to, icon: Icon, label, active }) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.5rem 0.875rem',
        borderRadius: '0.375rem',
        fontSize: '0.8125rem',
        fontWeight: active ? 600 : 400,
        color: active ? '#1D4ED8' : '#374151',
        backgroundColor: active ? '#EFF6FF' : 'transparent',
        borderRight: active ? '2px solid #1D4ED8' : '2px solid transparent',
        textDecoration: 'none',
        transition: 'background-color 0.15s, color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = '#F9FAFB'
          e.currentTarget.style.color = '#111827'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.color = '#374151'
        }
      }}
    >
      <Icon style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
      {label}
    </Link>
  )
}

function SubNavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        paddingLeft: '2.625rem',
        paddingRight: '0.875rem',
        paddingTop: '0.375rem',
        paddingBottom: '0.375rem',
        fontSize: '0.8rem',
        fontWeight: active ? 600 : 400,
        color: active ? '#1D4ED8' : '#6B7280',
        backgroundColor: active ? '#EFF6FF' : 'transparent',
        borderRight: active ? '2px solid #1D4ED8' : '2px solid transparent',
        textDecoration: 'none',
        borderRadius: '0.375rem',
        transition: 'background-color 0.15s, color 0.15s',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = '#F9FAFB'
          e.currentTarget.style.color = '#374151'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.color = '#6B7280'
        }
      }}
    >
      {label}
    </Link>
  )
}

function NavSection({ label, children }) {
  return (
    <div style={{ marginBottom: '0.25rem' }}>
      <p
        style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: '#9CA3AF',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          padding: '0.625rem 0.875rem 0.25rem',
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>{children}</div>
    </div>
  )
}

function CollapsibleGroup({ icon: Icon, label, active, open, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '0.5rem 0.875rem',
          borderRadius: '0.375rem',
          fontSize: '0.8125rem',
          fontWeight: active ? 600 : 400,
          color: active ? '#1D4ED8' : '#374151',
          backgroundColor: active ? '#EFF6FF' : 'transparent',
          border: 'none',
          width: '100%',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
          transition: 'background-color 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = '#F9FAFB'
            e.currentTarget.style.color = '#111827'
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = active ? '#EFF6FF' : 'transparent'
            e.currentTarget.style.color = active ? '#1D4ED8' : '#374151'
          }
        }}
      >
        <Icon style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{label}</span>
        {open ? (
          <ChevronDown style={{ width: '0.875rem', height: '0.875rem', color: '#9CA3AF' }} />
        ) : (
          <ChevronRight style={{ width: '0.875rem', height: '0.875rem', color: '#9CA3AF' }} />
        )}
      </button>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', marginTop: '0.125rem' }}>
          {children}
        </div>
      )}
    </div>
  )
}

function AppShell({ children }) {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const [fleetOpen, setFleetOpen] = useState(
    location.pathname.startsWith('/app/fleet')
  )
  const [billingOpen, setBillingOpen] = useState(
    location.pathname.startsWith('/app/billing')
  )

  const path = location.pathname

  const initials = user
    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
    : 'U'
  const fullName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'User'
  const role = user?.role || user?.user_type || 'Operations'

  const pageTitle = getPageTitle(path)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#EFF6FF' }}>
      {/* ── Sidebar ── */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '16rem',
          height: '100vh',
          backgroundColor: '#fff',
          borderRight: '1px solid rgba(191,219,254,0.5)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 40,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(191,219,254,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '0.5rem',
              backgroundColor: '#1D4ED8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Truck style={{ width: '1.125rem', height: '1.125rem', color: '#fff' }} />
          </div>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F2A4A' }}>LoadLink</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.75rem 0.625rem', overflowY: 'auto' }}>
          <NavSection label="Operations">
            <NavItem to="/app" icon={BarChart3} label="Dashboard" active={path === '/app'} />
            <NavItem
              to="/app/shipments"
              icon={Package}
              label="Shipments"
              active={path.startsWith('/app/shipments')}
            />

            {/* Fleet — collapsible */}
            <CollapsibleGroup
              icon={Truck}
              label="Fleet"
              active={path.startsWith('/app/fleet')}
              open={fleetOpen}
              onToggle={() => setFleetOpen((v) => !v)}
            >
              <SubNavItem to="/app/fleet" label="Live Map" active={path === '/app/fleet'} />
              <SubNavItem
                to="/app/fleet/vehicles"
                label="Vehicles"
                active={path.startsWith('/app/fleet/vehicles')}
              />
              <SubNavItem
                to="/app/fleet/drivers"
                label="Drivers"
                active={path.startsWith('/app/fleet/drivers')}
              />
            </CollapsibleGroup>

            <NavItem
              to="/app/warehouse"
              icon={Boxes}
              label="Warehouse"
              active={path.startsWith('/app/warehouse')}
            />
            <NavItem
              to="/app/customs"
              icon={FileText}
              label="Customs"
              active={path.startsWith('/app/customs')}
            />
          </NavSection>

          <NavSection label="Finance">
            {/* Billing — collapsible */}
            <CollapsibleGroup
              icon={DollarSign}
              label="Billing"
              active={path.startsWith('/app/billing')}
              open={billingOpen}
              onToggle={() => setBillingOpen((v) => !v)}
            >
              <SubNavItem
                to="/app/billing/invoices"
                label="Invoices"
                active={path.startsWith('/app/billing/invoices')}
              />
              <SubNavItem
                to="/app/billing/payments"
                label="Payments"
                active={path.startsWith('/app/billing/payments')}
              />
            </CollapsibleGroup>

            <NavItem
              to="/app/customers"
              icon={Users}
              label="Customers"
              active={path.startsWith('/app/customers')}
            />
            <NavItem
              to="/app/vendors"
              icon={Building2}
              label="Vendors"
              active={path.startsWith('/app/vendors')}
            />
          </NavSection>

          <NavSection label="Intelligence">
            <NavItem
              to="/app/reports"
              icon={TrendingUp}
              label="Reports"
              active={path.startsWith('/app/reports')}
            />
          </NavSection>
        </nav>

        {/* Bottom — Settings */}
        <div
          style={{
            padding: '0.75rem 0.625rem',
            borderTop: '1px solid rgba(191,219,254,0.35)',
            flexShrink: 0,
          }}
        >
          <NavItem
            to="/app/settings"
            icon={Settings}
            label="Settings"
            active={path.startsWith('/app/settings')}
          />
        </div>
      </aside>

      {/* ── Header ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: '16rem',
          right: 0,
          height: '4rem',
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(191,219,254,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          zIndex: 30,
        }}
      >
        {/* Page title */}
        <h1 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>
          {pageTitle}
        </h1>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Notifications */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(191,219,254,0.5)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              position: 'relative',
            }}
            title="Notifications"
          >
            <Bell style={{ width: '1rem', height: '1rem', color: '#374151' }} />
            <span
              style={{
                position: 'absolute',
                top: '0.35rem',
                right: '0.35rem',
                width: '0.45rem',
                height: '0.45rem',
                borderRadius: '50%',
                backgroundColor: '#1D4ED8',
              }}
            />
          </button>

          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                backgroundColor: '#1D4ED8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ lineHeight: 1.3 }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F2A4A', margin: 0 }}>
                {fullName}
              </p>
              <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: 0, textTransform: 'capitalize' }}>
                {typeof role === 'string' ? role.toLowerCase().replace(/_/g, ' ') : 'Staff'}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.4rem 0.75rem',
              border: '1px solid rgba(191,219,254,0.6)',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              fontSize: '0.8rem',
              color: '#374151',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FEF2F2'
              e.currentTarget.style.borderColor = '#FECACA'
              e.currentTarget.style.color = '#B91C1C'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(191,219,254,0.6)'
              e.currentTarget.style.color = '#374151'
            }}
          >
            <LogOut style={{ width: '0.875rem', height: '0.875rem' }} />
            Logout
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <main
        style={{
          marginLeft: '16rem',
          paddingTop: '4rem',
          minHeight: '100vh',
          backgroundColor: '#EFF6FF',
          flex: 1,
        }}
      >
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </main>
    </div>
  )
}

export default AppShell
