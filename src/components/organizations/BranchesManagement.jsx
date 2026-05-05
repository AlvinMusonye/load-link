// Load Link Branches Management Component

import React, { useState, useEffect } from 'react';
import { useOrganizationsStore } from '../../stores/organizationsStore';
import { Card, CardHeader, CardBody, Button, Input, Badge, Modal, ModalContent, ModalHeader, ModalFooter } from '../ui';
import { Building2, MapPin, Phone, Mail, Plus, Edit2, Trash2, Star, Users } from 'lucide-react';

const BranchesManagement = () => {
  const { 
    branches, 
    isLoading, 
    error, 
    loadBranches, 
    createBranch, 
    updateBranch, 
    deleteBranch, 
    setBranchAsHeadquarters,
    clearError 
  } = useOrganizationsStore();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: {},
    phone: '',
    email: '',
    is_headquarters: false,
  });

  useEffect(() => {
    loadBranches();
  }, [loadBranches]);

  const resetForm = () => {
    setFormData({
      name: '',
      address: {},
      phone: '',
      email: '',
      is_headquarters: false,
    });
    setSelectedBranch(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (error) {
      clearError();
    }
  };

  const handleCreateBranch = async () => {
    try {
      await createBranch(formData);
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleEditBranch = (branch) => {
    setSelectedBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address || {},
      phone: branch.phone || '',
      email: branch.email || '',
      is_headquarters: branch.is_headquarters,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateBranch = async () => {
    try {
      await updateBranch(selectedBranch.id, formData);
      setIsEditModalOpen(false);
      resetForm();
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleDeleteBranch = async (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch? This action cannot be undone.')) {
      try {
        await deleteBranch(branchId);
      } catch (error) {
        // Error is handled by the store
      }
    }
  };

  const handleSetHeadquarters = async (branchId) => {
    try {
      await setBranchAsHeadquarters(branchId);
    } catch (error) {
      // Error is handled by the store
    }
  };

  const openCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    resetForm();
    clearError();
  };

  if (isLoading && branches.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Branches</h2>
          <p className="text-gray-600">Manage your organization's branches</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Branch
        </Button>
      </div>

      {/* Branches List */}
      {branches.length === 0 ? (
        <Card>
          <CardBody className="text-center p-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Branches Yet</h3>
            <p className="text-gray-600 mb-4">Create your first branch to get started</p>
            <Button onClick={openCreateModal}>
              <Plus className="h-4 w-4 mr-2" />
              Create Branch
            </Button>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <Card key={branch.id} className="hover:shadow-lg transition-shadow">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                      {branch.is_headquarters && (
                        <Badge className="status-confirmed mt-1">
                          <Star className="h-3 w-3 mr-1" />
                          Headquarters
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditBranch(branch)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    {!branch.is_headquarters && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteBranch(branch.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {branch.address?.city && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {branch.address.city}, {branch.address.country}
                    </div>
                  )}
                  
                  {branch.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {branch.phone}
                    </div>
                  )}
                  
                  {branch.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {branch.email}
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {branch.user_count || 0} users
                  </div>
                </div>

                {!branch.is_headquarters && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSetHeadquarters(branch.id)}
                      className="w-full"
                    >
                      <Star className="h-3 w-3 mr-2" />
                      Set as Headquarters
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Create Branch Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={closeModals}>
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold text-gray-900">Create New Branch</h3>
          </ModalHeader>
          
          <div className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Nairobi Branch"
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254700000000"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="branch@company.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <Input
                name="address.street"
                value={formData.address?.street || ''}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <Input
                  name="address.city"
                  value={formData.address?.city || ''}
                  onChange={handleInputChange}
                  placeholder="Nairobi"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <Input
                  name="address.postal_code"
                  value={formData.address?.postal_code || ''}
                  onChange={handleInputChange}
                  placeholder="00100"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <Input
                name="address.country"
                value={formData.address?.country || ''}
                onChange={handleInputChange}
                placeholder="Kenya"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_headquarters"
                name="is_headquarters"
                checked={formData.is_headquarters}
                onChange={handleInputChange}
                disabled={isLoading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_headquarters" className="ml-2 block text-sm text-gray-900">
                Set as headquarters (will replace current headquarters)
              </label>
            </div>
          </div>

          <ModalFooter>
            <Button
              onClick={closeModals}
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateBranch}
              disabled={isLoading || !formData.name}
            >
              {isLoading ? 'Creating...' : 'Create Branch'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Branch Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeModals}>
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold text-gray-900">Edit Branch</h3>
          </ModalHeader>
          
          <div className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <Input
                name="address.street"
                value={formData.address?.street || ''}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <Input
                  name="address.city"
                  value={formData.address?.city || ''}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <Input
                  name="address.postal_code"
                  value={formData.address?.postal_code || ''}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <Input
                name="address.country"
                value={formData.address?.country || ''}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <ModalFooter>
            <Button
              onClick={closeModals}
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateBranch}
              disabled={isLoading || !formData.name}
            >
              {isLoading ? 'Updating...' : 'Update Branch'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BranchesManagement;
