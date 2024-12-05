package com.muntu.muntu.Dto;

import com.muntu.muntu.Enums.AppointmentType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentDto {
    private Long clientId;
    private Long agentId;
    private LocalDateTime appointmentDate;
    private AppointmentType appointmentType;
    private String notes;
}