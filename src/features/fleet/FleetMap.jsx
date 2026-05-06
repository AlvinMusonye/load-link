import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Plus,
  MapPin,
  Fuel,
  Navigation,
  Activity,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { Button, Badge } from '../../components/ui';

const MOCK_VEHICLES = [
  { id: 'v1', plate: 'KBZ 012A', make: 'Isuzu', model: 'NQR 75', year: 2022, type: 'Medium Truck', status: 'ON_TRIP', driverId: 'd1', currentLocation: 'Nairobi–Mombasa Highway (km 142)', odometer: 84320, fuelLevel: 78, lastService: '2025-03-15', nextService: '2025-06-15', capacity: 5000, insurance: '2025-12-31', speed: 94 },
  { id: 'v2', plate: 'KDG 445B', make: 'DAF', model: 'CF85', year: 2021, type: 'Heavy Truck', status: 'ON_TRIP', driverId: 'd2', currentLocation: 'Kampala–Masaka Road', odometer: 121450, fuelLevel: 55, lastService: '2025-02-20', nextService: '2025-05-20', capacity: 20000, insurance: '2025-11-30', speed: 87 },
  { id: 'v3', plate: 'UAM 098C', make: 'Mercedes-Benz', model: 'Actros 1845', year: 2023, type: 'Heavy Truck', status: 'IDLE', driverId: 'd3', currentLocation: 'Kigali Depot', odometer: 43200, fuelLevel: 91, lastService: '2025-04-10', nextService: '2025-07-10', capacity: 25000, insurance: '2026-03-31', speed: 0 },
  { id: 'v4', plate: 'TZD 331D', make: 'Scania', model: 'R450', year: 2020, type: 'Heavy Truck', status: 'ON_TRIP', driverId: 'd4', currentLocation: 'Dar es Salaam Port Area', odometer: 198700, fuelLevel: 33, lastService: '2025-04-01', nextService: '2025-07-01', capacity: 22000, insurance: '2025-09-30', speed: 78 },
  { id: 'v5', plate: 'KAC 210E', make: 'MAN', model: 'TGX 18.440', year: 2019, type: 'Heavy Truck', status: 'MAINTENANCE', driverId: null, currentLocation: 'Nairobi Workshop', odometer: 254100, fuelLevel: 20, lastService: '2025-05-01', nextService: '2025-05-15', capacity: 20000, insurance: '2025-08-31', speed: 0 },
  { id: 'v6', plate: 'UBX 567F', make: 'Isuzu', model: 'FVZ 1400', year: 2022, type: 'Medium Truck', status: 'ON_TRIP', driverId: 'd5', currentLocation: 'Mombasa–Malindi Road', odometer: 67900, fuelLevel: 66, lastService: '2025-04-05', nextService: '2025-07-05', capacity: 7000, insurance: '2025-12-31', speed: 101 },
];

// SVG coordinate positions for each city in the map (within 600x500 viewbox)
const CITY_POSITIONS = {
  nairobi:    { x: 310, y: 230, label: 'Nairobi' },
  mombasa:    { x: 430, y: 310, label: 'Mombasa' },
  kampala:    { x: 180, y: 160, label: 'Kampala' },
  dar:        { x: 370, y: 380, label: 'Dar es Salaam' },
  kigali:     { x: 200, y: 260, label: 'Kigali' },
  eldoret:    { x: 240, y: 180, label: 'Eldoret' },
};

// Vehicle dot positions on map
const VEHICLE_POSITIONS = [
  { id: 'v1', x: 365, y: 270 },  // Nairobi-Mombasa highway
  { id: 'v2', x: 195, y: 190 },  // Kampala-Masaka road
  { id: 'v3', x: 200, y: 260 },  // Kigali depot
  { id: 'v4', x: 375, y: 375 },  // Dar es Salaam
  { id: 'v5', x: 310, y: 240 },  // Nairobi workshop
  { id: 'v6', x: 440, y: 295 },  // Mombasa-Malindi
];

// Route lines between city pairs
const ROUTES = [
  { from: CITY_POSITIONS.nairobi, to: CITY_POSITIONS.mombasa },
  { from: CITY_POSITIONS.nairobi, to: CITY_POSITIONS.kampala },
  { from: CITY_POSITIONS.nairobi, to: CITY_POSITIONS.dar },
  { from: CITY_POSITIONS.kampala, to: CITY_POSITIONS.kigali },
  { from: CITY_POSITIONS.nairobi, to: CITY_POSITIONS.eldoret },
  { from: CITY_POSITIONS.mombasa, to: CITY_POSITIONS.dar },
];

