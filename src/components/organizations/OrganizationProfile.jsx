// Load Link Organization Profile Component

import React, { useState, useEffect } from 'react';
import { useOrganizationsStore } from '../../stores/organizationsStore';
import { Card, CardHeader, CardBody, Button, Input, Badge } from '../ui';
import { Building2, MapPin, Phone, Mail, Globe, Edit2, Save, X, Upload, Camera } from 'lucide-react';

const OrganizationProfile = () => {
  const { 
    myOrganization, 
    isLoading, 
    error, 
    updateMyOrganization, 
    uploadOrganizationLogo,
    clearError 
  } = useOrganizationsStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    if (myOrganization) {
      setEditForm({
        name: myOrganization.name,
        email: myOrganization.email || '',
        phone: myOrganization.phone || '',
        website: myOrganization.website || '',
        kra_pin: myOrganization.kra_pin || '',
        address: myOrganization.address || {},
        country: myOrganization.country || '',
        timezone: myOrganization.timezone || '',
        currency: myOrganization.currency || '',
      });
    }
  }, [myOrganization]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setEditForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (error) {
      clearError();
    }
  };

  const handleSave = async () => {
    try {
      await updateMyOrganization(editForm);
      setIsEditing(false);
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleCancel = () => {
    if (myOrganization) {
      setEditForm({
        name: myOrganization.name,
        email: myOrganization.email || '',
        phone: myOrganization.phone || '',
        website: myOrganization.website || '',
        kra_pin: myOrganization.kra_pin || '',
        address: myOrganization.address || {},
        country: myOrganization.country || '',
        timezone: myOrganization.timezone || '',
        currency: myOrganization.currency || '',
      });
    }
    setIsEditing(false);
    clearError();
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) return;
    
    setIsUploadingLogo(true);
    try {
      await uploadOrganizationLogo(logoFile);
      setLogoFile(null);
    } catch (error) {
      // Error is handled by the store
    } finally {
      setIsUploadingLogo(false);
    }
  };

  if (isLoading && !myOrganization) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!myOrganization) {
    return (
      <Card>
        <CardBody className="text-center p-8">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Organization Found</h3>
          <p className="text-gray-600">You are not assigned to any organization.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Organization Header */}
      <Card>
        <CardBody className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="relative">
                {myOrganization.logo || myOrganization.logo_url ? (
                  <img
                    src={myOrganization.logo_url || myOrganization.logo}
                    alt={myOrganization.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                )}
                
                {/* Logo Upload Button */}
                <div className="absolute -bottom-2 -right-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <div className="bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700">
                      <Camera className="h-3 w-3" />
                    </div>
                  </label>
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{myOrganization.name}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge className={myOrganization.is_active ? 'status-delivered' : 'status-exception'}>
                    {myOrganization.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {myOrganization.branch_count || 0} branches • {myOrganization.user_count || 0} users
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          
          {/* Logo Upload Status */}
          {logoFile && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">New logo selected</p>
                  <p className="text-xs text-blue-700">{logoFile.name}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleLogoUpload}
                    disabled={isUploadingLogo}
                    size="sm"
                  >
                    {isUploadingLogo ? 'Uploading...' : 'Upload'}
                  </Button>
                  <Button
                    onClick={() => setLogoFile(null)}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Organization Details */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Organization Details</h2>
        </CardHeader>
        <CardBody>
          {error && (
            <div className="mb-4 p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                {isEditing ? (
                  <Input
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <p className="text-gray-900">{myOrganization.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {myOrganization.email || 'Not set'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <Input
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {myOrganization.phone || 'Not set'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                {isEditing ? (
                  <Input
                    name="website"
                    value={editForm.website}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    {myOrganization.website ? (
                      <a href={myOrganization.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                        {myOrganization.website}
                      </a>
                    ) : (
                      'Not set'
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Location & Configuration */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Location & Configuration</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                {isEditing ? (
                  <select
                    name="country"
                    value={editForm.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  >
                    <option value="KE">Kenya</option>
                    <option value="UG">Uganda</option>
                    <option value="TZ">Tanzania</option>
                    <option value="RW">Rwanda</option>
                  </select>
                ) : (
                  <div className="flex items-center text-gray-900">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {myOrganization.country}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                {isEditing ? (
                  <select
                    name="currency"
                    value={editForm.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  >
                    <option value="KES">KES</option>
                    <option value="UGX">UGX</option>
                    <option value="TZS">TZS</option>
                    <option value="RWF">RWF</option>
                    <option value="USD">USD</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{myOrganization.currency}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                {isEditing ? (
                  <select
                    name="timezone"
                    value={editForm.timezone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  >
                    <option value="Africa/Nairobi">Africa/Nairobi</option>
                    <option value="Africa/Kampala">Africa/Kampala</option>
                    <option value="Africa/Dar_es_Salaam">Africa/Dar_es_Salaam</option>
                    <option value="Africa/Kigali">Africa/Kigali</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{myOrganization.timezone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KRA PIN</label>
                {isEditing ? (
                  <Input
                    name="kra_pin"
                    value={editForm.kra_pin}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <p className="text-gray-900">{myOrganization.kra_pin || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                {isEditing ? (
                  <Input
                    name="address.street"
                    value={editForm.address?.street || ''}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <p className="text-gray-900">{myOrganization.address?.street || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                {isEditing ? (
                  <Input
                    name="address.city"
                    value={editForm.address?.city || ''}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <p className="text-gray-900">{myOrganization.address?.city || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                {isEditing ? (
                  <Input
                    name="address.postal_code"
                    value={editForm.address?.postal_code || ''}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <p className="text-gray-900">{myOrganization.address?.postal_code || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Country</label>
                {isEditing ? (
                  <Input
                    name="address.country"
                    value={editForm.address?.country || ''}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                ) : (
                  <p className="text-gray-900">{myOrganization.address?.country || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default OrganizationProfile;
