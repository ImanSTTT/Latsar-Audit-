
import React from 'react';

type View = 'dashboard' | 'permintaan' | 'bukti';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarIcon: React.FC<{icon: string; text: string; collapsed: boolean}> = ({ icon, text, collapsed }) => (
    <>
        <i className={`fa-solid ${icon} w-8 text-center text-lg`}></i>
        {!collapsed && <span className="ml-2">{text}</span>}
    </>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, collapsed, setCollapsed }) => {
  const navItemClasses = (view: View) => 
    `flex items-center px-4 py-3 cursor-pointer rounded-lg transition-colors duration-200 ${
      currentView === view 
        ? 'bg-brand-blue text-white' 
        : 'text-dark-text-secondary hover:bg-dark-card hover:text-dark-text'
    }`;

  const sidebarWidth = collapsed ? 'w-20' : 'w-64';

  return (
    <div className={`bg-dark-card flex flex-col p-4 transition-all duration-300 ${sidebarWidth}`}>
      <div className={`flex items-center mb-8 ${collapsed ? 'justify-center' : 'justify-start'}`}>
        <div className="bg-brand-blue rounded-lg p-2 mr-2">
          <i className="fa-solid fa-shield-halved text-white text-xl"></i>
        </div>
        {!collapsed && <h1 className="text-lg font-bold text-white">Audit & Request</h1>}
      </div>
      <nav className="flex-1 space-y-2">
        <div className={navItemClasses('dashboard')} onClick={() => setCurrentView('dashboard')}>
            <SidebarIcon icon="fa-table-columns" text="Dashboard" collapsed={collapsed} />
        </div>
        <div className={navItemClasses('permintaan')} onClick={() => setCurrentView('permintaan')}>
            <SidebarIcon icon="fa-folder" text="Permintaan" collapsed={collapsed} />
        </div>
        <div className={navItemClasses('bukti')} onClick={() => setCurrentView('bukti')}>
            <SidebarIcon icon="fa-file-invoice" text="Bank Bukti" collapsed={collapsed} />
        </div>
      </nav>
      <div className="mt-auto">
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center px-4 py-3 w-full text-dark-text-secondary hover:bg-dark-border hover:text-dark-text rounded-lg transition-colors duration-200">
          <i className={`fa-solid ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'} w-8 text-center`}></i>
          {!collapsed && <span className="ml-2">Sembunyikan</span>}
        </button>
      </div>
    </div>
  );
};
