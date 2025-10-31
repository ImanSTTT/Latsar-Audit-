
export enum ValidityStatus {
  Valid = 'Valid',
  NeedsImprovement = 'Perlu Perbaikan',
}

export enum RequestStatus {
  Fulfilled = 'Terpenuhi',
  NotStarted = 'Belum',
  Overdue = 'Terlambat',
  NearDeadline = 'Mendekati Deadline'
}

export interface Evidence {
  id: string;
  category: string;
  description: string;
  fileLink: string;
  unit: string;
  pic: string;
  dateReceived: string;
  validity: ValidityStatus;
  relatedRequestId?: string;
}

export interface AuditRequest {
  id: string;
  projectId: string;
  date: string;
  unit: string;
  description: string;
  deadline: string;
  pic: string;
  relatedEvidenceIds: string[];
  status: RequestStatus;
}

export interface AuditProject {
  id: string;
  name: string;
}
