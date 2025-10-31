
import React, { useMemo } from 'react';
import { AuditProject, AuditRequest, RequestStatus } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface DashboardProps {
  projects: AuditProject[];
  requests: AuditRequest[];
}

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <div className="bg-dark-card p-4 rounded-lg flex items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${color}`}>
      <i className={`fa-solid ${icon} text-xl text-white`}></i>
    </div>
    <div>
      <p className="text-dark-text-secondary text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const COLORS = {
  [RequestStatus.Fulfilled]: '#10b981', // green
  [RequestStatus.NotStarted]: '#3b82f6', // blue
  [RequestStatus.Overdue]: '#ef4444', // red
  [RequestStatus.NearDeadline]: '#f59e0b', // yellow
};

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex justify-center space-x-4 mt-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center text-sm">
          <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
          <span>{entry.value} ({entry.payload.value})</span>
        </li>
      ))}
    </ul>
  );
};


export const Dashboard: React.FC<DashboardProps> = ({ projects, requests }) => {
  const stats = useMemo(() => {
    const total = requests.length;
    const fulfilled = requests.filter(r => r.status === RequestStatus.Fulfilled).length;
    const nearDeadline = requests.filter(r => r.status === RequestStatus.NearDeadline).length;
    const overdue = requests.filter(r => r.status === RequestStatus.Overdue).length;
    return { total, fulfilled, nearDeadline, overdue };
  }, [requests]);

  const fulfilledPercentage = stats.total > 0 ? Math.round((stats.fulfilled / stats.total) * 100) : 0;

  const projectStats = useMemo(() => {
    return projects.map(project => {
      const projectRequests = requests.filter(r => r.projectId === project.id);
      const data = [
        { name: 'Belum', value: projectRequests.filter(r => r.status === RequestStatus.NotStarted || r.status === RequestStatus.NearDeadline).length },
        { name: 'Terpenuhi', value: projectRequests.filter(r => r.status === RequestStatus.Fulfilled).length },
        { name: 'Terlambat', value: projectRequests.filter(r => r.status === RequestStatus.Overdue).length },
      ].filter(d => d.value > 0);

      const colors = {
          'Belum': COLORS[RequestStatus.NotStarted],
          'Terpenuhi': COLORS[RequestStatus.Fulfilled],
          'Terlambat': COLORS[RequestStatus.Overdue],
      }

      return {
        id: project.id,
        name: project.name,
        data,
        colors
      };
    });
  }, [projects, requests]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="fa-list-check" label="Total Permintaan" value={stats.total} color="bg-blue-500" />
        <StatCard icon="fa-check-circle" label="Terpenuhi" value={stats.fulfilled} color="bg-status-green" />
        <StatCard icon="fa-triangle-exclamation" label="Mendekati Deadline" value={stats.nearDeadline} color="bg-status-yellow" />
        <StatCard icon="fa-clock" label="Terlambat" value={stats.overdue} color="bg-status-red" />
      </div>

      <div className="bg-dark-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold">Persentase Terpenuhi (Global)</h3>
        <div className="flex items-center space-x-4 mt-2">
          <p className="text-4xl font-bold">{fulfilledPercentage}%</p>
          <div className="flex-1">
            <div className="w-full bg-dark-bg rounded-full h-4">
              <div className="bg-brand-blue h-4 rounded-full" style={{ width: `${fulfilledPercentage}%` }}></div>
            </div>
            <p className="text-sm text-dark-text-secondary mt-1">{stats.fulfilled} dari {stats.total} total permintaan telah terpenuhi.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectStats.map(stat => (
          <div key={stat.id} className="bg-dark-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-center">{stat.name}</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={stat.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stat.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={stat.colors[entry.name as keyof typeof stat.colors]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
