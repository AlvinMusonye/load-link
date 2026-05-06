import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Truck,
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Navigation,
  Clock,
} from 'lucide-react';
import { Button, Badge } from '../../components/ui';

const MOCK_DRIVERS = [
  { id: 'd1', name: 'John Kamau', phone: '+254 712 345 678', email: 'jkamau@loadlink.co.ke', licenseNumber: 'DL-KE-2019-4521', licenseExpiry: '2027-03-15', ntsa: 'NTSA-789012', status: 'ON_TRIP', vehicleId: 'v1', joinDate: '2021-06-01', rating: 4.8, trips: 342, onTime: 96, incidents: 1, homeBase: 'Nairobi' },
  { id: 'd2', name: 'Mary Wanjiku', phone: '+254 723 456 789', email: 'mwanjiku@loadlink.co.ke', licenseNumber: 'DL-KE-2018-3301', licenseExpiry: '2026-08-20', ntsa: 'NTSA-234567', status: 'ON_TRIP', vehicleId: 'v2', joinDate: '2020-03-15', rating: 4.9, trips: 521, onTime: 98, incidents: 0, homeBase: 'Nairobi' },
  { id: 'd3', name: 'David Ochieng', phone: '+254 734 567 890', email: 'dochieng@loadlink.co.ke', licenseNumber: 'DL-KE-2020-7812', licenseExpiry: '2028-01-10', ntsa: 'NTSA-456789', status: 'AVAILABLE', vehicleId: 'v3', joinDate: '2022-01-10', rating: 4.7, trips: 198, onTime: 94, incidents: 2, homeBase: 'Kigali' },
  { id: 'd4', name: 'Grace Muthoni', phone: '+254 745 678 901', email: 'gmuthoni@loadlink.co.ke', licenseNumber: 'DL-KE-2017-1243', licenseExpiry: '2025-11-30', ntsa: 'NTSA-678901', status: 'ON_TRIP', vehicleId: 'v4', joinDate: '2019-07-22', rating: 4.6, trips: 678, onTime: 92, incidents: 3, homeBase: 'Mombasa' },
  { id: 'd5', name: 'Peter Mutua', phone: '+254 756 789 012', email: 'pmutua@loadlink.co.ke', licenseNumber: 'DL-KE-2021-9034', licenseExpiry: '2029-05-20', ntsa: 'NTSA-901234', status: 'ON_TRIP', vehicleId: 'v6', joinDate: '2023-02-01', rating: 4.5, trips: 87, onTime: 90, incidents: 0, homeBase: 'Nairobi' },
  { id: 'd6', name: 'James Otieno', phone: '+254 767 890 123', email: 'jotieno@loadlink.co.ke', licenseNumber: 'DL-KE-2016-5567', licenseExpiry: '2024-12-31', ntsa: 'NTSA-123456', status: 'OFF_DUTY', vehicleId: null, joinDate: '2018-11-15', rating: 4.3, trips: 892, onTime: 88, incidents: 5, homeBase: 'Kisumu' },
];

const MOCK_VEHICLES_MAP = {
  v1: { plate: 'KBZ 012A', make: 'Isuzu', model: 'NQR 75', type: 'Medium Truck' },
  v2: { plate: 'KDG 445B', make: 'DAF', model: 'CF85', type: 'Heavy Truck' },
  v3: { plate: 'UAM 098C', make: 'Mercedes-Benz', model: 'Actros 1845', type: 'Heavy Truck' },
  v4: { plate: 'TZD 331D', make: 'Scania', model: 'R450', type: 'Heavy Truck' },
  v6: { plate: 'UBX 567F', make: 'Isuzu', model: 'FVZ 1400', type: 'Medium Truck' },
};

const RECENT_TRIPS = [
  { id: 'TRP-0418', route: 'Nairobi → Mombasa', date: '2025-04-30', status: 'COMPLETED', distance: '480 km', duration: '5h 40m' },
  { id: 'TRP-0402', route: 'Mombasa → Nairobi', date: '2025-04-22', status: 'COMPLETED', distance: '480 km', duration: '5h 50m' },
  { id: 'TRP-0389', route: 'Nairobi → Eldoret', date: '2025-04-15', status: 'COMPLETED', distance: '310 km', duration: '3h 45m' },
  { id: 'TRP-0374', route: 'Eldoret → Kampala', date: '2025-04-07', status: 'COMPLETED', distance: '420 km', duration: '4h 55m' },
  { id: 'TRP-0361', route: 'Kampala → Nairobi', date: '2025-03-30', status: 'COMPLETED', distance: '680 km', duration: '7h 20m' },
];

