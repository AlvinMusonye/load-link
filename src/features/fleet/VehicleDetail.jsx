import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Truck,
  MapPin,
  Fuel,
  User,
  Phone,
  Star,
  FileText,
  Shield,
  Wrench,
  Navigation,
  Calendar,
  CheckCircle,
  XCircle,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardBody } from '../../components/ui';

const MOCK_VEHICLES = [
  { id: 'v1', plate: 'KBZ 012A', make: 'Isuzu', model: 'NQR 75', year: 2022, type: 'Medium Truck', status: 'ON_TRIP', driverId: 'd1', currentLocation: 'Nairobi–Mombasa Highway (km 142)', odometer: 84320, fuelLevel: 78, lastService: '2025-03-15', nextService: '2025-06-15', capacity: 5000, insurance: '2025-12-31', speed: 94 },
  { id: 'v2', plate: 'KDG 445B', make: 'DAF', model: 'CF85', year: 2021, type: 'Heavy Truck', status: 'ON_TRIP', driverId: 'd2', currentLocation: 'Kampala–Masaka Road', odometer: 121450, fuelLevel: 55, lastService: '2025-02-20', nextService: '2025-05-20', capacity: 20000, insurance: '2025-11-30', speed: 87 },
  { id: 'v3', plate: 'UAM 098C', make: 'Mercedes-Benz', model: 'Actros 1845', year: 2023, type: 'Heavy Truck', status: 'IDLE', driverId: 'd3', currentLocation: 'Kigali Depot', odometer: 43200, fuelLevel: 91, lastService: '2025-04-10', nextService: '2025-07-10', capacity: 25000, insurance: '2026-03-31', speed: 0 },
  { id: 'v4', plate: 'TZD 331D', make: 'Scania', model: 'R450', year: 2020, type: 'Heavy Truck', status: 'ON_TRIP', driverId: 'd4', currentLocation: 'Dar es Salaam Port Area', odometer: 198700, fuelLevel: 33, lastService: '2025-04-01', nextService: '2025-07-01', capacity: 22000, insurance: '2025-09-30', speed: 78 },
  { id: 'v5', plate: 'KAC 210E', make: 'MAN', model: 'TGX 18.440', year: 2019, type: 'Heavy Truck', status: 'MAINTENANCE', driverId: null, currentLocation: 'Nairobi Workshop', odometer: 254100, fuelLevel: 20, lastService: '2025-05-01', nextService: '2025-05-15', capacity: 20000, insurance: '2025-08-31', speed: 0 },
  { id: 'v6', plate: 'UBX 567F', make: 'Isuzu', model: 'FVZ 1400', year: 2022, type: 'Medium Truck', status: 'ON_TRIP', driverId: 'd5', currentLocation: 'Mombasa–Malindi Road', odometer: 67900, fuelLevel: 66, lastService: '2025-04-05', nextService: '2025-07-05', capacity: 7000, insurance: '2025-12-31', speed: 101 },
];

const MOCK_DRIVERS = [
  { id: 'd1', name: 'John Kamau', phone: '+254 712 345 678', rating: 4.8 },
  { id: 'd2', name: 'Mary Wanjiku', phone: '+254 723 456 789', rating: 4.9 },
  { id: 'd3', name: 'David Ochieng', phone: '+254 734 567 890', rating: 4.7 },
  { id: 'd4', name: 'Grace Muthoni', phone: '+254 745 678 901', rating: 4.6 },
  { id: 'd5', name: 'Peter Mutua', phone: '+254 756 789 012', rating: 4.5 },
];

const MAINTENANCE_HISTORY = [
  { date: '2025-05-01', type: 'Engine Oil Change', mileage: 254000, cost: 'KES 8,500', workshop: 'Nairobi Auto Centre' },
  { date: '2025-03-15', type: 'Brake Pad Replacement', mileage: 248000, cost: 'KES 22,000', workshop: 'Mombasa Road Garage' },
  { date: '2025-01-10', type: 'Tyre Rotation & Alignment', mileage: 241000, cost: 'KES 15,000', workshop: 'Nairobi Auto Centre' },
  { date: '2024-10-22', type: 'Full Service', mileage: 232000, cost: 'KES 45,000', workshop: 'Authorized Dealer Workshop' },
  { date: '2024-07-08', type: 'Air Filter & Fuel Filter', mileage: 224000, cost: 'KES 7,200', workshop: 'Mombasa Road Garage' },
];

