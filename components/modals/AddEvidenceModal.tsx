
import React, { useState } from 'react';
import { AuditRequest, Evidence, ValidityStatus } from '../../types';

interface AddEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evidenceData: Omit<Evidence, 'id' | 'fileLink'>) => void;
  requestList: AuditRequest[];
}

export const AddEvidenceModal: React.FC<AddEvidenceModalProps> = ({ isOpen, onClose, onSave, requestList }) => {
  const [formData, setFormData] = useState({
    id: 'BKT-XXX',
    category: '',
    description: '',
    unit: '',
    pic: '',
    dateReceived: new Date().toISOString().split('T')[0],
    validity: ValidityStatus.Valid,
    relatedRequestId: '',
    notes: '',
  });
  const [fileName, setFileName] = useState('Belum ada file dipilih.');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('Belum ada file dipilih.');
    }
  };

  const handleSubmit = () => {
    if (formData.category && formData.description && formData.pic) {
      onSave({
        category: formData.category,
        description: formData.description,
        unit: formData.unit,
        pic: formData.pic,
        dateReceived: formData.dateReceived,
        validity: formData.validity,
        relatedRequestId: formData.relatedRequestId
      });
      onClose(); // Optionally reset form state
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-dark-card rounded-lg shadow-xl w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Tambah Bukti</h3>
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
            <label className="block text-sm text-dark-text-secondary mb-1">Kategori</label>
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"/>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-dark-text-secondary mb-1">Deskripsi</label>
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"/>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-dark-text-secondary mb-1">File Bukti</label>
            <div className="flex items-center border border-dark-border rounded-lg">
              <label htmlFor="file-upload" className="cursor-pointer bg-dark-border px-4 py-2 text-sm font-semibold hover:bg-slate-600 rounded-l-lg">
                Upload file
              </label>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
              <span className="text-sm text-dark-text-secondary px-3">{fileName}</span>
            </div>
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
            <label className="block text-sm text-dark-text-secondary mb-1">Tanggal Diterima</label>
            <input type="date" name="dateReceived" value={formData.dateReceived} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"/>
          </div>
          <div>
            <label className="block text-sm text-dark-text-secondary mb-1">Validitas</label>
            <select name="validity" value={formData.validity} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3">
              <option value={ValidityStatus.Valid}>Valid</option>
              <option value={ValidityStatus.NeedsImprovement}>Perlu Perbaikan</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-dark-text-secondary mb-1">ID Permintaan Terkait (opsional)</label>
            <select name="relatedRequestId" value={formData.relatedRequestId} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3">
              <option value="">-</option>
              {requestList.map(req => (
                <option key={req.id} value={req.id}>{req.id} - {req.description}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-dark-text-secondary mb-1">Catatan</label>
            <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3"></textarea>
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
