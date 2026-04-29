'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { api } from '@/lib/api';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

interface CustomerDetails extends Customer {
  profile?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: string;
  };
  activity?: {
    total_orders: number;
    items_in_cart: number;
    saved_favourites: number;
  };
  [key: string]: any;
}

export default function CustomersContent() {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  // Fetch customers list on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/customers/auth/admin/all');
      if (response.success && response.data) {
        setCustomers(response.data);
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async (customerId: string) => {
    setViewLoading(true);
    try {
      const response = await api.get(`/customers/auth/admin/${customerId}`);
      if (response.success && response.data) {
        setSelectedCustomer(response.data);
        setShowViewModal(true);
      }
    } catch (error) {

    } finally {
      setViewLoading(false);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Customer Name',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value || 'N/A'}</div>
          <div className="text-xs text-gray-500">{row.email || 'N/A'}</div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">{value || 'N/A'}</div>
      ),
    },
    {
      key: 'address',
      label: 'Address',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value || 'N/A'}</div>
      ),
    },
    {
      key: 'created_at',
      label: 'Join Date',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">{value ? new Date(value).toLocaleDateString() : 'N/A'}</div>
      ),
    },
  ];

  const handleView = (customer: Customer) => {
    fetchCustomerDetails(customer.id);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedCustomer(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Customer Database</h3>
        <p className="text-sm text-gray-500 mt-1">Manage customer information and history</p>
      </div>

      <DataTable
        columns={columns}
        data={customers}
        loading={loading}
        onView={handleView}
        itemsPerPage={10}
        emptyMessage="No customers found"
      />

      {/* Customer View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Customer Details</h3>
              <button
                onClick={closeViewModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {viewLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              ) : selectedCustomer ? (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Customer ID</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedCustomer.profile?.id || selectedCustomer.id || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Name</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedCustomer.profile?.name || selectedCustomer.name || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedCustomer.profile?.email || selectedCustomer.email || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedCustomer.profile?.phone || selectedCustomer.phone || 'N/A'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedCustomer.profile?.address || selectedCustomer.address || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Join Date</label>
                        <p className="text-sm text-gray-900 mt-1">
                          {selectedCustomer.profile?.created_at || selectedCustomer.created_at 
                            ? new Date(selectedCustomer.profile?.created_at || selectedCustomer.created_at).toLocaleString() 
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Statistics */}
                  {selectedCustomer.activity && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Activity Statistics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-gray-500">Total Orders</label>
                          <p className="text-2xl font-bold text-blue-600 mt-1">{selectedCustomer.activity.total_orders || 0}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-gray-500">Items in Cart</label>
                          <p className="text-2xl font-bold text-orange-600 mt-1">{selectedCustomer.activity.items_in_cart || 0}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-gray-500">Saved Favourites</label>
                          <p className="text-2xl font-bold text-green-600 mt-1">{selectedCustomer.activity.saved_favourites || 0}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Fields */}
                  {Object.keys(selectedCustomer).filter(key => 
                    !['id', 'name', 'email', 'phone', 'address', 'created_at', 'profile', 'activity'].includes(key)
                  ).length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(selectedCustomer)
                          .filter(([key]) => !['id', 'name', 'email', 'phone', 'address', 'created_at', 'profile', 'activity'].includes(key))
                          .map(([key, value]) => (
                            <div key={key}>
                              <label className="text-sm font-medium text-gray-500 capitalize">{key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}</label>
                              <p className="text-sm text-gray-900 mt-1">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No customer data available</p>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
