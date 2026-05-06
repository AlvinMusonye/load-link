import { useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Upload,
  Download,
  Eye,
  Trash2,
  FileText,
  File,
  FileBadge,
  FileCheck,
  FileArchive,
  Image,
  AlertTriangle,
  Plus,
  X,
  CheckCircle,
} from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/ui'
import { Button } from '../../components/ui'

// ─── Constants ────────────────────────────────────────────────────────────────
const DOC_TYPES = [
  { key: 'WAYBILL', label: 'Waybill' },
  { key: 'INVOICE', label: 'Commercial Invoice' },
  { key: 'PACKING_LIST', label: 'Packing List' },
  { key: 'CERTIFICATE_OF_ORIGIN', label: 'Certificate of Origin' },
  { key: 'CUSTOMS_DECLARATION', label: 'Customs Declaration' },
  { key: 'INSURANCE', label: 'Insurance Certificate' },
  { key: 'PHOTO', label: 'Photo / Image' },
  { key: 'OTHER', label: 'Other' },
]

const DOC_TYPE_COLORS = {
  WAYBILL: 'bg-blue-100 text-blue-700',
  INVOICE: 'bg-violet-100 text-violet-700',
  PACKING_LIST: 'bg-cyan-100 text-cyan-700',
  CERTIFICATE_OF_ORIGIN: 'bg-emerald-100 text-emerald-700',
  CUSTOMS_DECLARATION: 'bg-amber-100 text-amber-700',
  INSURANCE: 'bg-orange-100 text-orange-700',
  PHOTO: 'bg-pink-100 text-pink-700',
  OTHER: 'bg-gray-100 text-gray-600',
}

