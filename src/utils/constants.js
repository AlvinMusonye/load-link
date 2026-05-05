// Load Link Constants
// Status codes, incoterms, mode types, and other application constants

// Shipment Status Constants
export const SHIPMENT_STATUS = {
  DRAFT: 'DRAFT',
  CONFIRMED: 'CONFIRMED',
  PICKUP_SCHEDULED: 'PICKUP_SCHEDULED',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  AT_CUSTOMS: 'AT_CUSTOMS',
  IN_WAREHOUSE: 'IN_WAREHOUSE',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  EXCEPTION: 'EXCEPTION',
  CANCELLED: 'CANCELLED',
};

// Shipment Status Labels
export const SHIPMENT_STATUS_LABELS = {
  [SHIPMENT_STATUS.DRAFT]: 'Draft',
  [SHIPMENT_STATUS.CONFIRMED]: 'Confirmed',
  [SHIPMENT_STATUS.PICKUP_SCHEDULED]: 'Pickup Scheduled',
  [SHIPMENT_STATUS.PICKED_UP]: 'Picked Up',
  [SHIPMENT_STATUS.IN_TRANSIT]: 'In Transit',
  [SHIPMENT_STATUS.AT_CUSTOMS]: 'At Customs',
  [SHIPMENT_STATUS.IN_WAREHOUSE]: 'In Warehouse',
  [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [SHIPMENT_STATUS.DELIVERED]: 'Delivered',
  [SHIPMENT_STATUS.EXCEPTION]: 'Exception',
  [SHIPMENT_STATUS.CANCELLED]: 'Cancelled',
};

// Transportation Modes
export const TRANSPORT_MODES = {
  ROAD: 'ROAD',
  AIR: 'AIR',
  SEA: 'SEA',
  RAIL: 'RAIL',
};

// Transport Mode Labels
export const TRANSPORT_MODE_LABELS = {
  [TRANSPORT_MODES.ROAD]: 'Road Freight',
  [TRANSPORT_MODES.AIR]: 'Air Freight',
  [TRANSPORT_MODES.SEA]: 'Sea Freight',
  [TRANSPORT_MODES.RAIL]: 'Rail Freight',
};

// Incoterms 2020
export const INCOTERMS = {
  EXW: 'EXW - Ex Works',
  FCA: 'FCA - Free Carrier',
  CPT: 'CPT - Carriage Paid To',
  CIP: 'CIP - Carriage and Insurance Paid To',
  DAP: 'DAP - Delivered at Place',
  DPU: 'DPU - Delivered at Place Unloaded',
  DDP: 'DDP - Delivered Duty Paid',
  FAS: 'FAS - Free Alongside Ship',
  FOB: 'FOB - Free On Board',
  CFR: 'CFR - Cost and Freight',
  CIF: 'CIF - Cost, Insurance and Freight',
};

// Vehicle Types
export const VEHICLE_TYPES = {
  TRUCK: 'TRUCK',
  VAN: 'VAN',
  MOTORCYCLE: 'MOTORCYCLE',
  TRAILER: 'TRAILER',
  CONTAINER: 'CONTAINER',
};

// Vehicle Type Labels
export const VEHICLE_TYPE_LABELS = {
  [VEHICLE_TYPES.TRUCK]: 'Truck',
  [VEHICLE_TYPES.VAN]: 'Van',
  [VEHICLE_TYPES.MOTORCYCLE]: 'Motorcycle',
  [VEHICLE_TYPES.TRAILER]: 'Trailer',
  [VEHICLE_TYPES.CONTAINER]: 'Container',
};

// Vehicle Status
export const VEHICLE_STATUS = {
  ACTIVE: 'ACTIVE',
  IDLE: 'IDLE',
  MAINTENANCE: 'MAINTENANCE',
  OFFLINE: 'OFFLINE',
  IN_TRANSIT: 'IN_TRANSIT',
};

// Currency Codes
export const CURRENCIES = {
  KES: 'KES',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
};

// Currency Symbols
export const CURRENCY_SYMBOLS = {
  [CURRENCIES.KES]: 'KSh',
  [CURRENCIES.USD]: '$',
  [CURRENCIES.EUR]: '€',
  [CURRENCIES.GBP]: '£',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: 'CASH',
  BANK_TRANSFER: 'BANK_TRANSFER',
  MPESA: 'MPESA',
  CHEQUE: 'CHEQUE',
  CREDIT_CARD: 'CREDIT_CARD',
};

// Payment Method Labels
export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH]: 'Cash',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
  [PAYMENT_METHODS.MPESA]: 'M-Pesa',
  [PAYMENT_METHODS.CHEQUE]: 'Cheque',
  [PAYMENT_METHODS.CREDIT_CARD]: 'Credit Card',
};

// Invoice Status
export const INVOICE_STATUS = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED',
};

