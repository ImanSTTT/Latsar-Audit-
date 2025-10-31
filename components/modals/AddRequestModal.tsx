
import React, { useState } from 'react';
import { AuditRequest, Evidence, RequestStatus } from '../../types';

interface AddRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (requestData: Omit<AuditRequest, 'id' | 'status' | 'relatedEvidenceIds'> & { relatedEvidenceIds: string[] }) => void;
  evidenceList: Evidence[];
}

export const AddRequestModal: React.FC<AddRequestModalProps> = ({ isOpen, onClose, onSave, evidenceList }) => {
  const [formData, setFormData] = useState({
    id: 'Otomatis',
    date: new Date().toISOString().split('T')[0],
    description: '',
    unit: '',
    pic: '',
    deadline: '',
    status: RequestStatus.NotStarted,
    relatedEvidenceIds: [] as string[],
    projectId: 'PROJ-001', // Default or select
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEvidenceChange = (evidenceId: string) => {
    setFormData(prev => {
        const newEvidenceIds = prev.relatedEvidenceIds.includes(evidenceId)
            ? prev.relatedEvidenceIds.filter(id => id !== evidenceId)
            : [...prev.relatedEvidenceIds, evidenceId];
        return { ...prev, relatedEvidenceIds: newEvidenceIds };
    });
  };

  const handleSubmit = () => {
    // Simple validation
    if (formData.description && formData.deadline && formData.pic) {
      onSave({
          projectId: formData.projectId,
          date: formData.date,
          unit: formData.unit,
          description: formData.description,
          deadline: formData.deadline,
          pic: formData.pic,
          relatedEvidenceIds: formData.relatedEvidenceIds
      });
      onClose(); // Reset form inside modal if needed
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-dark-card rounded-lg shadow-xl w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Tambah Permintaan</h3>
          <button onClick={onClose} className="text-dark-text-secondary hover:text-white">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-dark-text-secondary mb-1">ID</label>
                <input type="text" value={formData.id} disabled className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 cursor-not-allowed"/>
            </div>
            <div>
                <label className="block text-sm text-dark-text-secondary mb-1">Tanggal</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"/>
            </div>
            <div className="col-span-2">
                <label className="block text-sm text-dark-text-secondary mb-1">Deskripsi</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"></textarea>
            </div>
            <div>
                <label className="block text-sm text-dark-text-secondary mb-1">Unit</label>
                <input type="text" name="unit" value={formData.unit} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"/>
            </div>
            <div>
                <label className="block text-sm text-dark-text-secondary mb-1">PIC</label>
                <input type="text" name="pic" placeholder="Nama PIC" value={formData.pic} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"/>
            </div>
             <div>
                <label className="block text-sm text-dark-text-secondary mb-1">Tenggat</label>
                <input type="date" name="deadline" placeholder="yyyy-mm-dd" value={formData.deadline} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"/>
            </div>
            <div>
                <label className="block text-sm text-dark-text-secondary mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3">
                    <option value={RequestStatus.NotStarted}>Belum</option>
                    <option value={RequestStatus.Fulfilled}>Terpenuhi</option>
                </select>
            </div>
            <div className="col-span-2">
                <label className="block text-sm text-dark-text-secondary mb-1">Bukti Terkait</label>
                <div className="max-h-32 overflow-y-auto bg-dark-bg border border-dark-border rounded-lg p-2 space-y-2">
                    {evidenceList.map(evidence => (
                        <div key={evidence.id} className="flex items-center">
                            <input 
                                type="checkbox" 
                                id={`evidence-${evidence.id}`} 
                                checked={formData.relatedEvidenceIds.includes(evidence.id)}
                                onChange={() => handleEvidenceChange(evidence.id)}
                                className="w-4 h-4 text-brand-blue bg-gray-100 border-gray-300 rounded focus:ring-brand-blue"
                            />
                            <label htmlFor={`evidence-${evidence.id}`} className="ml-2 text-sm">
                                {evidence.id} - {evidence.description}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark-border">
            Batal
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-lg text-sm font-semibold bg-brand-blue hover:bg-brand-blue-hover text-white">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
