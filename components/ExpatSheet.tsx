import React, { useState } from 'react';
import type { Expat } from '../types';
import { OrderStatus, FinalStatus } from '../types';

interface ExpatSheetProps {
  data: Expat[];
  onUpdate: (id: string, field: keyof Expat, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const getStatusHighlightClass = (status: FinalStatus) => {
  switch (status) {
    case FinalStatus.IN_PROGRESS:
      return 'bg-yellow-50';
    case FinalStatus.COMPLETED:
        return 'bg-green-50';
    case FinalStatus.PENDING:
        return 'bg-red-50';
    default:
      return 'bg-white';
  }
};

const ReadOnlyCell: React.FC<{children: React.ReactNode}> = ({ children }) => <div className="px-1 py-1.5">{children || "-"}</div>;


const ExpatSheet: React.FC<ExpatSheetProps> = ({ data, onUpdate, onAdd, onRemove }) => {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="p-4 sm:p-6 flex justify-between items-center border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Monitoring Checklist</h2>
        <button
          onClick={onAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Expat
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              {['Nama Expat', 'Tgl Kedatangan', 'Kartu Nama', 'iPhone', 'SIM Card', 'Hotel', 'Driver', 'Mobil', 'Tgl Serah Terima', 'Status Akhir', 'Catatan', 'Aksi'].map(header => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200 text-sm text-slate-700">
            {data.map(expat => {
              const isEditing = editingRowId === expat.id;
              const isDateInvalid = expat.arrivalDate && expat.handoverDate && new Date(expat.handoverDate) < new Date(expat.arrivalDate);
              
              return (
              <tr key={expat.id} className={`${!isEditing && getStatusHighlightClass(expat.finalStatus)} ${isEditing ? 'bg-indigo-50' : ''} transition-colors duration-200`}>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <input type="text" value={expat.expatName} onChange={e => onUpdate(expat.id, 'expatName', e.target.value)} className="w-40 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" /> : <ReadOnlyCell>{expat.expatName}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <input type="date" value={expat.arrivalDate} onChange={e => onUpdate(expat.id, 'arrivalDate', e.target.value)} className="w-40 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" /> : <ReadOnlyCell>{expat.arrivalDate}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <select value={expat.businessCard} onChange={e => onUpdate(expat.id, 'businessCard', e.target.value)} className="w-32 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"><option value={OrderStatus.ORDERED}>Sudah Pesan</option><option value={OrderStatus.NOT_ORDERED}>Belum Pesan</option></select> : <ReadOnlyCell>{expat.businessCard}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <select value={expat.iphone} onChange={e => onUpdate(expat.id, 'iphone', e.target.value)} className="w-32 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"><option value={OrderStatus.ORDERED}>Sudah Pesan</option><option value={OrderStatus.NOT_ORDERED}>Belum Pesan</option></select> : <ReadOnlyCell>{expat.iphone}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <select value={expat.simCard} onChange={e => onUpdate(expat.id, 'simCard', e.target.value)} className="w-32 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"><option value={OrderStatus.ORDERED}>Sudah Pesan</option><option value={OrderStatus.NOT_ORDERED}>Belum Pesan</option></select> : <ReadOnlyCell>{expat.simCard}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <select value={expat.hotel} onChange={e => onUpdate(expat.id, 'hotel', e.target.value)} className="w-32 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"><option value={OrderStatus.ORDERED}>Sudah Pesan</option><option value={OrderStatus.NOT_ORDERED}>Belum Pesan</option></select> : <ReadOnlyCell>{expat.hotel}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <input type="text" value={expat.driver} onChange={e => onUpdate(expat.id, 'driver', e.target.value)} className="w-32 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" /> : <ReadOnlyCell>{expat.driver}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <input type="text" value={expat.car} onChange={e => onUpdate(expat.id, 'car', e.target.value)} className="w-32 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" /> : <ReadOnlyCell>{expat.car}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   {isEditing ? (
                    <div className="relative">
                     <input 
                      type="date" 
                      value={expat.handoverDate} 
                      onChange={e => onUpdate(expat.id, 'handoverDate', e.target.value)} 
                      className={`w-40 p-1 border rounded-md ${isDateInvalid ? 'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                      aria-invalid={isDateInvalid ? "true" : "false"}
                      aria-describedby={isDateInvalid ? `handover-error-${expat.id}` : undefined}
                    />
                    {isDateInvalid && (
                      <p id={`handover-error-${expat.id}`} className="mt-1 text-xs text-red-600 absolute">
                        Tgl invalid.
                      </p>
                    )}
                   </div>
                   ) : <ReadOnlyCell>{expat.handoverDate}</ReadOnlyCell>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <select value={expat.finalStatus} onChange={e => onUpdate(expat.id, 'finalStatus', e.target.value)} className="w-36 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"><option value={FinalStatus.IN_PROGRESS}>Dalam Proses</option><option value={FinalStatus.COMPLETED}>Selesai</option><option value={FinalStatus.PENDING}>Tertunda</option></select> : <ReadOnlyCell>{expat.finalStatus}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap">{isEditing ? <input type="text" value={expat.notes} onChange={e => onUpdate(expat.id, 'notes', e.target.value)} className="w-48 p-1 border rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" /> : <ReadOnlyCell>{expat.notes}</ReadOnlyCell>}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                      <button
                          onClick={() => setEditingRowId(isEditing ? null : expat.id)}
                          className={`transition-colors ${isEditing ? 'text-green-600 hover:text-green-800' : 'text-slate-400 hover:text-indigo-600'}`}
                          aria-label={isEditing ? `Simpan ${expat.expatName}` : `Edit ${expat.expatName}`}
                          title={isEditing ? 'Simpan' : 'Edit'}
                      >
                         {isEditing ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                         ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                         )}
                      </button>
                      <button 
                        onClick={() => onRemove(expat.id)} 
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        aria-label={`Hapus ${expat.expatName}`}
                        title="Hapus"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                </td>
              </tr>
            )}
            )}
          </tbody>
        </table>
        {data.length === 0 && (
            <div className="text-center py-10">
                <p className="text-slate-500">Tidak ada data yang cocok dengan filter Anda.</p>
                <p className="text-sm text-slate-400 mt-2">Coba reset filter atau tambahkan data expat baru.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ExpatSheet;