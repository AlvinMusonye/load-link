// Load Link Modal Component

import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const ModalContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

const ModalHeader = ({ children, className = '' }) => {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

const ModalFooter = ({ children, className = '' }) => {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 flex justify-end space-x-3 ${className}`}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { Modal, ModalContent, ModalHeader, ModalFooter };
