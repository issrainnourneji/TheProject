import { Component } from '@angular/core';
import { AppointmentService } from '../../services/services/appointment.service';
import { Appointment } from '../../services/models/appointment';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css'
})
export class ListAppointmentComponent {
  appointments: Appointment[] = [];


  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }

  confirmAppointment(id: number): void {
    this.appointmentService.confirmAppointment(id).subscribe({
      next: (updatedAppointment) => {
        const index = this.appointments.findIndex((a) => a.id === id);
        if (index !== -1) {
          this.appointments[index] = updatedAppointment;
        }
        console.log(`Appointment with id ${id} confirmed successfully.`);
      },
      error: (err) => {
        console.error(`Failed to confirm appointment with id ${id}:`, err);
        alert('An error occurred while confirming the appointment.');
      },
    });
  }
}
