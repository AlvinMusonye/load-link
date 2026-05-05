// Shipment-related types and interfaces

export interface Shipment {
  id: string;
  referenceNumber: string;
  status: ShipmentStatus;
  customerId: string;
  origin: Address;
  destination: Address;
  cargo: CargoItem[];
  assignedDriverId?: string;
  assignedVehicleId?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdAt: string;
  updatedAt: string;
  totalValue: number;
  currency: 'KES' | 'USD';
  incoterms: string;
  mode: TransportMode;
  carrierId?: string;
  trackingNumber?: string;
  notes?: string;
  documents?: ShipmentDocument[];
  events?: ShipmentEvent[];
}

export interface Address {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CargoItem {
  id: string;
  description: string;
  quantity: number;
  weight: number; // in grams
  volume: number; // in cubic centimeters
  value: number;
  hsCode?: string;
  packaging: string;
  hazardous: boolean;
  temperatureControlled: boolean;
}

export interface ShipmentDocument {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ShipmentEvent {
  id: string;
  type: EventType;
  description: string;
  location?: Address;
  timestamp: string;
  actor: string;
  metadata?: Record<string, any>;
}

export type ShipmentStatus = 
  | 'DRAFT'
  | 'CONFIRMED'
  | 'PICKUP_SCHEDULED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'AT_CUSTOMS'
  | 'IN_WAREHOUSE'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'CANCELLED';

export type TransportMode = 
  | 'ROAD'
  | 'AIR'
  | 'SEA'
  | 'RAIL';

export type DocumentType = 
  | 'WAYBILL'
  | 'INVOICE'
  | 'PACKING_LIST'
  | 'CERTIFICATE_OF_ORIGIN'
  | 'CUSTOMS_DECLARATION'
  | 'INSURANCE'
  | 'PHOTO'
  | 'OTHER';

export type EventType = 
  | 'CREATED'
  | 'CONFIRMED'
  | 'PICKUP_SCHEDULED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'CUSTOMS_CLEARED'
  | 'WAREHOUSE_RECEIVED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'CANCELLED'
  | 'NOTE_ADDED'
  | 'DOCUMENT_UPLOADED';

export interface ShipmentFilters {
  status?: ShipmentStatus[];
  customerId?: string;
  carrierId?: string;
  driverId?: string;
  mode?: TransportMode;
  createdAfter?: string;
  createdBefore?: string;
  search?: string;
}

export interface ShipmentListResponse {
  shipments: Shipment[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