function statusColor(status) {
  if (status === 'ON_TRIP') return '#15803D';
  if (status === 'IDLE') return '#D97706';
  if (status === 'MAINTENANCE') return '#B91C1C';
  return '#6B7280';
}

function statusDotFill(status) {
  if (status === 'ON_TRIP') return '#22C55E';
  if (status === 'IDLE') return '#F59E0B';
  if (status === 'MAINTENANCE') return '#EF4444';
  return '#9CA3AF';
}

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
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Fuel style={{ width: '0.75rem', height: '0.75rem', color: '#6B7280', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '5px', backgroundColor: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${level}%`, height: '100%', backgroundColor: color, borderRadius: '9999px', transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: '0.7rem', color: '#6B7280', minWidth: '2rem' }}>{level}%</span>
    </div>
  );
}

export default function FleetMap() {
  const navigate = useNavigate();
  const [hoveredVehicle, setHoveredVehicle] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      setPulsePhase((p) => (p + 1) % 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onTrip = MOCK_VEHICLES.filter((v) => v.status === 'ON_TRIP').length;
  const available = MOCK_VEHICLES.filter((v) => v.status === 'IDLE').length;
  const maintenance = MOCK_VEHICLES.filter((v) => v.status === 'MAINTENANCE').length;

  const hoveredData = hoveredVehicle
    ? MOCK_VEHICLES.find((v) => v.id === hoveredVehicle.id)
    : null;
  const hoveredPos = hoveredVehicle
    ? VEHICLE_POSITIONS.find((p) => p.id === hoveredVehicle.id)
    : null;

  return (
    <div style={{ padding: 0 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>Fleet Map</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem', margin: '0.25rem 0 0' }}>
            Track all vehicles in real time
          </p>
        </div>
        <Button onClick={() => {}}>
          <Plus style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          Add Vehicle
        </Button>
      </div>

      {/* Stats Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Vehicles', value: 6, icon: Truck, color: '#1D4ED8', bg: '#DBEAFE' },
          { label: 'On Trip', value: onTrip, icon: Navigation, color: '#15803D', bg: '#DCFCE7' },
          { label: 'Available', value: available, icon: Activity, color: '#D97706', bg: '#FEF3C7' },
          { label: 'Maintenance', value: maintenance, icon: AlertTriangle, color: '#B91C1C', bg: '#FEE2E2' },
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
              <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0 }}>{label}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: '1.25rem', alignItems: 'start' }}>
        {/* Map Panel */}
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
          {/* Map Header */}
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(191,219,254,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <MapPin style={{ width: '1rem', height: '1rem', color: '#1D4ED8' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F2A4A' }}>Fleet Map — Live</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>6 vehicles tracked</span>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* SVG Map */}
          <div
            style={{
              minHeight: '500px',
              background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <style>{`
              @keyframes vehiclePulse {
                0%, 100% { r: 12; opacity: 0.5; }
                50% { r: 18; opacity: 0; }
              }
              @keyframes dotPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
              }
            `}</style>

            <svg
              viewBox="0 0 600 500"
              width="100%"
              height="100%"
              style={{ display: 'block', minHeight: '500px' }}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid lines */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={`vg${i}`}
                  x1={i * 50}
                  y1={0}
                  x2={i * 50}
                  y2={500}
                  stroke="rgba(191,219,254,0.3)"
                  strokeWidth="1"
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <line
                  key={`hg${i}`}
                  x1={0}
                  y1={i * 50}
                  x2={600}
                  y2={i * 50}
                  stroke="rgba(191,219,254,0.3)"
                  strokeWidth="1"
                />
              ))}

              {/* Route lines */}
              {ROUTES.map((route, i) => (
                <line
                  key={`route${i}`}
                  x1={route.from.x}
                  y1={route.from.y}
                  x2={route.to.x}
                  y2={route.to.y}
                  stroke="rgba(59,130,246,0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
              ))}

              {/* City markers */}
              {Object.entries(CITY_POSITIONS).map(([key, city]) => (
                <g key={key}>
                  <circle cx={city.x} cy={city.y} r={6} fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5" />
                  <circle cx={city.x} cy={city.y} r={3} fill="#1D4ED8" />
                  <text
                    x={city.x}
                    y={city.y - 12}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#374151"
                    fontFamily="inherit"
                    fontWeight="500"
                  >
                    {city.label}
                  </text>
                </g>
              ))}

              {/* Vehicle dots */}
              {VEHICLE_POSITIONS.map((pos) => {
                const vehicle = MOCK_VEHICLES.find((v) => v.id === pos.id);
                if (!vehicle) return null;
                const color = statusDotFill(vehicle.status);
                const isMoving = vehicle.status === 'ON_TRIP';
                return (
                  <g
                    key={pos.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredVehicle(pos)}
                    onMouseLeave={() => setHoveredVehicle(null)}
                    onClick={() => navigate(`/app/fleet/vehicles/${vehicle.id}`)}
                  >
                    {/* Pulse ring for moving vehicles */}
                    {isMoving && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={12}
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                        opacity="0.4"
                        style={{ animation: 'vehiclePulse 2s ease-in-out infinite' }}
                      />
                    )}
                    {/* Outer ring */}
                    <circle cx={pos.x} cy={pos.y} r={8} fill="white" stroke={color} strokeWidth="2" />
                    {/* Inner dot */}
                    <circle cx={pos.x} cy={pos.y} r={4} fill={color} style={isMoving ? { animation: 'dotPulse 2s ease-in-out infinite' } : {}} />
                  </g>
                );
              })}

              {/* Tooltip for hovered vehicle */}
              {hoveredData && hoveredPos && (
                <g>
                  <rect
                    x={hoveredPos.x + 12}
                    y={hoveredPos.y - 30}
                    width={130}
                    height={52}
                    rx={6}
                    fill="white"
                    stroke="rgba(191,219,254,0.7)"
                    strokeWidth="1"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
                  />
                  <text x={hoveredPos.x + 20} y={hoveredPos.y - 12} fontSize="10" fill="#0F2A4A" fontWeight="700" fontFamily="inherit">
                    {hoveredData.plate}
                  </text>
                  <text x={hoveredPos.x + 20} y={hoveredPos.y + 2} fontSize="9" fill="#6B7280" fontFamily="inherit">
                    {hoveredData.make} {hoveredData.model}
                  </text>
                  {hoveredData.speed > 0 && (
                    <text x={hoveredPos.x + 20} y={hoveredPos.y + 16} fontSize="9" fill="#15803D" fontFamily="inherit">
                      {hoveredData.speed} km/h
                    </text>
                  )}
                </g>
              )}
            </svg>

            {/* Legend */}
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.85)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', border: '1px solid rgba(191,219,254,0.4)' }}>
              {[
                { label: 'On Trip', color: '#22C55E' },
                { label: 'Idle', color: '#F59E0B' },
                { label: 'Maintenance', color: '#EF4444' },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '0.625rem', height: '0.625rem', borderRadius: '50%', backgroundColor: color }} />
                  <span style={{ fontSize: '0.7rem', color: '#374151' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle List Panel */}
        <div
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(191,219,254,0.45)',
            borderRadius: '1rem',
            overflow: 'hidden',
            maxHeight: '620px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(191,219,254,0.35)', flexShrink: 0 }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F2A4A' }}>Vehicles</span>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {MOCK_VEHICLES.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => navigate(`/app/fleet/vehicles/${vehicle.id}`)}
                style={{
                  padding: '0.875rem 1.25rem',
                  borderBottom: '1px solid rgba(191,219,254,0.2)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F0F9FF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F2A4A' }}>{vehicle.plate}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280', marginLeft: '0.5rem' }}>{vehicle.make} {vehicle.model}</span>
                  </div>
                  <Badge variant={statusBadgeVariant(vehicle.status)} size="sm">{statusLabel(vehicle.status)}</Badge>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  <MapPin style={{ width: '0.7rem', height: '0.7rem', flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{vehicle.currentLocation}</span>
                </div>
                <FuelBar level={vehicle.fuelLevel} />
                {vehicle.speed > 0 && (
                  <div style={{ marginTop: '0.25rem', fontSize: '0.7rem', color: statusColor(vehicle.status), display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Navigation style={{ width: '0.65rem', height: '0.65rem' }} />
                    {vehicle.speed} km/h
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
