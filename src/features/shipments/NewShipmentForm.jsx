import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Plane,
  Ship,
  Train,
  Plus,
  Trash2,
  Check,
  Package,
  MapPin,
  User,
  Calendar,
  FileText,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react'
import { Button } from '../../components/ui'
import { Card, CardHeader, CardBody } from '../../components/ui'

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'Nairobi Traders Ltd' },
  { id: 'c2', name: 'Kampala Fresh Foods' },
  { id: 'c3', name: 'Kigali Tech Imports' },
  { id: 'c4', name: 'Mombasa Port Industries' },
  { id: 'c5', name: 'Dar es Salaam Distributors' },
  { id: 'c6', name: 'Nakuru Agri Export' },
]

const MOCK_CARRIERS = [
  { id: 'cr1', name: 'Trans Africa Logistics' },
  { id: 'cr2', name: 'East Africa Express' },
  { id: 'cr3', name: 'Great Lakes Freight' },
]

const EA_COUNTRIES = [
  'Kenya',
  'Uganda',
  'Tanzania',
  'Rwanda',
  'Burundi',
  'Ethiopia',
  'South Sudan',
]

const INCOTERMS_LIST = ['EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'DAP', 'DPU', 'DDP']

const TRANSPORT_MODES = [
  { key: 'ROAD', label: 'Road', Icon: Truck, desc: 'Truck / lorry freight' },
  { key: 'AIR', label: 'Air', Icon: Plane, desc: 'Air cargo & express' },
  { key: 'SEA', label: 'Sea', Icon: Ship, desc: 'Ocean & lake freight' },
  { key: 'RAIL', label: 'Rail', Icon: Train, desc: 'Railway freight' },
]

const STEPS = [
  { id: 1, label: 'Route & Customer', Icon: MapPin },
  { id: 2, label: 'Cargo Details', Icon: Package },
  { id: 3, label: 'Transport', Icon: Truck },
  { id: 4, label: 'Review & Submit', Icon: FileText },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatCurrency(val) {
  const n = Number(val)
  if (!n) return 'KES 0'
  return `KES ${n.toLocaleString('en-KE')}`
}

function formatWeight(grams) {
  const n = Number(grams)
  if (!n) return '0 kg'
  return `${(n / 1000).toLocaleString('en-KE', { maximumFractionDigits: 2 })} kg`
}

function emptyCargoItem() {
  return {
    id: Date.now(),
    description: '',
    quantity: '',
    weight: '',
    value: '',
    hazardous: false,
    tempControlled: false,
  }
}

// ─── Step Progress ─────────────────────────────────────────────────────────────
function StepProgress({ current }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((step, idx) => {
        const done = step.id < current
        const active = step.id === current
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  done
                    ? 'bg-blue-700 text-white'
                    : active
                    ? 'bg-blue-700 text-white ring-4 ring-blue-100'
                    : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium whitespace-nowrap ${
                  active ? 'text-blue-700' : done ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 mb-5 rounded transition-colors ${
                  step.id < current ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1: Route & Customer ──────────────────────────────────────────────────
function Step1({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="form-label">Customer *</label>
        <select
          value={data.customerId}
          onChange={(e) => onChange('customerId', e.target.value)}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="">Select a customer...</option>
          {MOCK_CUSTOMERS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Origin */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Origin
          </h3>
          <div>
            <label className="form-label">Country *</label>
            <select
              value={data.originCountry}
              onChange={(e) => onChange('originCountry', e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">Select country...</option>
              {EA_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">City *</label>
            <input
              type="text"
              value={data.originCity}
              onChange={(e) => onChange('originCity', e.target.value)}
              placeholder="e.g. Nairobi"
              className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Destination
          </h3>
          <div>
            <label className="form-label">Country *</label>
            <select
              value={data.destCountry}
              onChange={(e) => onChange('destCountry', e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">Select country...</option>
              {EA_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">City *</label>
            <input
              type="text"
              value={data.destCity}
              onChange={(e) => onChange('destCity', e.target.value)}
              placeholder="e.g. Mombasa"
              className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Transport Mode */}
      <div>
        <label className="form-label">Transport Mode *</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
          {TRANSPORT_MODES.map(({ key, label, Icon, desc }) => {
            const selected = data.mode === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange('mode', key)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selected
                    ? 'border-blue-600 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <Icon
                  className={`h-5 w-5 mb-2 ${selected ? 'text-blue-700' : 'text-gray-400'}`}
                />
                <p className={`text-sm font-semibold ${selected ? 'text-blue-700' : 'text-gray-700'}`}>
                  {label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="form-label">Notes</label>
        <textarea
          value={data.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          rows={3}
          placeholder="Any special instructions or notes for this shipment..."
          className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
        />
      </div>
    </div>
  )
}

// ─── Step 2: Cargo Details ─────────────────────────────────────────────────────
function Step2({ items, onAdd, onRemove, onItemChange }) {
  const totalWeight = items.reduce((sum, i) => sum + (Number(i.weight) * 1000 || 0), 0)
  const totalValue = items.reduce((sum, i) => sum + (Number(i.value) || 0), 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Cargo Items</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-700 text-white hover:bg-blue-800 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add Item
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-blue-100 bg-blue-50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-700">Item {idx + 1}</span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="form-label text-xs">Description *</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => onItemChange(item.id, 'description', e.target.value)}
                  placeholder="e.g. Electronics, Fresh Produce..."
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
              <div>
                <label className="form-label text-xs">Quantity *</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onItemChange(item.id, 'quantity', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
              <div>
                <label className="form-label text-xs">Weight (kg) *</label>
                <input
                  type="number"
                  value={item.weight}
                  onChange={(e) => onItemChange(item.id, 'weight', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
              <div>
                <label className="form-label text-xs">Value (KES) *</label>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => onItemChange(item.id, 'value', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => onItemChange(item.id, 'hazardous', !item.hazardous)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${
                    item.hazardous ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      item.hazardous ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-600">Hazardous</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => onItemChange(item.id, 'tempControlled', !item.tempControlled)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${
                    item.tempControlled ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      item.tempControlled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-600">Temperature Controlled</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Running totals */}
      <div
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.45)',
          borderRadius: '1rem',
        }}
        className="p-4 grid grid-cols-2 gap-4"
      >
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Total Weight</p>
          <p className="text-base font-bold text-gray-800">{formatWeight(totalWeight)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Total Value</p>
          <p className="text-base font-bold text-gray-800">{formatCurrency(totalValue)}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Transport ─────────────────────────────────────────────────────────
function Step3({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Carrier</label>
          <select
            value={data.carrierId}
            onChange={(e) => onChange('carrierId', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">Select carrier...</option>
            {MOCK_CARRIERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Incoterms</label>
          <select
            value={data.incoterms}
            onChange={(e) => onChange('incoterms', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">Select incoterms...</option>
            {INCOTERMS_LIST.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Pickup Date &amp; Time</label>
          <input
            type="datetime-local"
            value={data.pickupDate}
            onChange={(e) => onChange('pickupDate', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
        <div>
          <label className="form-label">Estimated Delivery Date &amp; Time</label>
          <input
            type="datetime-local"
            value={data.deliveryDate}
            onChange={(e) => onChange('deliveryDate', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          onClick={() => onChange('insurance', !data.insurance)}
          className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${
            data.insurance ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              data.insurance ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Cargo Insurance Required</p>
          <p className="text-xs text-gray-400">Insure cargo value during transit</p>
        </div>
      </div>
    </div>
  )
}

// ─── Step 4: Review ────────────────────────────────────────────────────────────
function Step4({ step1, step2, step3, submitted, fakeId }) {
  const customer = MOCK_CUSTOMERS.find((c) => c.id === step1.customerId)
  const carrier = MOCK_CARRIERS.find((c) => c.id === step3.carrierId)
  const totalValue = step2.reduce((s, i) => s + (Number(i.value) || 0), 0)

  const SectionRow = ({ label, value }) => (
    <div className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800 text-right max-w-xs">{value || '—'}</span>
    </div>
  )

  if (submitted) {
    return (
      <div className="py-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Shipment Created Successfully</h3>
          <p className="text-sm text-gray-500 mt-1">
            Your shipment has been submitted and assigned reference
          </p>
          <p className="text-2xl font-bold text-blue-700 mt-2">{fakeId}</p>
        </div>
        <Link to="/app/shipments">
          <Button variant="default" className="mt-2">
            Back to Shipments
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" /> Route &amp; Customer
          </p>
        </CardHeader>
        <CardBody>
          <SectionRow label="Customer" value={customer?.name} />
          <SectionRow
            label="Origin"
            value={[step1.originCity, step1.originCountry].filter(Boolean).join(', ')}
          />
          <SectionRow
            label="Destination"
            value={[step1.destCity, step1.destCountry].filter(Boolean).join(', ')}
          />
          <SectionRow label="Mode" value={step1.mode} />
          {step1.notes && <SectionRow label="Notes" value={step1.notes} />}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-600" /> Cargo ({step2.length}{' '}
            {step2.length === 1 ? 'item' : 'items'})
          </p>
        </CardHeader>
        <CardBody>
          {step2.map((item, idx) => (
            <div key={item.id} className="py-2 border-b border-gray-100 last:border-0">
              <p className="text-sm font-medium text-gray-800">
                {idx + 1}. {item.description || 'Unnamed'}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Qty: {item.quantity || 0} &bull; Weight: {item.weight || 0} kg &bull; Value:{' '}
                {formatCurrency(item.value)}
                {item.hazardous && ' • Hazardous'}
                {item.tempControlled && ' • Temp Controlled'}
              </p>
            </div>
          ))}
          <div className="pt-2 flex justify-between text-sm font-semibold text-gray-800">
            <span>Total Value</span>
            <span>{formatCurrency(totalValue)}</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" /> Transport
          </p>
        </CardHeader>
        <CardBody>
          <SectionRow label="Carrier" value={carrier?.name} />
          <SectionRow label="Incoterms" value={step3.incoterms} />
          <SectionRow
            label="Pickup"
            value={step3.pickupDate ? new Date(step3.pickupDate).toLocaleString('en-KE') : null}
          />
          <SectionRow
            label="Est. Delivery"
            value={step3.deliveryDate ? new Date(step3.deliveryDate).toLocaleString('en-KE') : null}
          />
          <SectionRow label="Insurance" value={step3.insurance ? 'Yes' : 'No'} />
        </CardBody>
      </Card>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function NewShipmentForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [fakeId] = useState(`LL-2025-0${Math.floor(43 + Math.random() * 50)}`)

  const [step1Data, setStep1Data] = useState({
    customerId: '',
    originCountry: '',
    originCity: '',
    destCountry: '',
    destCity: '',
    mode: 'ROAD',
    notes: '',
  })

  const [cargoItems, setCargoItems] = useState([emptyCargoItem()])

  const [step3Data, setStep3Data] = useState({
    carrierId: '',
    pickupDate: '',
    deliveryDate: '',
    incoterms: '',
    insurance: false,
  })

  const handleStep1Change = (key, val) => setStep1Data((p) => ({ ...p, [key]: val }))
  const handleStep3Change = (key, val) => setStep3Data((p) => ({ ...p, [key]: val }))

  const handleAddItem = () => setCargoItems((p) => [...p, emptyCargoItem()])
  const handleRemoveItem = (id) => setCargoItems((p) => p.filter((i) => i.id !== id))
  const handleItemChange = (id, key, val) =>
    setCargoItems((p) => p.map((i) => (i.id === id ? { ...i, [key]: val } : i)))

  const handleNext = () => {
    if (step < 4) setStep((s) => s + 1)
  }
  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/app/shipments')}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>
            New Shipment
          </h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Create a new freight shipment across East Africa
          </p>
        </div>
      </div>

      {/* Step progress */}
      {!submitted && <StepProgress current={step} />}

      {/* Card */}
      <Card>
        <CardHeader>
          {!submitted && (
            <div className="flex items-center gap-2">
              {(() => {
                const s = STEPS.find((s) => s.id === step)
                const Icon = s.Icon
                return (
                  <>
                    <Icon className="h-5 w-5 text-blue-600" />
                    <h2 className="text-base font-semibold" style={{ color: '#0F2A4A' }}>
                      {s.label}
                    </h2>
                  </>
                )
              })()}
            </div>
          )}
          {submitted && (
            <h2 className="text-base font-semibold text-gray-800">Shipment Submitted</h2>
          )}
        </CardHeader>
        <CardBody>
          {step === 1 && <Step1 data={step1Data} onChange={handleStep1Change} />}
          {step === 2 && (
            <Step2
              items={cargoItems}
              onAdd={handleAddItem}
              onRemove={handleRemoveItem}
              onItemChange={handleItemChange}
            />
          )}
          {step === 3 && <Step3 data={step3Data} onChange={handleStep3Change} />}
          {step === 4 && (
            <Step4
              step1={step1Data}
              step2={cargoItems}
              step3={step3Data}
              submitted={submitted}
              fakeId={fakeId}
            />
          )}
        </CardBody>
      </Card>

      {/* Navigation buttons */}
      {!submitted && (
        <div className="flex items-center justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/app/shipments">
              <Button variant="ghost">Cancel</Button>
            </Link>
            {step < 4 ? (
              <Button variant="default" onClick={handleNext} className="flex items-center gap-2">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="default" onClick={handleSubmit} className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Submit Shipment
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
