import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(({ 
  className = '', 
  type = 'text', 
  error = '', 
  label = '', 
  required = false,
  disabled = false,
  placeholder = '',
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors';
  const errorClasses = error ? 'border-red focus:ring-red' : 'border-sky';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
  
  const inputClasses = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`;
  
  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        ref={ref}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <p className="form-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export { Input };
