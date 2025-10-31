
import React, { useState } from 'react';
import { AuditProject, AuditRequest, Evidence, RequestStatus } from '../types';

interface RequestListProps {
  projects: AuditProject[];
  requests: AuditRequest[];
  evidence: Evidence[];
  onAddProject: () => void;
  onAddRequest: () => void;
  onDeleteRequest: (requestId: string) => void;
}

const getStatusBadge = (status: RequestStatus) => {
  switch (status) {
    case RequestStatus.Fulfilled:
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Terpenuhi</span>;
    case RequestStatus.NotStarted:
      return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">Belum</span>;
    case RequestStatus.NearDeadline:
       return <div className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full inline-block">
        <div>5 hari lagi</div>
      </div>
    case RequestStatus.Overdue:
       return <div className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full inline-block">
        <div>Terlambat 19 hari</div>
      </div>
    default:
      return null;
  }
};

const ProjectSection: React.FC<{
    project: AuditProject; 
    requests: AuditRequest[];
    onAddRequest: () => void;
    onDeleteRequest: (requestId: string) => void;
}> = ({ project, requests, onAddRequest, onDeleteRequest }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="bg-dark-card rounded-lg overflow-hidden">
            <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center space-x-4">
                    <i className={`fa-solid ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} transition-transform`}></i>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <span className="text-sm px-2 py-1 bg-dark-bg rounded-md">{requests.length} Permintaan</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-md hover:bg-dark-border"><i className="fa-solid fa-pen"></i></button>
                    <button onClick={(e) => { e.stopPropagation(); onAddRequest(); }} className="flex items-center space-x-2 bg-brand-blue hover:bg-brand-blue-hover px-3 py-2 rounded-lg text-sm font-semibold">
                        <i className="fa-solid fa-plus"></i>
                        <span>Tambah Permintaan</span>
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="p-4">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-dark-text-secondary uppercase">
                            <tr>
                                {['ID', 'Tanggal', 'Unit', 'Deskripsi', 'Tenggat', 'PIC', 'Bukti Terkait', 'Status', 'Aksi'].map(h => 
                                <th key={h} scope="col" className="px-4 py-3">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req.id} className="border-b border-dark-border hover:bg-slate-700">
                                    <td className="px-4 py-3 font-medium">{req.id}</td>
                                    <td className="px-4 py-3">{req.date}</td>
                                    <td className="px-4 py-3">{req.unit}</td>
                                    <td className="px-4 py-3">{req.description}</td>
                                    <td className="px-4 py-3">{req.deadline}</td>
                                    <td className="px-4 py-3">{req.pic}</td>
                                    <td className="px-4 py-3">
                                      {req.relatedEvidenceIds.length > 0 ? 
                                        (<a href="#" className="text-blue-400 hover:underline">{req.relatedEvidenceIds.join(', ')} <i className="fa-solid fa-external-link-alt text-xs"></i></a>) 
                                        : '-'}
                                    </td>
                                    <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 text-dark-text-secondary hover:text-white"><i className="fa-solid fa-pen"></i></button>
                                            <button onClick={() => onDeleteRequest(req.id)} className="p-2 text-dark-text-secondary hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export const RequestList: React.FC<RequestListProps> = ({ projects, requests, evidence, onAddProject, onAddRequest, onDeleteRequest }) => {
  const requestsByProject = projects.map(proj => ({
    ...proj,
    requests: requests.filter(req => req.projectId === proj.id)
  }));

  const unassignedRequests = requests.filter(req => !req.projectId);
  
  const totalFulfilled = requests.filter(r => r.status === RequestStatus.Fulfilled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Permintaan</h2>
        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 border border-dark-border px-3 py-2 rounded-lg text-sm font-semibold hover:bg-dark-card">
              <i className="fa-solid fa-download"></i>
              <span>Download Terpenuhi ({totalFulfilled})</span>
           </button>
           <button onClick={onAddProject} className="flex items-center space-x-2 bg-brand-blue hover:bg-brand-blue-hover px-3 py-2 rounded-lg text-sm font-semibold">
              <i className="fa-solid fa-plus"></i>
              <span>Tambah Proyek Audit</span>
           </button>
        </div>
      </div>

      <div className="space-y-4">
        {requestsByProject.map(projData => (
            <ProjectSection 
                key={projData.id} 
                project={projData} 
                requests={projData.requests} 
                onAddRequest={onAddRequest}
                onDeleteRequest={onDeleteRequest}
            />
        ))}
      </div>
      
      {projects.length === 0 && unassignedRequests.length === 0 && (
         <div className="text-center py-16 bg-dark-card rounded-lg">
             <p className="text-dark-text-secondary">Belum ada permintaan untuk proyek ini.</p>
             <p className="text-dark-text-secondary">Klik "Tambah Permintaan" untuk memulai.</p>
         </div>
      )}
    </div>
  );
};
