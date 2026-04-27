'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import Toast from '@/components/admin/Toast';

interface InvoiceSettings {
  gst_number: string;
  billing_address: string;
  invoice_text: string;
}

export default function SettingsContent() {
  const [settings, setSettings] = useState<InvoiceSettings>({
    gst_number: '',
    billing_address: '',
    invoice_text: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch invoice settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiRequest('/settings/invoice', {
        method: 'GET',
      });

      if (response.success && response.data) {
        setSettings({
          gst_number: response.data.gst_number || '',
          billing_address: response.data.billing_address || '',
          invoice_text: response.data.invoice_text || '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      setToast({ message: 'Failed to load settings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await apiRequest('/settings/invoice', {
        method: 'PUT',
        body: JSON.stringify({
          gst_number: settings.gst_number,
          billing_address: settings.billing_address,
          invoice_text: settings.invoice_text,
        }),
      });

      if (response.success) {
        setToast({ message: 'Invoice settings updated successfully', type: 'success' });
      } else {
        setToast({ message: response.message || 'Failed to save settings', type: 'error' });
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      setToast({ message: 'Failed to save settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Settings</h3>
        <p className="text-sm text-gray-600 mb-6">Configure your store invoice settings</p>
        
        <div className="space-y-6">
          {/* GST Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GST Number
            </label>
            <input
              type="text"
              value={settings.gst_number}
              onChange={(e) => setSettings({ ...settings, gst_number: e.target.value })}
              placeholder="22AAAAA0000A1Z5"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Billing Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Billing Address
            </label>
            <textarea
              value={settings.billing_address}
              onChange={(e) => setSettings({ ...settings, billing_address: e.target.value })}
              placeholder="Sree Ganesh Jewellers, 123 Main St, City, State, 123456"
              rows={3}
              className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Invoice Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Text
            </label>
            <textarea
              value={settings.invoice_text}
              onChange={(e) => setSettings({ ...settings, invoice_text: e.target.value })}
              placeholder="Thank you for shopping with Sree Ganesh Jewellers!"
              rows={4}
              className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">This text will appear at the bottom of invoices</p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
