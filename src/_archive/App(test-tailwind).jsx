export default function App() {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 p-8 space-y-8 font-sans">
        <h1 className="text-4xl font-bold text-indigo-600">🎨 Tailwind UI Showcase</h1>
  
        <p className="text-lg">
          This layout is styled with <span className="font-semibold text-green-600">Tailwind CSS</span>.
        </p>
  
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow transition-all">
          Click Me
        </button>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border border-pink-400 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-pink-600 font-semibold mb-2">Card A</h2>
            <p className="text-sm">Hover me!</p>
          </div>
          <div className="bg-white border border-yellow-400 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-yellow-600 font-semibold mb-2">Card B</h2>
            <p className="text-sm">I'm responsive.</p>
          </div>
          <div className="bg-white border border-blue-400 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-blue-600 font-semibold mb-2">Card C</h2>
            <p className="text-sm">Flexible layout.</p>
          </div>
          <div className="bg-white border border-green-400 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-green-600 font-semibold mb-2">Card D</h2>
            <p className="text-sm">Beautiful UI.</p>
          </div>
        </div>
  
        <footer className="text-sm text-gray-500 pt-12">
          © 2025 Tailwind Test UI
        </footer>
      </div>
    );
  }
  