function statusBadgeVariant(status) {
  if (status === 'ON_TRIP') return 'success';
  if (status === 'AVAILABLE') return 'primary';
  if (status === 'OFF_DUTY') return 'default';
  return 'default';
}

function statusLabel(status) {
  if (status === 'ON_TRIP') return 'On Trip';
  if (status === 'AVAILABLE') return 'Available';
  if (status === 'OFF_DUTY') return 'Off Duty';
  return status;
}

function isExpired(expiry) {
  return new Date(expiry) < new Date();
}

function getInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}

function SectionCard({ title, icon: Icon, children }) {
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
      <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(191,219,254,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {Icon && <Icon style={{ width: '1rem', height: '1rem', color: '#1D4ED8' }} />}
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F2A4A' }}>{title}</span>
      </div>
      <div style={{ padding: '1.25rem' }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.45rem 0', borderBottom: '1px solid rgba(191,219,254,0.15)' }}>
      <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>{label}</span>
      <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  );
}

function StarRating({ value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{
            width: '1.125rem',
            height: '1.125rem',
            color: s <= Math.round(value) ? '#D97706' : '#E5E7EB',
            fill: s <= Math.round(value) ? '#D97706' : '#E5E7EB',
          }}
        />
      ))}
      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0F2A4A', marginLeft: '0.375rem' }}>{value}</span>
    </div>
  );
}

