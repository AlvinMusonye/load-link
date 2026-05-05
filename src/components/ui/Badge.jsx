import React from 'react';
import PropTypes from 'prop-types';
import { SHIPMENT_STATUS_LABELS, SHIPMENT_STATUS } from '../../utils/constants.js';

const Badge = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-brand-blue text-white',
    secondary: 'bg-sky text-primary',
    success: 'bg-green text-white',
    warning: 'bg-amber text-white',
    error: 'bg-red text-white',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

const StatusBadge = ({ status, className = '', ...props }) => {
  if (!status) return null;
  
  const getVariantForStatus = (status) => {
    switch (status) {
      case SHIPMENT_STATUS.DRAFT:
        return 'default';
      case SHIPMENT_STATUS.CONFIRMED:
      case SHIPMENT_STATUS.IN_TRANSIT:
        return 'primary';
      case SHIPMENT_STATUS.PICKUP_SCHEDULED:
        return 'secondary';
      case SHIPMENT_STATUS.PICKED_UP:
        return 'primary';
      case SHIPMENT_STATUS.AT_CUSTOMS:
        return 'warning';
      case SHIPMENT_STATUS.IN_WAREHOUSE:
        return 'secondary';
      case SHIPMENT_STATUS.OUT_FOR_DELIVERY:
        return 'warning';
      case SHIPMENT_STATUS.DELIVERED:
        return 'success';
      case SHIPMENT_STATUS.EXCEPTION:
        return 'error';
      case SHIPMENT_STATUS.CANCELLED:
        return 'default';
      default:
        return 'default';
    }
  };
  
  const variant = getVariantForStatus(status);
  const label = SHIPMENT_STATUS_LABELS[status] || status;
  
  return (
    <Badge variant={variant} size="sm" className={`status-badge-${status.toLowerCase()} ${className}`} {...props}>
      {label}
    </Badge>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(SHIPMENT_STATUS)).isRequired,
  className: PropTypes.string,
};

export { Badge, StatusBadge };
