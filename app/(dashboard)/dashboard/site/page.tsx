export default function SitePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Site Settings</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Site URL</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Site Slug
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="yourname"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="flex items-center text-gray-500">.actorpage101.site</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Your site will be available at: yourname.actorpage101.site
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Template</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border-2 border-blue-600 rounded-lg p-4 cursor-pointer">
            <div className="aspect-video bg-gray-200 rounded mb-2"></div>
            <p className="font-medium">Classic</p>
          </div>
          <div className="border rounded-lg p-4 cursor-pointer hover:border-blue-400">
            <div className="aspect-video bg-gray-200 rounded mb-2"></div>
            <p className="font-medium">Modern</p>
          </div>
          <div className="border rounded-lg p-4 cursor-pointer hover:border-blue-400">
            <div className="aspect-video bg-gray-200 rounded mb-2"></div>
            <p className="font-medium">Minimal</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Color Preset</h2>
        <div className="flex gap-4">
          <button className="w-12 h-12 rounded-full bg-blue-600 border-2 border-gray-900"></button>
          <button className="w-12 h-12 rounded-full bg-purple-600 border-2 border-transparent hover:border-gray-400"></button>
          <button className="w-12 h-12 rounded-full bg-green-600 border-2 border-transparent hover:border-gray-400"></button>
          <button className="w-12 h-12 rounded-full bg-red-600 border-2 border-transparent hover:border-gray-400"></button>
          <button className="w-12 h-12 rounded-full bg-gray-900 border-2 border-transparent hover:border-gray-400"></button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Publish</h2>
        <p className="text-gray-600 mb-4">
          Make your site live and accessible to the public.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Publish Site
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
