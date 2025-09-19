import React, { useMemo } from 'react';
import type { Expat } from '../types';
import { FinalStatus, OrderStatus } from '../types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  data: Expat[];
  filterArrivalDate: string;
  setFilterArrivalDate: (date: string) => void;
  filterExpatName: string;
  setFilterExpatName: (name: string) => void;
}

const COLORS = {
  [FinalStatus.COMPLETED]: '#22c55e',
  [FinalStatus.IN_PROGRESS]: '#facc15',
  [FinalStatus.PENDING]: '#f87171',
};
const BAR_COLORS = {
  sudah: '#3b82f6',
  belum: '#ef4444',
};

const SummaryCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className={`rounded-full p-3 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ data, filterArrivalDate, setFilterArrivalDate, filterExpatName, setFilterExpatName }) => {
  const stats = useMemo(() => {
    const statusCounts = {
      [FinalStatus.COMPLETED]: 0,
      [FinalStatus.IN_PROGRESS]: 0,
      [FinalStatus.PENDING]: 0,
    };
    
    const needs = {
      businessCard: { ordered: 0, notOrdered: 0 },
      iphone: { ordered: 0, notOrdered: 0 },
      simCard: { ordered: 0, notOrdered: 0 },
      hotel: { ordered: 0, notOrdered: 0 },
      driver: { ordered: 0, notOrdered: 0 },
      car: { ordered: 0, notOrdered: 0 },
    };

    data.forEach(expat => {
      statusCounts[expat.finalStatus]++;
      if (expat.businessCard === OrderStatus.ORDERED) needs.businessCard.ordered++; else needs.businessCard.notOrdered++;
      if (expat.iphone === OrderStatus.ORDERED) needs.iphone.ordered++; else needs.iphone.notOrdered++;
      if (expat.simCard === OrderStatus.ORDERED) needs.simCard.ordered++; else needs.simCard.notOrdered++;
      if (expat.hotel === OrderStatus.ORDERED) needs.hotel.ordered++; else needs.hotel.notOrdered++;
      if (expat.driver.trim() !== '') needs.driver.ordered++; else needs.driver.notOrdered++;
      if (expat.car.trim() !== '') needs.car.ordered++; else needs.car.notOrdered++;
    });

    const pieChartData = [
      { name: 'Selesai', value: statusCounts[FinalStatus.COMPLETED] },
      { name: 'Dalam Proses', value: statusCounts[FinalStatus.IN_PROGRESS] },
      { name: 'Tertunda', value: statusCounts[FinalStatus.PENDING] },
    ].filter(item => item.value > 0);

    const barChartData = [
      { name: 'Kartu Nama', Sudah: needs.businessCard.ordered, Belum: needs.businessCard.notOrdered },
      { name: 'iPhone', Sudah: needs.iphone.ordered, Belum: needs.iphone.notOrdered },
      { name: 'SIM Card', Sudah: needs.simCard.ordered, Belum: needs.simCard.notOrdered },
      { name: 'Hotel', Sudah: needs.hotel.ordered, Belum: needs.hotel.notOrdered },
      { name: 'Driver', Sudah: needs.driver.ordered, Belum: needs.driver.notOrdered },
      { name: 'Mobil', Sudah: needs.car.ordered, Belum: needs.car.notOrdered },
    ];

    return { statusCounts, pieChartData, barChartData };
  }, [data]);

  return (
    <div className="space-y-6">
       {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Filter Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="arrivalDateFilter" className="block text-sm font-medium text-slate-700">Tanggal Kedatangan</label>
            <input
              type="date"
              id="arrivalDateFilter"
              value={filterArrivalDate}
              onChange={(e) => setFilterArrivalDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="expatNameFilter" className="block text-sm font-medium text-slate-700">Nama Expat</label>
            <input
              type="text"
              id="expatNameFilter"
              value={filterExpatName}
              onChange={(e) => setFilterExpatName(e.target.value)}
              placeholder="Cari nama expat..."
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div className="self-end">
            <button
              onClick={() => { setFilterArrivalDate(''); setFilterExpatName(''); }}
              className="w-full md:w-auto mt-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Expats" value={data.length} color="bg-blue-100 text-blue-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
        <SummaryCard title="Selesai" value={stats.statusCounts[FinalStatus.COMPLETED]} color="bg-green-100 text-green-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <SummaryCard title="Dalam Proses" value={stats.statusCounts[FinalStatus.IN_PROGRESS]} color="bg-yellow-100 text-yellow-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <SummaryCard title="Tertunda" value={stats.statusCounts[FinalStatus.PENDING]} color="bg-red-100 text-red-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />
      </div>

      {/* Charts and Follow-up List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Progress Kebutuhan Personal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip wrapperClassName="!bg-white !border-slate-200 rounded-md shadow-lg" />
              <Legend />
              <Bar dataKey="Sudah" fill={BAR_COLORS.sudah} name="Sudah Dipesan" />
              <Bar dataKey="Belum" fill={BAR_COLORS.belum} name="Belum Dipesan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Ringkasan Status Akhir</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={stats.pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  // FIX: The `recharts` library has loose typings for the label function properties,
                  // causing type errors. We explicitly convert properties to numbers to ensure
                  // type safety for arithmetic and comparison operations.
                  const numericCx = Number(cx);
                  const numericCy = Number(cy);
                  const numericInnerRadius = Number(innerRadius);
                  const numericOuterRadius = Number(outerRadius);
                  const numericMidAngle = Number(midAngle);
                  const numericPercent = Number(percent);
                  const radius = numericInnerRadius + (numericOuterRadius - numericInnerRadius) * 0.5;
                  const x = numericCx + radius * Math.cos(-numericMidAngle * (Math.PI / 180));
                  const y = numericCy + radius * Math.sin(-numericMidAngle * (Math.PI / 180));
                  return (
                    <text x={x} y={y} fill="white" textAnchor={x > numericCx ? 'start' : 'end'} dominantBaseline="central">
                      {`${(numericPercent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}>
                {stats.pieChartData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip wrapperClassName="!bg-white !border-slate-200 rounded-md shadow-lg"/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;