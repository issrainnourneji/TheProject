package com.muntu.muntu.Services.Impl;

import com.muntu.muntu.Entity.Appointment;
import com.muntu.muntu.Entity.User;
import com.muntu.muntu.Enums.AppointmentStatus;
import com.muntu.muntu.Enums.AppointmentType;
import com.muntu.muntu.Repository.AppointmentRepository;
import com.muntu.muntu.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    public Appointment createAppointment(Map<String, Object> request, String clientEmail) {
        User client = userRepository.findByEmail(clientEmail)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Long agentId = Long.valueOf(request.get("agentId").toString());
        LocalDateTime appointmentDate = LocalDateTime.parse(request.get("appointmentDate").toString());
        String appointmentType = request.get("appointmentType").toString();
        String notes = request.get("notes") != null ? request.get("notes").toString() : "";

        User agent = userRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        Appointment appointment = new Appointment();
        appointment.setClient(client);
        appointment.setAgent(agent);
        appointment.setAppointmentDate(appointmentDate);
        appointment.setAppointmentType(AppointmentType.valueOf(appointmentType.toUpperCase()));
        appointment.setNotes(notes);

        return appointmentRepository.save(appointment);
    }

    public void updateAppointmentStatuses() {
        LocalDateTime now = LocalDateTime.now();
        List<Appointment> appointments = appointmentRepository.findByStatusAndAppointmentDateBefore(AppointmentStatus.PENDING, now);

        for (Appointment appointment : appointments) {
            appointment.setStatus(AppointmentStatus.MODIFICATION);
            appointmentRepository.save(appointment);
        }
    }

    public void confirmAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Appointment not found with id " + id));
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}