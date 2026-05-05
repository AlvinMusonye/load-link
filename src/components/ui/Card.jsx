import React from 'react';
import PropTypes from 'prop-types';

const Card = React.forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = React.forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`card-header ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const CardBody = React.forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`card-body ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const CardFooter = React.forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`card-body border-t border-sky ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Card, CardHeader, CardBody, CardFooter };
