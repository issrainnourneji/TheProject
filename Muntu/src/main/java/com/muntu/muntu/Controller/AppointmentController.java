package com.muntu.muntu.Controller;

import com.muntu.muntu.Entity.Appointment;
import com.muntu.muntu.Services.Impl.AppointmentServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rendezvous")
@AllArgsConstructor
@CrossOrigin(origins = "*")

public class AppointmentController {

    private final AppointmentServiceImpl appointmentService;

    @PostMapping("/add")
    public ResponseEntity<?> addAppointment(@RequestBody Map<String, Object> request, Principal principal) {
        Appointment appointment = appointmentService.createAppointment(request, principal.getName());
        return ResponseEntity.ok(appointment);
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<Void> confirmAppointment(@PathVariable Long id) {
        appointmentService.confirmAppointment(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }
}
