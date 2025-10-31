
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RequestList } from './components/RequestList';
import { EvidenceBank } from './components/EvidenceBank';
import { AddProjectModal } from './components/modals/AddProjectModal';
import { AddRequestModal } from './components/modals/AddRequestModal';
import { AddEvidenceModal } from './components/modals/AddEvidenceModal';
import { AuditProject, AuditRequest, Evidence, RequestStatus, ValidityStatus } from './types';

type View = 'dashboard' | 'permintaan' | 'bukti';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  const [isAddProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [isAddRequestModalOpen, setAddRequestModalOpen] = useState(false);
  const [isAddEvidenceModalOpen, setAddEvidenceModalOpen] = useState(false);
  
  const [projects, setProjects] = useState<AuditProject[]>([
    { id: 'PROJ-001', name: 'Audit BPK Semester II 2025' },
    { id: 'PROJ-002', name: 'Pemeriksaan Irjen' },
    { id: 'PROJ-003', name: 'KAP' },
  ]);

  const [evidence, setEvidence] = useState<Evidence[]>([
    { id: 'BKT-001', category: 'Kebijakan', description: 'Kebijakan Keamanan Informasi', fileLink: '#', unit: 'TI', pic: 'Andi Wijaya', dateReceived: '2025-10-01', validity: ValidityStatus.Valid },
    { id: 'BKT-002', category: 'Prosedur', description: 'SOP Backup Rutin', fileLink: '#', unit: 'TI', pic: 'Sari Pertiwi', dateReceived: '2025-10-03', validity: ValidityStatus.NeedsImprovement },
    { id: 'BKT-003', category: 'Catatan', description: 'Log Backup Sept 2025', fileLink: '#', unit: 'TI', pic: 'Budi Santoso', dateReceived: '2025-10-05', validity: ValidityStatus.Valid },
  ]);

  const [requests, setRequests] = useState<AuditRequest[]>([
    { id: 'PRM-001', projectId: 'PROJ-001', date: '2025-10-02', unit: 'Kepatuhan', description: 'Minta kebijakan keamanan informasi', deadline: '2025-10-04', pic: 'Rina Ardian', relatedEvidenceIds: ['BKT-001'], status: RequestStatus.Fulfilled },
    { id: 'PRM-002', projectId: 'PROJ-001', date: '2025-10-03', unit: 'TI', description: 'Minta SOP dan log backup', deadline: '2025-10-06', pic: 'Andi Wijaya', relatedEvidenceIds: ['BKT-002'], status: RequestStatus.Fulfilled },
    { id: 'PRM-005', projectId: 'PROJ-001', date: '2025-10-24', unit: 'Kepatuhan', description: 'Review kebijakan anti-fraud', deadline: '2025-11-03', pic: 'Rina Ardian', relatedEvidenceIds: [], status: RequestStatus.NearDeadline },
    { id: 'PRM-003', projectId: 'PROJ-002', date: '2025-10-07', unit: 'Operasional', description: 'Checklist harian DC', deadline: '2025-10-10', pic: 'Budi Santoso', relatedEvidenceIds: [], status: RequestStatus.Overdue },
    { id: 'PRM-004', projectId: 'PROJ-002', date: '2025-10-19', unit: 'TI', description: 'Laporan penetrasi testing Q3', deadline: '2025-10-27', pic: 'Andi Wijaya', relatedEvidenceIds: [], status: RequestStatus.Overdue },
    { id: 'PRM-006', projectId: 'PROJ-002', date: '2025-10-28', unit: 'TI', description: 'Minta log akses server production', deadline: '2025-11-18', pic: 'Sari Pertiwi', relatedEvidenceIds: [], status: RequestStatus.NotStarted },
  ]);

  const addProject = (name: string) => {
    const newProject: AuditProject = {
      id: `PROJ-${String(projects.length + 1).padStart(3, '0')}`,
      name,
    };
    setProjects([...projects, newProject]);
    setAddProjectModalOpen(false);
  };
  
  const addRequest = (requestData: Omit<AuditRequest, 'id' | 'status' | 'relatedEvidenceIds'> & { relatedEvidenceIds: string[] }) => {
     const newRequest: AuditRequest = {
      ...requestData,
      id: `PRM-${String(requests.length + 1).padStart(3, '0')}`,
      status: RequestStatus.NotStarted,
    };
    setRequests([...requests, newRequest]);
    setAddRequestModalOpen(false);
  };
  
  const addEvidence = (evidenceData: Omit<Evidence, 'id' | 'fileLink'>) => {
     const newEvidence: Evidence = {
      ...evidenceData,
      id: `BKT-${String(evidence.length + 1).padStart(3, '0')}`,
      fileLink: '#',
    };
    setEvidence([...evidence, newEvidence]);
    setAddEvidenceModalOpen(false);
  };
  
  const deleteRequest = (requestId: string) => {
    setRequests(currentRequests => currentRequests.filter(req => req.id !== requestId));
  };

  const deleteEvidence = (evidenceId: string) => {
    setEvidence(currentEvidence => currentEvidence.filter(ev => ev.id !== evidenceId));
  };


  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard projects={projects} requests={requests} />;
      case 'permintaan':
        return <RequestList 
            projects={projects} 
            requests={requests} 
            evidence={evidence} 
            onAddProject={() => setAddProjectModalOpen(true)}
            onAddRequest={() => setAddRequestModalOpen(true)}
            onDeleteRequest={deleteRequest}
        />;
      case 'bukti':
        return <EvidenceBank 
            evidence={evidence} 
            onAddEvidence={() => setAddEvidenceModalOpen(true)}
            onDeleteEvidence={deleteEvidence} 
        />;
      default:
        return <Dashboard projects={projects} requests={requests} />;
    }
  };

  const mainContentPadding = useMemo(() => {
    return sidebarCollapsed ? 'pl-20' : 'pl-64';
  }, [sidebarCollapsed]);

  return (
    <div className="flex h-screen bg-dark-bg text-dark-text">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentPadding}`}>
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setAddProjectModalOpen(false)}
        onSave={addProject}
      />
      <AddRequestModal
        isOpen={isAddRequestModalOpen}
        onClose={() => setAddRequestModalOpen(false)}
        onSave={addRequest}
        evidenceList={evidence}
      />
      <AddEvidenceModal
        isOpen={isAddEvidenceModalOpen}
        onClose={() => setAddEvidenceModalOpen(false)}
        onSave={addEvidence}
        requestList={requests}
      />
    </div>
  );
};

export default App;
