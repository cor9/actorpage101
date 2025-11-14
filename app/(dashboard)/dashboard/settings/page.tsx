export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Feature Flags</h2>
        <p className="text-gray-600 mb-4">
          Feature flags control access to optional premium features based on your subscription.
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Audition Tracker</p>
              <p className="text-sm text-gray-600">Track your auditions and callbacks</p>
            </div>
            <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm">
              Disabled
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Resume101</p>
              <p className="text-sm text-gray-600">Import and sync with Resume101</p>
            </div>
            <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm">
              Disabled
            </span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Upgrade to Premium to enable these features.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Permanently delete your account and all associated data.
        </p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Delete Account
        </button>
      </div>
    </div>
  );
}