// Invoice Status Labels
export const INVOICE_STATUS_LABELS = {
  [INVOICE_STATUS.DRAFT]: 'Draft',
  [INVOICE_STATUS.PENDING]: 'Pending',
  [INVOICE_STATUS.PAID]: 'Paid',
  [INVOICE_STATUS.OVERDUE]: 'Overdue',
  [INVOICE_STATUS.CANCELLED]: 'Cancelled',
};

// Document Types
export const DOCUMENT_TYPES = {
  WAYBILL: 'WAYBILL',
  INVOICE: 'INVOICE',
  RECEIPT: 'RECEIPT',
  POD: 'POD', // Proof of Delivery
  CUSTOMS_FORM: 'CUSTOMS_FORM',
  INSURANCE: 'INSURANCE',
  PHOTO: 'PHOTO',
  OTHER: 'OTHER',
};

// Document Type Labels
export const DOCUMENT_TYPE_LABELS = {
  [DOCUMENT_TYPES.WAYBILL]: 'Waybill',
  [DOCUMENT_TYPES.INVOICE]: 'Invoice',
  [DOCUMENT_TYPES.RECEIPT]: 'Receipt',
  [DOCUMENT_TYPES.POD]: 'Proof of Delivery',
  [DOCUMENT_TYPES.CUSTOMS_FORM]: 'Customs Form',
  [DOCUMENT_TYPES.INSURANCE]: 'Insurance',
  [DOCUMENT_TYPES.PHOTO]: 'Photo',
  [DOCUMENT_TYPES.OTHER]: 'Other',
};

// Exception Types
export const EXCEPTION_TYPES = {
  DELAY: 'DELAY',
  DAMAGE: 'DAMAGE',
  LOSS: 'LOSS',
  THEFT: 'THEFT',
  ACCIDENT: 'ACCIDENT',
  WEATHER: 'WEATHER',
  CUSTOMS: 'CUSTOMS',
  VEHICLE_BREAKDOWN: 'VEHICLE_BREAKDOWN',
};

// Exception Type Labels
export const EXCEPTION_TYPE_LABELS = {
  [EXCEPTION_TYPES.DELAY]: 'Delay',
  [EXCEPTION_TYPES.DAMAGE]: 'Damage',
  [EXCEPTION_TYPES.LOSS]: 'Loss',
  [EXCEPTION_TYPES.THEFT]: 'Theft',
  [EXCEPTION_TYPES.ACCIDENT]: 'Accident',
  [EXCEPTION_TYPES.WEATHER]: 'Weather',
  [EXCEPTION_TYPES.CUSTOMS]: 'Customs Issue',
  [EXCEPTION_TYPES.VEHICLE_BREAKDOWN]: 'Vehicle Breakdown',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  OPERATIONS_MANAGER: 'OPERATIONS_MANAGER',
  DISPATCHER: 'DISPATCHER',
  DRIVER: 'DRIVER',
  WAREHOUSE_STAFF: 'WAREHOUSE_STAFF',
  FINANCE: 'FINANCE',
  CUSTOMER_SERVICE: 'CUSTOMER_SERVICE',
  CUSTOMER: 'CUSTOMER',
};

// User Role Labels
export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.OPERATIONS_MANAGER]: 'Operations Manager',
  [USER_ROLES.DISPATCHER]: 'Dispatcher',
  [USER_ROLES.DRIVER]: 'Driver',
  [USER_ROLES.WAREHOUSE_STAFF]: 'Warehouse Staff',
  [USER_ROLES.FINANCE]: 'Finance',
  [USER_ROLES.CUSTOMER_SERVICE]: 'Customer Service',
  [USER_ROLES.CUSTOMER]: 'Customer',
};

// API Endpoints
export const API_ENDPOINTS = {
  SHIPMENTS: '/api/shipments',
  VEHICLES: '/api/fleet/vehicles',
  DRIVERS: '/api/fleet/drivers',
  CUSTOMERS: '/api/customers',
  INVOICES: '/api/billing/invoices',
  PAYMENTS: '/api/billing/payments',
  DOCUMENTS: '/api/documents',
  USERS: '/api/users',
  AUTH: '/api/auth',
};

// WebSocket Channels
export const WS_CHANNELS = {
  FLEET: 'ws/fleet/',
  NOTIFICATIONS: 'ws/notifications/',
  DASHBOARD: 'ws/dashboard/',
};

// Timezones
export const TIMEZONES = {
  NAIROBI: 'Africa/Nairobi',
  UTC: 'UTC',
  LONDON: 'Europe/London',
  NEW_YORK: 'America/New_York',
};

// File Size Limits (in bytes)
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  PDF: 10 * 1024 * 1024, // 10MB
  DOCUMENT: 20 * 1024 * 1024, // 20MB
};

// Pagination Defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// Cache Times (in seconds)
export const CACHE_TIMES = {
  SHIPMENT_LIST: 30,
  SHIPMENT_DETAIL: 60,
  FLEET_POSITIONS: 0, // Real-time
  INVOICE_LIST: 60,
  DASHBOARD_METRICS: 0, // Real-time
  CUSTOMER_LIST: 300, // 5 minutes
  ORG_CONFIG: 600, // 10 minutes
};
