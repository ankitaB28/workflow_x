export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo?: number;
  dueDate?: string;
  createdAt?: string;
}
