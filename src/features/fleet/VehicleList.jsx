import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Truck,
  Fuel,
  MapPin,
  User,
  ArrowRight,
} from 'lucide-react';
import { Button, Badge, Input } from '../../components/ui';

const MOCK_VEHICLES = [
  { id: 'v1', plate: 'KBZ 012A', make: 'Isuzu', model: 'NQR 75', year: 2022, type: 'Medium Truck', status: 'ON_TRIP', driverId: 'd1', driverName: 'John Kamau', currentLocation: 'Nairobi–Mombasa Highway (km 142)', odometer: 84320, fuelLevel: 78 },
  { id: 'v2', plate: 'KDG 445B', make: 'DAF', model: 'CF85', year: 2021, type: 'Heavy Truck', status: 'ON_TRIP', driverId: 'd2', driverName: 'Mary Wanjiku', currentLocation: 'Kampala–Masaka Road', odometer: 121450, fuelLevel: 55 },
  { id: 'v3', plate: 'UAM 098C', make: 'Mercedes-Benz', model: 'Actros 1845', year: 2023, type: 'Heavy Truck', status: 'IDLE', driverId: 'd3', driverName: 'David Ochieng', currentLocation: 'Kigali Depot', odometer: 43200, fuelLevel: 91 },
  { id: 'v4', plate: 'TZD 331D', make: 'Scania', model: 'R450', year: 2020, type: 'Heavy Truck', status: 'ON_TRIP', driverId: 'd4', driverName: 'Grace Muthoni', currentLocation: 'Dar es Salaam Port Area', odometer: 198700, fuelLevel: 33 },
  { id: 'v5', plate: 'KAC 210E', make: 'MAN', model: 'TGX 18.440', year: 2019, type: 'Heavy Truck', status: 'MAINTENANCE', driverId: null, driverName: null, currentLocation: 'Nairobi Workshop', odometer: 254100, fuelLevel: 20 },
  { id: 'v6', plate: 'UBX 567F', make: 'Isuzu', model: 'FVZ 1400', year: 2022, type: 'Medium Truck', status: 'ON_TRIP', driverId: 'd5', driverName: 'Peter Mutua', currentLocation: 'Mombasa–Malindi Road', odometer: 67900, fuelLevel: 66 },
];

const STATUS_TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'ON_TRIP', label: 'On Trip' },
  { key: 'IDLE', label: 'Idle' },
  { key: 'MAINTENANCE', label: 'Maintenance' },
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

function FuelGauge({ level }) {
  const color = level > 50 ? '#15803D' : level > 20 ? '#D97706' : '#B91C1C';
  const bg = level > 50 ? '#DCFCE7' : level > 20 ? '#FEF3C7' : '#FEE2E2';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Fuel style={{ width: '0.75rem', height: '0.75rem', color: '#6B7280' }} />
          <span style={{ fontSize: '0.7rem', color: '#6B7280' }}>Fuel</span>
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, color }}>{level}%</span>
      </div>
      <div style={{ height: '5px', backgroundColor: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${level}%`, height: '100%', backgroundColor: color, borderRadius: '9999px', transition: 'width 0.4s' }} />
      </div>
    </div>
  );
}

export default function VehicleList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const filtered = MOCK_VEHICLES.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      v.plate.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q);
    const matchTab = activeTab === 'ALL' || v.status === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>Vehicles</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem', margin: '0.25rem 0 0' }}>
            Manage your fleet
          </p>
        </div>
        <Button onClick={() => {}}>
          <Plus style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          Add Vehicle
        </Button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: '320px' }}>
          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '0.875rem', height: '0.875rem', color: '#9CA3AF', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search plate, make, model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '2.25rem',
              paddingRight: '0.75rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              border: '1px solid #BFDBFE',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#374151',
              backgroundColor: 'white',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Status tabs */}
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: activeTab === tab.key ? 600 : 400,
                border: activeTab === tab.key ? '1.5px solid #1D4ED8' : '1.5px solid #E5E7EB',
                backgroundColor: activeTab === tab.key ? '#EFF6FF' : 'white',
                color: activeTab === tab.key ? '#1D4ED8' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
          <Truck style={{ width: '3rem', height: '3rem', color: '#D1D5DB', margin: '0 auto 1rem' }} />
          <p style={{ fontWeight: 600, color: '#374151' }}>No vehicles found</p>
          <p style={{ fontSize: '0.875rem' }}>Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filtered.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(191,219,254,0.45)',
                borderRadius: '1rem',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {/* Plate + Status */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F2A4A', letterSpacing: '0.04em' }}>
                  {vehicle.plate}
                </span>
                <Badge variant={statusBadgeVariant(vehicle.status)} size="sm">
                  {statusLabel(vehicle.status)}
                </Badge>
              </div>

              {/* Make / Model / Year */}
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: 0 }}>
                  {vehicle.make} {vehicle.model}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '0.125rem 0 0' }}>{vehicle.year}</p>
              </div>

              {/* Type chip */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    backgroundColor: '#DBEAFE',
                    color: '#1D4ED8',
                    borderRadius: '0.375rem',
                    padding: '0.2rem 0.625rem',
                  }}
                >
                  {vehicle.type}
                </span>
              </div>

              {/* Fuel Gauge */}
              <FuelGauge level={vehicle.fuelLevel} />

              {/* Odometer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Truck style={{ width: '0.75rem', height: '0.75rem', color: '#6B7280' }} />
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  {vehicle.odometer.toLocaleString()} km
                </span>
              </div>

              {/* Driver */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <User style={{ width: '0.75rem', height: '0.75rem', color: '#6B7280' }} />
                <span style={{ fontSize: '0.75rem', color: vehicle.driverName ? '#374151' : '#9CA3AF', fontStyle: vehicle.driverName ? 'normal' : 'italic' }}>
                  {vehicle.driverName || 'Unassigned'}
                </span>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                <MapPin style={{ width: '0.75rem', height: '0.75rem', color: '#6B7280', flexShrink: 0, marginTop: '0.125rem' }} />
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#6B7280',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {vehicle.currentLocation}
                </span>
              </div>

              {/* View Details Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/app/fleet/vehicles/${vehicle.id}`)}
                style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
              >
                View Details
                <ArrowRight style={{ width: '0.875rem', height: '0.875rem', marginLeft: '0.375rem' }} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
