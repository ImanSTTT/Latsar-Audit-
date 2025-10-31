
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-card">
      <div className="relative w-full max-w-md">
        <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-secondary"></i>
        <input
          type="text"
          placeholder="Cari permintaan atau bukti..."
          className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-dark-text-secondary">
          <i className="fa-solid fa-bell"></i>
          <span>Batas Peringatan</span>
          <span className="font-bold text-dark-text">7</span>
          <span>hari</span>
        </div>
      </div>
    </header>
  );
};