export default function DriverProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const driver = MOCK_DRIVERS.find((d) => d.id === id) || MOCK_DRIVERS[0];
  const vehicle = driver.vehicleId ? MOCK_VEHICLES_MAP[driver.vehicleId] : null;

  const docStatus = (expiry) => (isExpired(expiry) ? 'expired' : 'valid');

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/app/fleet/drivers')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: '0.875rem', padding: 0, fontFamily: 'inherit' }}
          >
            <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
            Back to Drivers
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Large avatar */}
            <div
              style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: '#1D4ED8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {getInitials(driver.name)}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>{driver.name}</h1>
              <Badge variant={statusBadgeVariant(driver.status)} size="sm">{statusLabel(driver.status)}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Three column top info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Contact Info */}
        <SectionCard title="Contact Info" icon={Phone}>
          <InfoRow label="Phone" value={driver.phone} />
          <InfoRow label="Email" value={driver.email} />
          <InfoRow label="Home Base" value={driver.homeBase} />
          <InfoRow label="Join Date" value={driver.joinDate} />
        </SectionCard>

        {/* License & Compliance */}
        <SectionCard title="License & Compliance" icon={Shield}>
          <InfoRow label="NTSA Number" value={driver.ntsa} />
          <InfoRow label="License Number" value={driver.licenseNumber} />
          <div style={{ padding: '0.45rem 0', borderBottom: '1px solid rgba(191,219,254,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>License Expiry</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {isExpired(driver.licenseExpiry) && <AlertTriangle style={{ width: '0.75rem', height: '0.75rem', color: '#B91C1C' }} />}
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: isExpired(driver.licenseExpiry) ? '#B91C1C' : '#374151' }}>{driver.licenseExpiry}</span>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge variant={isExpired(driver.licenseExpiry) ? 'error' : 'success'} size="sm">
              {isExpired(driver.licenseExpiry) ? 'License Expired' : 'License Valid'}
            </Badge>
            <Badge variant="success" size="sm">NTSA Compliant</Badge>
          </div>
        </SectionCard>

        {/* Performance Snapshot */}
        <SectionCard title="Performance" icon={TrendingUp}>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '0 0 0.375rem' }}>Overall Rating</p>
            <StarRating value={driver.rating} />
          </div>
          <InfoRow label="Total Trips" value={driver.trips.toLocaleString()} />
          <InfoRow label="On-Time Delivery" value={`${driver.onTime}%`} />
          <InfoRow label="Incidents Reported" value={driver.incidents === 0 ? 'None' : driver.incidents} />
        </SectionCard>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'This Month Trips', value: '18', icon: Navigation, color: '#1D4ED8', bg: '#DBEAFE' },
          { label: 'KM Driven', value: '8,640 km', icon: Truck, color: '#15803D', bg: '#DCFCE7' },
          { label: 'Revenue Generated', value: 'KES 340K', icon: TrendingUp, color: '#7C3AED', bg: '#EDE9FE' },
          { label: 'Fuel Efficiency', value: '8.2 km/L', icon: Activity, color: '#D97706', bg: '#FEF3C7' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(191,219,254,0.45)',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
            }}
          >
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon style={{ width: '1.25rem', height: '1.25rem', color }} />
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: 0 }}>{label}</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '1.25rem', alignItems: 'start' }}>
        {/* Recent Trips */}
        <SectionCard title="Recent Trips" icon={Navigation}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  {['Trip ID', 'Route', 'Date', 'Status', 'Distance', 'Duration'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.625rem', color: '#6B7280', fontWeight: 500, fontSize: '0.75rem', borderBottom: '1px solid rgba(191,219,254,0.4)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_TRIPS.map((trip, i) => (
                  <tr key={trip.id} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(239,246,255,0.5)' }}>
                    <td style={{ padding: '0.5rem 0.625rem', color: '#1D4ED8', fontWeight: 500, whiteSpace: 'nowrap' }}>{trip.id}</td>
                    <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{trip.route}</td>
                    <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{trip.date}</td>
                    <td style={{ padding: '0.5rem 0.625rem' }}>
                      <Badge variant="success" size="sm">{trip.status}</Badge>
                    </td>
                    <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{trip.distance}</td>
                    <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{trip.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Right column stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Assigned Vehicle */}
          <SectionCard title="Assigned Vehicle" icon={Truck}>
            {vehicle ? (
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>{vehicle.plate}</p>
                <p style={{ fontSize: '0.8125rem', color: '#374151', margin: '0.25rem 0' }}>{vehicle.make} {vehicle.model}</p>
                <span style={{ display: 'inline-block', fontSize: '0.7rem', backgroundColor: '#DBEAFE', color: '#1D4ED8', borderRadius: '0.375rem', padding: '0.15rem 0.5rem', marginBottom: '0.75rem' }}>{vehicle.type}</span>
                <br />
                <Link
                  to={`/app/fleet/vehicles/${driver.vehicleId}`}
                  style={{ fontSize: '0.8125rem', color: '#1D4ED8', textDecoration: 'none', fontWeight: 500 }}
                >
                  View Vehicle Details →
                </Link>
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#9CA3AF', fontStyle: 'italic' }}>No vehicle assigned</p>
            )}
          </SectionCard>

          {/* Behavior Score */}
          <SectionCard title="Behavior Score" icon={Activity}>
            {[
              { label: 'Harsh Braking Events', value: '2', icon: AlertTriangle, color: '#D97706', bg: '#FEF3C7' },
              { label: 'Speeding Events', value: '1', icon: Navigation, color: '#B91C1C', bg: '#FEE2E2' },
              { label: 'Idle Time', value: '3h', icon: Clock, color: '#6B7280', bg: '#F3F4F6' },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(191,219,254,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.375rem', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: '0.875rem', height: '0.875rem', color }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#374151' }}>{label}</span>
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color }}>{value}</span>
              </div>
            ))}
          </SectionCard>

          {/* Documents */}
          <SectionCard title="Documents" icon={FileText}>
            {[
              { label: "Driver's License", expiry: driver.licenseExpiry },
              { label: 'PSV Badge', expiry: '2026-06-30' },
              { label: 'Medical Certificate', expiry: '2025-12-31' },
            ].map((doc) => {
              const status = docStatus(doc.expiry);
              return (
                <div key={doc.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(191,219,254,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {status === 'valid'
                      ? <CheckCircle style={{ width: '0.875rem', height: '0.875rem', color: '#15803D' }} />
                      : <XCircle style={{ width: '0.875rem', height: '0.875rem', color: '#B91C1C' }} />
                    }
                    <span style={{ fontSize: '0.8rem', color: '#374151' }}>{doc.label}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Badge variant={status === 'valid' ? 'success' : 'error'} size="sm">{status === 'valid' ? 'Valid' : 'Expired'}</Badge>
                    <p style={{ fontSize: '0.65rem', color: '#6B7280', margin: '0.125rem 0 0' }}>{doc.expiry}</p>
                  </div>
                </div>
              );
            })}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