// ─── Initial documents ────────────────────────────────────────────────────────
const INITIAL_DOCS = [
  {
    id: 'd1',
    name: 'Waybill.pdf',
    type: 'WAYBILL',
    size: '245 KB',
    uploadedBy: 'John Admin',
    uploadedAt: '2025-05-01T09:15:00Z',
    url: '#',
  },
  {
    id: 'd2',
    name: 'Commercial Invoice.pdf',
    type: 'INVOICE',
    size: '128 KB',
    uploadedBy: 'John Admin',
    uploadedAt: '2025-05-01T09:20:00Z',
    url: '#',
  },
  {
    id: 'd3',
    name: 'Packing List.pdf',
    type: 'PACKING_LIST',
    size: '98 KB',
    uploadedBy: 'John Admin',
    uploadedAt: '2025-05-01T09:22:00Z',
    url: '#',
  },
  {
    id: 'd4',
    name: 'KRA Declaration.pdf',
    type: 'CUSTOMS_DECLARATION',
    size: '312 KB',
    uploadedBy: 'Grace Okeyo',
    uploadedAt: '2025-05-02T11:05:00Z',
    url: '#',
  },
  {
    id: 'd5',
    name: 'Insurance Certificate.pdf',
    type: 'INSURANCE',
    size: '187 KB',
    uploadedBy: 'John Admin',
    uploadedAt: '2025-05-02T11:30:00Z',
    url: '#',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function DocTypeLabel({ typeKey }) {
  const type = DOC_TYPES.find((t) => t.key === typeKey)
  const colorClass = DOC_TYPE_COLORS[typeKey] || DOC_TYPE_COLORS.OTHER
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {type?.label || typeKey}
    </span>
  )
}

function DocIcon({ type }) {
  const cls = 'h-5 w-5'
  switch (type) {
    case 'PHOTO':
      return <Image className={`${cls} text-pink-500`} />
    case 'WAYBILL':
      return <FileCheck className={`${cls} text-blue-500`} />
    case 'INVOICE':
      return <FileBadge className={`${cls} text-violet-500`} />
    case 'INSURANCE':
      return <FileArchive className={`${cls} text-orange-500`} />
    case 'CUSTOMS_DECLARATION':
      return <AlertTriangle className={`${cls} text-amber-500`} />
    default:
      return <FileText className={`${cls} text-gray-400`} />
  }
}

// ─── Upload zone ──────────────────────────────────────────────────────────────
function UploadZone({ onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length) onFilesSelected(files)
  }

  const handleChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length) onFilesSelected(files)
    e.target.value = ''
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-3">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
            isDragging ? 'bg-blue-100' : 'bg-blue-50'
          }`}
        >
          <Upload className="h-7 w-7 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">
            Drop files here or{' '}
            <span className="text-blue-600 hover:text-blue-800">click to browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supports PDF, JPG, PNG, DOC, DOCX, XLS — max 20 MB per file
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Pending upload row ───────────────────────────────────────────────────────
function PendingUploadItem({ file, docType, onTypeChange, onRemove, onConfirm }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50">
      <File className="h-5 w-5 text-blue-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
        <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
      </div>
      <select
        value={docType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-2 py-1.5 border border-blue-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
      >
        <option value="">Select type...</option>
        {DOC_TYPES.map((t) => (
          <option key={t.key} value={t.key}>
            {t.label}
          </option>
        ))}
      </select>
      <button
        onClick={onConfirm}
        disabled={!docType}
        className="p-1.5 rounded-lg bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        title="Upload"
      >
        <CheckCircle className="h-4 w-4" />
      </button>
      <button
        onClick={onRemove}
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        title="Remove"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteModal({ doc, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.45)',
          borderRadius: '1rem',
        }}
        className="w-full max-w-sm p-6 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-800">Delete Document</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete{' '}
          <span className="font-medium text-gray-800">{doc?.name}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:border-gray-300 bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ShipmentDocuments() {
  const { id } = useParams()
  const navigate = useNavigate()
  const shipmentId = id || 'LL-2025-042'

  const [documents, setDocuments] = useState(INITIAL_DOCS)
  const [pendingFiles, setPendingFiles] = useState([])
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [typeFilter, setTypeFilter] = useState('ALL')

  // Handle new files dropped / selected
  const handleFilesSelected = (files) => {
    const newPending = files.map((f) => ({
      id: `p-${Date.now()}-${Math.random()}`,
      file: f,
      docType: '',
    }))
    setPendingFiles((p) => [...p, ...newPending])
  }

  const handlePendingTypeChange = (pendingId, type) => {
    setPendingFiles((p) => p.map((pf) => (pf.id === pendingId ? { ...pf, docType: type } : pf)))
  }

  const handlePendingRemove = (pendingId) => {
    setPendingFiles((p) => p.filter((pf) => pf.id !== pendingId))
  }

  const handlePendingConfirm = (pendingId) => {
    const pending = pendingFiles.find((pf) => pf.id === pendingId)
    if (!pending || !pending.docType) return

    const newDoc = {
      id: `d-${Date.now()}`,
      name: pending.file.name,
      type: pending.docType,
      size: `${(pending.file.size / 1024).toFixed(0)} KB`,
      uploadedBy: 'Current User',
      uploadedAt: new Date().toISOString(),
      url: '#',
    }
    setDocuments((d) => [newDoc, ...d])
    setPendingFiles((p) => p.filter((pf) => pf.id !== pendingId))
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    setDocuments((d) => d.filter((doc) => doc.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const filteredDocs =
    typeFilter === 'ALL' ? documents : documents.filter((d) => d.type === typeFilter)

  const typeCounts = DOC_TYPES.reduce((acc, t) => {
    acc[t.key] = documents.filter((d) => d.type === t.key).length
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/app/shipments/${shipmentId}`)}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>
              {shipmentId} — Documents
            </h1>
            <p className="text-sm mt-0.5" style={{ color: '#6B7280' }}>
              Manage all documents for this shipment
            </p>
          </div>
        </div>
        <Link to={`/app/shipments/${shipmentId}`}>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700 bg-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Shipment
          </button>
        </Link>
      </div>

      {/* Stats row */}
      <div
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.45)',
          borderRadius: '1rem',
        }}
        className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-700">{documents.length}</p>
          <p className="text-xs text-gray-500 mt-0.5">Total Documents</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-violet-700">
            {typeCounts['INVOICE'] || 0}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Invoices</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-600">
            {typeCounts['CUSTOMS_DECLARATION'] || 0}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Customs Docs</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-700">
            {typeCounts['INSURANCE'] || 0}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Insurance</p>
        </div>
      </div>

      {/* Upload area */}
      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#0F2A4A' }}>
            <Upload className="h-4 w-4 text-blue-600" /> Upload Documents
          </h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <UploadZone onFilesSelected={handleFilesSelected} />

          {/* Pending uploads */}
          {pendingFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Pending Upload ({pendingFiles.length})
              </p>
              {pendingFiles.map((pf) => (
                <PendingUploadItem
                  key={pf.id}
                  file={pf.file}
                  docType={pf.docType}
                  onTypeChange={(type) => handlePendingTypeChange(pf.id, type)}
                  onRemove={() => handlePendingRemove(pf.id)}
                  onConfirm={() => handlePendingConfirm(pf.id)}
                />
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Documents table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold" style={{ color: '#0F2A4A' }}>
              Uploaded Documents
              <span className="ml-2 text-xs font-normal text-gray-400">
                ({filteredDocs.length})
              </span>
            </h2>

            {/* Type filter */}
            <div className="flex items-center gap-1 flex-wrap justify-end">
              <button
                onClick={() => setTypeFilter('ALL')}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === 'ALL'
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                All
              </button>
              {DOC_TYPES.filter((t) => (typeCounts[t.key] || 0) > 0).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTypeFilter(t.key)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    typeFilter === t.key
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead style={{ backgroundColor: '#EFF6FF' }}>
              <tr>
                {['Document', 'Type', 'Size', 'Uploaded By', 'Date', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider ${
                      h === 'Actions' ? 'text-right' : 'text-left'
                    }`}
                    style={{ color: '#6B7280' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm text-gray-500">No documents found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Upload documents using the area above
                    </p>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-blue-50 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <DocIcon type={doc.type} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#374151' }}>
                            {doc.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <DocTypeLabel typeKey={doc.type} />
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: '#6B7280' }}>
                      {doc.size}
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: '#374151' }}>
                      {doc.uploadedBy}
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: '#374151' }}>
                      {formatDateTime(doc.uploadedAt)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          title="View"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          title="Download"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => setDeleteTarget(doc)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <DeleteModal
          doc={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}
