import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/services/appointment.service';
import { Appointment } from '../../services/models/appointment';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent  implements OnInit{
  rendezv = {
    agentId: null,
    appointmentDate: '',
    appointmentType: 'VIDEO', 
    notes: '',
  };

  appointments: Appointment[] = [];


  constructor(private appointmentService: AppointmentService) {}

  addAppointment() {
    this.appointmentService.addAppointment(this.rendezv).subscribe({
      next: (response) => {
        console.log('Rendez-vous ajouté avec succès :', response);
        alert('Rendez-vous ajouté avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout du rendez-vous :', err);
        alert('Une erreur est survenue.');
      },
    });
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }

}
