
import React, { useState } from 'react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectName: string) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSave }) => {
  const [projectName, setProjectName] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (projectName.trim()) {
      onSave(projectName);
      setProjectName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-dark-card rounded-lg shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Tambah Proyek Audit</h3>
          <button onClick={onClose} className="text-dark-text-secondary hover:text-white">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-dark-text-secondary mb-1">
            Nama Proyek
          </label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Cth: Audit BPK Semester II 2025"
            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark-border">
            Batal
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg text-sm font-semibold bg-brand-blue hover:bg-brand-blue-hover text-white">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
