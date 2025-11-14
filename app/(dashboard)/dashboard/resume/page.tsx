export default function ResumePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume101 Integration</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ This feature requires the <strong>resume101</strong> feature flag to be enabled.
            Available for Standard and Premium subscribers.
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Import Resume Data</h2>
        <p className="text-gray-600 mb-6">
          Connect with Resume101 to automatically import and sync your acting resume, including
          credits, training, and special skills.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-gray-600 mb-4">No resume data imported yet</p>
          <button
            disabled
            className="px-6 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
          >
            Import from Resume101
          </button>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">About Resume101 Integration</h3>
        <p className="text-blue-800 text-sm mb-4">
          Resume101 is a specialized service for creating professional acting resumes. When enabled,
          you can import your resume data directly into Actor Page 101.
        </p>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• Automatic credit synchronization</li>
          <li>• Import training and education</li>
          <li>• Sync special skills and talents</li>
          <li>• Keep your website always up-to-date</li>
        </ul>
      </div>
    </div>
  );
}