const TRIP_HISTORY = [
  { id: 'TRP-0412', route: 'Nairobi → Mombasa', date: '2025-04-28', distance: '480 km', status: 'DELIVERED' },
  { id: 'TRP-0398', route: 'Mombasa → Nairobi', date: '2025-04-20', distance: '480 km', status: 'DELIVERED' },
  { id: 'TRP-0381', route: 'Nairobi → Eldoret', date: '2025-04-12', distance: '310 km', status: 'DELIVERED' },
  { id: 'TRP-0365', route: 'Eldoret → Nairobi', date: '2025-04-05', distance: '310 km', status: 'DELIVERED' },
  { id: 'TRP-0348', route: 'Nairobi → Kampala', date: '2025-03-28', distance: '680 km', status: 'DELIVERED' },
];

const FUEL_CHART = [
  { day: 'Mon', liters: 82 },
  { day: 'Tue', liters: 95 },
  { day: 'Wed', liters: 78 },
  { day: 'Thu', liters: 110 },
  { day: 'Fri', liters: 88 },
  { day: 'Sat', liters: 62 },
  { day: 'Sun', liters: 45 },
];

function statusBadgeVariant(status) {
  if (status === 'ON_TRIP') return 'success';
  if (status === 'IDLE') return 'warning';
  if (status === 'MAINTENANCE') return 'error';
  return 'default';
}

function statusLabel(status) {
  if (status === 'ON_TRIP') return 'On Trip';
  if (status === 'IDLE') return 'Idle';
  if (status === 'MAINTENANCE') return 'Maintenance';
  return status;
}

