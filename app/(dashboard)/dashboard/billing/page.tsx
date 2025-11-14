export default function BillingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Billing & Subscription</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold">Free Plan</p>
            <p className="text-gray-600">Basic features included</p>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upgrade Plan
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Standard Plan</h3>
          <p className="text-3xl font-bold mb-2">$9/month</p>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li>✓ All templates</li>
            <li>✓ Vimeo integration</li>
            <li>✓ Unlimited media</li>
            <li>✓ Resume import</li>
          </ul>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Select Standard
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-2 border-blue-600">
          <div className="text-center">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              MOST POPULAR
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-4 mt-2">Premium Plan</h3>
          <p className="text-3xl font-bold mb-2">$19/month</p>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li>✓ Everything in Standard</li>
            <li>✓ Audition tracker</li>
            <li>✓ Resume101 integration</li>
            <li>✓ Priority support</li>
            <li>✓ Advanced analytics</li>
          </ul>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Select Premium
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <p className="text-gray-600 mb-4">No payment method on file</p>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Add Payment Method
        </button>
      </div>

      <div className="mt-6 bg-gray-50 border rounded-lg p-6">
        <h3 className="font-semibold mb-2">Billing History</h3>
        <p className="text-gray-600 text-sm">No invoices yet</p>
      </div>
    </div>
  );
}
