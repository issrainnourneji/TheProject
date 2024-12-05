export interface Appointment {
  id: number;
  clientId: number;
  agentId: number;
  appointmentDate: string;
  appointmentType: string;
  notes?: string;
  notificationSent: boolean;
  status: 'PENDING' | 'CONFIRMED' | 'MODIFICATION'; 
}
