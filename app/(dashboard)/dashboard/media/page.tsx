export default function MediaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Media</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Photos</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            Drop your photos here or click to browse
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upload Photos
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Supported formats: JPG, PNG. Max 5MB per image.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Videos & Reels</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Vimeo Integration</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect your Vimeo account to host and showcase your reels professionally.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vimeo Video URL or ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://vimeo.com/123456789"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Video
                </button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">External Embed</h3>
            <p className="text-gray-600 text-sm mb-4">
              Embed videos from YouTube or other platforms.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Embed URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://youtube.com/watch?v=..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Embed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
