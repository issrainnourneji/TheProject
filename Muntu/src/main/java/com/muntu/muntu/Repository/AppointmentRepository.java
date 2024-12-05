package com.muntu.muntu.Repository;

import com.muntu.muntu.Entity.Appointment;
import com.muntu.muntu.Enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByStatusAndAppointmentDateBefore(AppointmentStatus status, LocalDateTime date);


}