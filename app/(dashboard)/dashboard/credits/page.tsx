export default function CreditsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Credits</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Credits</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Credit
          </button>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <form className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Select...</option>
                  <option>TV</option>
                  <option>FILM</option>
                  <option>COMMERCIAL</option>
                  <option>THEATRE</option>
                  <option>VOICE OVER</option>
                  <option>NEW MEDIA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project
                </label>
                <input
                  type="text"
                  placeholder="Project name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Character name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Director
                </label>
                <input
                  type="text"
                  placeholder="Director name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  placeholder="2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <input
                  type="text"
                  placeholder="Additional info"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Credit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Resume101 Integration</h3>
        <p className="text-blue-800 text-sm mb-4">
          Premium users with Resume101 enabled can import credits directly from their resume.
        </p>
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100">
          Import from Resume101
        </button>
      </div>
    </div>
  );
}
