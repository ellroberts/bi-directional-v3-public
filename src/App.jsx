import { PlanProvider } from './components/PlanContext';
import OptionRow from './components/OptionRow';

export default function App() {
  return (
    <PlanProvider>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-indigo-600">
          Testing OptionRow 3.0
        </h1>
        <OptionRow
          groupId="test-group"
          option={{
            id: 'opt-1',
            name: 'Sample Option',
            price: 9.99,
            qty: 3,
            min: 1,
          }}
        />
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
      </div>
    </PlanProvider>
  );
}