function FuelBar({ level }) {
  const color = level > 50 ? '#15803D' : level > 20 ? '#D97706' : '#B91C1C';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Fuel Level</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color }}>{level}%</span>
      </div>
      <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${level}%`, height: '100%', backgroundColor: color, borderRadius: '9999px', transition: 'width 0.4s' }} />
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.5rem 0', borderBottom: '1px solid rgba(191,219,254,0.2)' }}>
      <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>{label}</span>
      <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#374151', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  );
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

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = MOCK_VEHICLES.find((v) => v.id === id) || MOCK_VEHICLES[0];
  const driver = vehicle.driverId ? MOCK_DRIVERS.find((d) => d.id === vehicle.driverId) : null;
  const maxFuel = Math.max(...FUEL_CHART.map((d) => d.liters));

  function docStatus(expiry) {
    const d = new Date(expiry);
    const now = new Date();
    return d > now ? 'valid' : 'expired';
  }

  const driverInitials = driver
    ? driver.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : '';

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/app/fleet/vehicles')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: '0.875rem', padding: 0, fontFamily: 'inherit' }}
          >
            <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
            Back to Vehicles
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>{vehicle.plate}</h1>
            <Badge variant={statusBadgeVariant(vehicle.status)}>{statusLabel(vehicle.status)}</Badge>
          </div>
        </div>
        <Button variant="outline">
          <Edit style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          Edit
        </Button>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '1.25rem', alignItems: 'start' }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Vehicle Info */}
          <SectionCard title="Vehicle Info" icon={Truck}>
            <InfoRow label="Make" value={vehicle.make} />
            <InfoRow label="Model" value={vehicle.model} />
            <InfoRow label="Year" value={vehicle.year} />
            <InfoRow label="Type" value={vehicle.type} />
            <InfoRow label="Capacity" value={`${vehicle.capacity.toLocaleString()} kg`} />
            <InfoRow label="Insurance Expiry" value={vehicle.insurance} />
          </SectionCard>

          {/* Current Status */}
          <SectionCard title="Current Status" icon={Navigation}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin style={{ width: '0.875rem', height: '0.875rem', color: '#1D4ED8', flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>{vehicle.currentLocation}</span>
              </div>
              {vehicle.speed > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Navigation style={{ width: '0.875rem', height: '0.875rem', color: '#15803D' }} />
                  <span style={{ fontSize: '0.875rem', color: '#374151' }}>{vehicle.speed} km/h</span>
                </div>
              )}
              <FuelBar level={vehicle.fuelLevel} />
              <InfoRow label="Odometer" value={`${vehicle.odometer.toLocaleString()} km`} />
              <InfoRow label="Last Service" value={vehicle.lastService} />
              <InfoRow label="Next Service" value={vehicle.nextService} />
            </div>
          </SectionCard>

          {/* Maintenance History */}
          <SectionCard title="Maintenance History" icon={Wrench}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr>
                    {['Date', 'Service Type', 'Mileage', 'Cost', 'Workshop'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.625rem', color: '#6B7280', fontWeight: 500, fontSize: '0.75rem', borderBottom: '1px solid rgba(191,219,254,0.4)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MAINTENANCE_HISTORY.map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(239,246,255,0.5)' }}>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{row.date}</td>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#374151' }}>{row.type}</td>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{row.mileage.toLocaleString()} km</td>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{row.cost}</td>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#6B7280', whiteSpace: 'nowrap' }}>{row.workshop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Trip History */}
          <SectionCard title="Recent Trips" icon={MapPin}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr>
                    {['Trip ID', 'Route', 'Date', 'Distance', 'Status'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.625rem', color: '#6B7280', fontWeight: 500, fontSize: '0.75rem', borderBottom: '1px solid rgba(191,219,254,0.4)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRIP_HISTORY.map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(239,246,255,0.5)' }}>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#1D4ED8', fontWeight: 500, whiteSpace: 'nowrap' }}>{row.id}</td>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#374151' }}>{row.route}</td>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{row.date}</td>
                      <td style={{ padding: '0.5rem 0.625rem', color: '#374151', whiteSpace: 'nowrap' }}>{row.distance}</td>
                      <td style={{ padding: '0.5rem 0.625rem' }}>
                        <Badge variant="success" size="sm">{row.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Assigned Driver */}
          <SectionCard title="Assigned Driver" icon={User}>
            {driver ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      backgroundColor: '#DBEAFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#1D4ED8',
                      flexShrink: 0,
                    }}
                  >
                    {driverInitials}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0F2A4A', margin: 0 }}>{driver.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.125rem' }}>
                      <Star style={{ width: '0.75rem', height: '0.75rem', color: '#D97706', fill: '#D97706' }} />
                      <span style={{ fontSize: '0.75rem', color: '#374151' }}>{driver.rating}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
                  <Phone style={{ width: '0.75rem', height: '0.75rem', color: '#6B7280' }} />
                  <span style={{ fontSize: '0.8125rem', color: '#374151' }}>{driver.phone}</span>
                </div>
                <Link
                  to={`/app/fleet/drivers/${driver.id}`}
                  style={{ fontSize: '0.8125rem', color: '#1D4ED8', textDecoration: 'none', fontWeight: 500 }}
                >
                  View Driver Profile →
                </Link>
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#9CA3AF', fontStyle: 'italic' }}>No driver assigned</p>
            )}
          </SectionCard>

          {/* Documents */}
          <SectionCard title="Documents" icon={FileText}>
            {[
              { label: 'Insurance', expiry: vehicle.insurance },
              { label: 'Vehicle Inspection', expiry: '2025-11-30' },
              { label: 'NTSA License', expiry: '2025-12-31' },
            ].map((doc) => {
              const status = docStatus(doc.expiry);
              return (
                <div key={doc.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(191,219,254,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {status === 'valid'
                      ? <CheckCircle style={{ width: '0.875rem', height: '0.875rem', color: '#15803D' }} />
                      : <XCircle style={{ width: '0.875rem', height: '0.875rem', color: '#B91C1C' }} />
                    }
                    <span style={{ fontSize: '0.8125rem', color: '#374151' }}>{doc.label}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Badge variant={status === 'valid' ? 'success' : 'error'} size="sm">{status === 'valid' ? 'Valid' : 'Expired'}</Badge>
                    <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: '0.125rem 0 0' }}>{doc.expiry}</p>
                  </div>
                </div>
              );
            })}
          </SectionCard>

          {/* Performance Metrics */}
          <SectionCard title="Performance — This Month" icon={BarChart3}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              {[
                { label: 'KM Driven', value: '4,280 km' },
                { label: 'Trips Completed', value: '12' },
                { label: 'Fuel Consumed', value: '680 L' },
                { label: 'Incidents', value: '0' },
              ].map(({ label, value }) => (
                <div key={label} style={{ backgroundColor: '#EFF6FF', borderRadius: '0.625rem', padding: '0.75rem' }}>
                  <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: 0 }}>{label}</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F2A4A', margin: '0.125rem 0 0' }}>{value}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Fuel Chart (last 7 days) */}
          <SectionCard title="Fuel Usage — Last 7 Days" icon={Fuel}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '100px' }}>
              {FUEL_CHART.map((d) => (
                <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.6rem', color: '#6B7280' }}>{d.liters}L</span>
                  <div
                    style={{
                      width: '100%',
                      height: `${(d.liters / maxFuel) * 72}px`,
                      backgroundColor: '#BFDBFE',
                      borderRadius: '0.25rem 0.25rem 0 0',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        backgroundColor: '#3B82F6',
                        borderRadius: '0.25rem 0.25rem 0 0',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.6rem', color: '#6B7280' }}>{d.day}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
