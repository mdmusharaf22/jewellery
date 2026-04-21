'use client';

export default function SettingsContent() {
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
            <input
              type="text"
              defaultValue="Sree Ganesh Jewellers"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              defaultValue="admin@sriganeshjewellers.com"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Base URL</label>
            <input
              type="text"
              defaultValue="https://sree-ganesh-api.sriganeshjewellersofficial.workers.dev/api"
              className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50"
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">This is your backend API endpoint</p>
          </div>
          <div className="pt-4">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
