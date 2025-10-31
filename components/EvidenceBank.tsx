
import React from 'react';
import { Evidence, ValidityStatus } from '../types';

interface EvidenceBankProps {
  evidence: Evidence[];
  onAddEvidence: () => void;
  onDeleteEvidence: (evidenceId: string) => void;
}

const getValidityBadge = (status: ValidityStatus) => {
  switch (status) {
    case ValidityStatus.Valid:
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Valid</span>;
    case ValidityStatus.NeedsImprovement:
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Perlu Perbaikan</span>;
    default:
      return null;
  }
};

export const EvidenceBank: React.FC<EvidenceBankProps> = ({ evidence, onAddEvidence, onDeleteEvidence }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bank Bukti</h2>
        <button onClick={onAddEvidence} className="flex items-center space-x-2 bg-brand-blue hover:bg-brand-blue-hover px-3 py-2 rounded-lg text-sm font-semibold">
          <i className="fa-solid fa-plus"></i>
          <span>Tambah Bukti</span>
        </button>
      </div>

      <div className="bg-dark-card rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-dark-text-secondary uppercase">
            <tr>
              {['ID', 'Kategori', 'Deskripsi', 'File Link', 'Unit', 'PIC', 'Tgl Diterima', 'Validitas', 'PRM Terkait', 'Aksi'].map(h =>
                <th key={h} scope="col" className="px-6 py-3">{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {evidence.map(item => (
              <tr key={item.id} className="border-b border-dark-border hover:bg-slate-700">
                <td className="px-6 py-4 font-medium">{item.id}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">
                  <a href={item.fileLink} className="text-blue-400 hover:underline">Buka Link <i className="fa-solid fa-external-link-alt text-xs"></i></a>
                </td>
                <td className="px-6 py-4">{item.unit}</td>
                <td className="px-6 py-4">{item.pic}</td>
                <td className="px-6 py-4">{item.dateReceived}</td>
                <td className="px-6 py-4">{getValidityBadge(item.validity)}</td>
                <td className="px-6 py-4">{item.relatedRequestId || 'PRM-001'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-dark-text-secondary hover:text-white"><i className="fa-solid fa-pen"></i></button>
                    <button onClick={() => onDeleteEvidence(item.id)} className="p-2 text-dark-text-secondary hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
