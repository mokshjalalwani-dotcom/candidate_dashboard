export type ApplicationStatus =
  | 'Pending'
  | 'Selected'
  | 'Rejected'
  | 'Interviewing'
  | 'Unknown';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  collegeName: string;
  skills: string[];
  status: ApplicationStatus;
  avatar?: string;
  initials: string;
  appliedAt: string;
  phone?: string;
  location?: string;
  isLocal?: boolean; // added via the form (localStorage)
}

export type SortField = 'name' | 'status' | 'appliedAt';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  status: ApplicationStatus | 'All';
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
}
