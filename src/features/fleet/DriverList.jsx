import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Users,
  Star,
  Phone,
  Mail,
  AlertTriangle,
  ArrowRight,
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

const STATUS_TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'ON_TRIP', label: 'On Trip' },
  { key: 'AVAILABLE', label: 'Available' },
  { key: 'OFF_DUTY', label: 'Off Duty' },
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

const AVATAR_COLORS = ['#1D4ED8', '#15803D', '#D97706', '#7C3AED', '#B91C1C', '#0369A1'];

function DriverAvatar({ name, index }) {
  const bg = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div
      style={{
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '50%',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '0.75rem',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

function OnTimeBar({ value }) {
  const color = value >= 95 ? '#15803D' : value >= 90 ? '#D97706' : '#B91C1C';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ flex: 1, height: '5px', backgroundColor: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden', minWidth: '60px' }}>
        <div style={{ width: `${value}%`, height: '100%', backgroundColor: color, borderRadius: '9999px' }} />
      </div>
      <span style={{ fontSize: '0.75rem', color, fontWeight: 600, minWidth: '2.5rem' }}>{value}%</span>
    </div>
  );
}

export default function DriverList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const filtered = MOCK_DRIVERS.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.phone.includes(q) || d.email.toLowerCase().includes(q);
    const matchTab = activeTab === 'ALL' || d.status === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>Drivers</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Manage your driver workforce
          </p>
        </div>
        <Button onClick={() => {}}>
          <Plus style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          Add Driver
        </Button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: '320px' }}>
          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '0.875rem', height: '0.875rem', color: '#9CA3AF', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search name, phone, email..."
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

      {/* Driver Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
          <Users style={{ width: '3rem', height: '3rem', color: '#D1D5DB', margin: '0 auto 1rem' }} />
          <p style={{ fontWeight: 600, color: '#374151' }}>No drivers found</p>
          <p style={{ fontSize: '0.875rem' }}>Try adjusting your search or filter.</p>
        </div>
      ) : (
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
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#EFF6FF' }}>
                  {['Driver', 'Contact', 'License', 'Status', 'Rating', 'Trips', 'On-Time %', 'Actions'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        color: '#6B7280',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                        borderBottom: '1px solid rgba(191,219,254,0.4)',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((driver, i) => (
                  <tr
                    key={driver.id}
                    style={{ borderBottom: '1px solid rgba(191,219,254,0.2)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(239,246,255,0.35)' }}
                  >
                    {/* Driver */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <DriverAvatar name={driver.name} index={i} />
                        <div>
                          <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F2A4A', margin: 0 }}>{driver.name}</p>
                          <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: '0.125rem 0 0' }}>{driver.homeBase}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                        <Phone style={{ width: '0.7rem', height: '0.7rem', color: '#9CA3AF' }} />
                        <span style={{ fontSize: '0.75rem', color: '#374151' }}>{driver.phone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Mail style={{ width: '0.7rem', height: '0.7rem', color: '#9CA3AF' }} />
                        <span style={{ fontSize: '0.7rem', color: '#6B7280' }}>{driver.email}</span>
                      </div>
                    </td>

                    {/* License */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <p style={{ fontSize: '0.75rem', color: '#374151', fontWeight: 500, margin: 0 }}>{driver.licenseNumber}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                        {isExpired(driver.licenseExpiry) && (
                          <AlertTriangle style={{ width: '0.7rem', height: '0.7rem', color: '#B91C1C' }} />
                        )}
                        <span style={{ fontSize: '0.7rem', color: isExpired(driver.licenseExpiry) ? '#B91C1C' : '#6B7280', fontWeight: isExpired(driver.licenseExpiry) ? 600 : 400 }}>
                          Exp: {driver.licenseExpiry}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <Badge variant={statusBadgeVariant(driver.status)} size="sm">{statusLabel(driver.status)}</Badge>
                    </td>

                    {/* Rating */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star style={{ width: '0.875rem', height: '0.875rem', color: '#D97706', fill: '#D97706' }} />
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>{driver.rating}</span>
                      </div>
                    </td>

                    {/* Trips */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>{driver.trips.toLocaleString()}</span>
                    </td>

                    {/* On-Time % */}
                    <td style={{ padding: '0.75rem 1rem', minWidth: '140px' }}>
                      <OnTimeBar value={driver.onTime} />
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/app/fleet/drivers/${driver.id}`)}
                      >
                        Profile
                        <ArrowRight style={{ width: '0.75rem', height: '0.75rem', marginLeft: '0.375rem' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
