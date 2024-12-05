package com.muntu.muntu.Entity;

import com.muntu.muntu.Enums.AppointmentStatus;
import com.muntu.muntu.Enums.AppointmentType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "rendezvous")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id", nullable = false)
    private User agent;

    @NotNull(message = "Date is required")
    private LocalDateTime appointmentDate;

    @Enumerated(EnumType.STRING)
    private AppointmentType appointmentType;

    @Column(length = 500)
    private String notes;
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required")
    private AppointmentStatus status = AppointmentStatus.PENDING;


    private boolean notificationSent = false;

}
