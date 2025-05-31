import { PlanProvider } from './components/PlanContext';
import OptionRow from './components/OptionRow';

export default function App() {
  return (
    <PlanProvider>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-indigo-600">
          Testing OptionRow 1.1
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
      </div>
    </PlanProvider>
  );
}
