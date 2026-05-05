// Load Link Utility Functions
// Formatters for currency, dates, distances, weights, and more

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

// Currency formatter - KES and USD with proper symbols
export const formatCurrency = (amount, currency = 'KES') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '---';
  }

  const formatter = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

// Weight formatter - auto-scales between grams and kilograms
export const formatWeight = (grams) => {
  if (typeof grams !== 'number' || isNaN(grams)) {
    return '---';
  }

  if (grams < 1000) {
    return `${grams.toFixed(0)}g`;
  } else {
    return `${(grams / 1000).toFixed(2)}kg`;
  }
};

// Distance formatter - auto-scales between meters and kilometers
export const formatDistance = (meters) => {
  if (typeof meters !== 'number' || isNaN(meters)) {
    return '---';
  }

  if (meters < 1000) {
    return `${meters.toFixed(0)}m`;
  } else {
    return `${(meters / 1000).toFixed(2)}km`;
  }
};

// Relative time formatter - "3 hours ago", "in 2 days"
export const formatRelativeTime = (datetime) => {
  if (!datetime) return '---';
  
  return dayjs(datetime).fromNow();
};

// Date/time formatter with timezone support
export const formatDatetime = (isoString, format = 'DD/MM/YYYY HH:mm', timezone = 'Africa/Nairobi') => {
  if (!isoString) return '---';
  
  return dayjs(isoString).tz(timezone).format(format);
};

// Date only formatter
export const formatDate = (isoString, format = 'DD/MM/YYYY', timezone = 'Africa/Nairobi') => {
  if (!isoString) return '---';
  
  return dayjs(isoString).tz(timezone).format(format);
};

// Time only formatter
export const formatTime = (isoString, format = 'HH:mm', timezone = 'Africa/Nairobi') => {
  if (!isoString) return '---';
  
  return dayjs(isoString).tz(timezone).format(format);
};

// Phone number formatter for Kenyan numbers
export const formatPhoneNumber = (phone) => {
  if (!phone) return '---';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different formats
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  } else if (cleaned.startsWith('07') && cleaned.length === 10) {
    return `+254 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  } else if (cleaned.startsWith('01') && cleaned.length === 10) {
    return `+254 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if format doesn't match
};

// KRA PIN formatter
export const formatKRAPin = (pin) => {
  if (!pin) return '---';
  
  const cleaned = pin.replace(/\s/g, '').toUpperCase();
  
  if (cleaned.length === 11 && cleaned.startsWith('P')) {
    return `${cleaned.slice(0, 1)}${cleaned.slice(1, 5)}${cleaned.slice(5, 9)}${cleaned.slice(9, 11)}${cleaned.slice(11)}`;
  }
  
  return pin;
};

// Shipment reference formatter
export const formatShipmentReference = (reference) => {
  if (!reference) return '---';
  
  return reference.toUpperCase();
};

// Percentage formatter
export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '---';
  }
  
  return `${value.toFixed(decimals)}%`;
};

// Number formatter with thousands separator
export const formatNumber = (num, decimals = 0) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '---';
  }
  
  return new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

// Duration formatter (minutes to hours and minutes)
export const formatDuration = (minutes) => {
  if (typeof minutes !== 'number' || isNaN(minutes)) {
    return '---';
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  } else {
    return `${remainingMinutes}m`;
  }
};

// File size formatter
export const formatFileSize = (bytes) => {
  if (typeof bytes !== 'number' || isNaN(bytes)) {
    return '---';
  }
  
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};
