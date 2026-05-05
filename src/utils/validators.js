// Load Link Validation Functions
// Validators for phone numbers, KRA PIN, emails, and more

// Kenyan phone number validator
export const validateKenyanPhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check different valid formats
  const isValidFormat = 
    (cleaned.startsWith('254') && cleaned.length === 12) || // +254 XXX XXX XXX
    (cleaned.startsWith('07') && cleaned.length === 10) ||  // 07XX XXX XXX
    (cleaned.startsWith('01') && cleaned.length === 10);    // 01XX XXX XXX

  if (!isValidFormat) {
    return { 
      valid: false, 
      error: 'Invalid Kenyan phone number. Use format: +254 XXX XXX XXX, 07XX XXX XXX, or 01XX XXX XXX' 
    };
  }

  return { valid: true };
};

// KRA PIN validator
export const validateKRAPin = (pin) => {
  if (!pin || typeof pin !== 'string') {
    return { valid: false, error: 'KRA PIN is required' };
  }

  const cleaned = pin.replace(/\s/g, '').toUpperCase();
  
  // KRA PIN format: P + 9 digits + A/L (for individuals) or Y (for companies)
  const kraPinPattern = /^[P]\d{9}[A|L|Y]$/;
  
  if (!kraPinPattern.test(cleaned)) {
    return { 
      valid: false, 
      error: 'Invalid KRA PIN format. Should be P followed by 9 digits and ending with A/L/Y' 
    };
  }

  return { valid: true };
};

// Email validator
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(email.toLowerCase())) {
    return { valid: false, error: 'Invalid email address' };
  }

  return { valid: true };
};

// Required field validator
export const validateRequired = (value, fieldName = 'Field') => {
  if (value === null || value === undefined || value === '') {
    return { valid: false, error: `${fieldName} is required` };
  }

  if (typeof value === 'string' && value.trim() === '') {
    return { valid: false, error: `${fieldName} cannot be empty` };
  }

  return { valid: true };
};

// Number validator
export const validateNumber = (value, fieldName = 'Field', options = {}) => {
  const { min, max, integer = false } = options;

  if (value === null || value === undefined || value === '') {
    return { valid: false, error: `${fieldName} is required` };
  }

  const num = Number(value);
  
  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} must be a valid number` };
  }

  if (integer && !Number.isInteger(num)) {
    return { valid: false, error: `${fieldName} must be a whole number` };
  }

  if (min !== undefined && num < min) {
    return { valid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (max !== undefined && num > max) {
    return { valid: false, error: `${fieldName} must be at most ${max}` };
  }

  return { valid: true };
};

// Weight validator (in grams)
export const validateWeight = (grams, fieldName = 'Weight') => {
  const result = validateNumber(grams, fieldName, { min: 0 });
  
  if (!result.valid) {
    return result;
  }

  const weight = Number(grams);
  
  if (weight > 50000000) { // 50,000 kg max
    return { valid: false, error: `${fieldName} exceeds maximum allowed weight` };
  }

  return { valid: true };
};

// Vehicle registration number validator (Kenyan format)
export const validateVehicleRegistration = (registration) => {
  if (!registration || typeof registration !== 'string') {
    return { valid: false, error: 'Vehicle registration is required' };
  }

  const cleaned = registration.replace(/\s/g, '').toUpperCase();
  
  // Kenyan vehicle registration patterns:
  // KAA 123A, KAB 123B, KAC 123C, etc.
  const kenyanPattern = /^[K][A-Z]{2}\s?\d{3}[A-Z]$/;
  
  if (!kenyanPattern.test(cleaned)) {
    return { 
      valid: false, 
      error: 'Invalid vehicle registration. Use format: KAA 123A' 
    };
  }

  return { valid: true };
};

// ID number validator (Kenyan national ID)
export const validateKenyanId = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string') {
    return { valid: false, error: 'ID number is required' };
  }

  const cleaned = idNumber.replace(/\s/g, '');
  
  // Kenyan ID should be 7-8 digits
  const idPattern = /^\d{7,8}$/;
  
  if (!idPattern.test(cleaned)) {
    return { 
      valid: false, 
      error: 'Invalid Kenyan ID number. Should be 7-8 digits' 
    };
  }

  return { valid: true };
};

// Password validator
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }

  return { valid: true };
};

// URL validator
export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
};

// Shipment reference validator
export const validateShipmentReference = (reference) => {
  if (!reference || typeof reference !== 'string') {
    return { valid: false, error: 'Shipment reference is required' };
  }

  const cleaned = reference.replace(/\s/g, '').toUpperCase();
  
  // Should start with LL followed by year and numbers
  const referencePattern = /^LL-\d{4}-\d{4}$/;
  
  if (!referencePattern.test(cleaned)) {
    return { 
      valid: false, 
      error: 'Invalid shipment reference format. Use: LL-YYYY-NNNN' 
    };
  }

  return { valid: true };
};

// Coordinates validator (latitude, longitude)
export const validateCoordinates = (lat, lng) => {
  const latResult = validateNumber(lat, 'Latitude', { min: -90, max: 90 });
  if (!latResult.valid) return latResult;

  const lngResult = validateNumber(lng, 'Longitude', { min: -180, max: 180 });
  if (!lngResult.valid) return lngResult;

  return { valid: true };
};
