import React, { useState, useMemo, useCallback } from 'react';
import { Expat, FinalStatus, OrderStatus } from './types';
import Dashboard from './components/Dashboard';
import ExpatSheet from './components/ExpatSheet';

const INITIAL_DATA: Expat[] = [
  {
    id: crypto.randomUUID(),
    expatName: 'John Doe',
    arrivalDate: '2024-07-20',
    businessCard: OrderStatus.ORDERED,
    iphone: OrderStatus.ORDERED,
    simCard: OrderStatus.NOT_ORDERED,
    hotel: OrderStatus.ORDERED,
    driver: 'Budi Santoso',
    car: 'Toyota Avanza',
    handoverDate: '2024-07-22',
    finalStatus: FinalStatus.IN_PROGRESS,
    notes: 'Needs SIM card activation assistance.'
  },
  {
    id: crypto.randomUUID(),
    expatName: 'Jane Smith',
    arrivalDate: '2024-07-15',
    businessCard: OrderStatus.ORDERED,
    iphone: OrderStatus.ORDERED,
    simCard: OrderStatus.ORDERED,
    hotel: OrderStatus.ORDERED,
    driver: 'Eko Wijoyo',
    car: 'Honda CR-V',
    handoverDate: '2024-07-16',
    finalStatus: FinalStatus.COMPLETED,
    notes: 'All items delivered successfully.'
  },
    {
    id: crypto.randomUUID(),
    expatName: 'Peter Jones',
    arrivalDate: '2024-08-01',
    businessCard: OrderStatus.NOT_ORDERED,
    iphone: OrderStatus.NOT_ORDERED,
    simCard: OrderStatus.NOT_ORDERED,
    hotel: OrderStatus.NOT_ORDERED,
    driver: '',
    car: '',
    handoverDate: '',
    finalStatus: FinalStatus.PENDING,
    notes: 'Awaiting arrival to start procurement.'
  },
];


const App: React.FC = () => {
  const [expats, setExpats] = useState<Expat[]>(INITIAL_DATA);
  const [filterArrivalDate, setFilterArrivalDate] = useState<string>('');
  const [filterExpatName, setFilterExpatName] = useState<string>('');

  const filteredExpats = useMemo(() => {
    return expats.filter(expat => {
      const arrivalDateMatch = filterArrivalDate ? expat.arrivalDate === filterArrivalDate : true;
      const expatNameMatch = filterExpatName ? expat.expatName.toLowerCase().includes(filterExpatName.toLowerCase()) : true;
      return arrivalDateMatch && expatNameMatch;
    });
  }, [expats, filterArrivalDate, filterExpatName]);

  const handleUpdateExpat = useCallback((id: string, field: keyof Expat, value: string) => {
    setExpats(prevExpats =>
      prevExpats.map(expat =>
        expat.id === id ? { ...expat, [field]: value } : expat
      )
    );
  }, []);

  const handleAddExpat = useCallback(() => {
    const newExpat: Expat = {
      id: crypto.randomUUID(),
      expatName: '',
      arrivalDate: '',
      businessCard: OrderStatus.NOT_ORDERED,
      iphone: OrderStatus.NOT_ORDERED,
      simCard: OrderStatus.NOT_ORDERED,
      hotel: OrderStatus.NOT_ORDERED,
      driver: '',
      car: '',
      handoverDate: '',
      finalStatus: FinalStatus.IN_PROGRESS,
      notes: ''
    };
    setExpats(prevExpats => [...prevExpats, newExpat]);
  }, []);

  const handleRemoveExpat = useCallback((id: string) => {
    setExpats(prevExpats => prevExpats.filter(expat => expat.id !== id));
  }, []);

  return (
    <div className="min-h-screen text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-slate-900">Expat Onboarding Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Dashboard 
          data={expats} 
          filterArrivalDate={filterArrivalDate}
          setFilterArrivalDate={setFilterArrivalDate}
          filterExpatName={filterExpatName}
          setFilterExpatName={setFilterExpatName}
        />
        <div className="mt-8">
          <ExpatSheet 
            data={filteredExpats} 
            onUpdate={handleUpdateExpat}
            onAdd={handleAddExpat}
            onRemove={handleRemoveExpat}
          />
        </div>
      </main>
    </div>
  );
};

export default App;