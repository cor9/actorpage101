export default function AuditionsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Audition Tracker</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ This feature requires the <strong>audition_tracker</strong> feature flag to be enabled.
            Upgrade to Premium to access the audition tracker.
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Auditions</h2>
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
          >
            Add Audition
          </button>
        </div>

        <div className="text-center py-12 text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>Upgrade to Premium to track your auditions</p>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">About Audition Tracker</h3>
        <p className="text-blue-800 text-sm mb-4">
          Keep track of all your auditions, callbacks, and bookings in one place. Monitor your
          success rate and see patterns in your audition history.
        </p>
        <ul className="space-y-2 text-blue-800 text-sm mb-4">
          <li>• Track audition dates and outcomes</li>
          <li>• Record casting offices and representatives</li>
          <li>• Monitor callback and booking rates</li>
          <li>• Export your audition history</li>
        </ul>
      </div>
    </div>
  );
}
