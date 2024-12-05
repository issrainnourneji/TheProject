package com.muntu.muntu.Dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.muntu.muntu.Entity.Simulation.ProspectSelection;
import com.muntu.muntu.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String password;
    private String address;
    private String role;

    private ProspectSelectionDto prospectSelection;

    public UserDto(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.address = user.getAddress();
        this.password=user.getPassword();
        this.role  = user.getRole().toString();

        ProspectSelection selection = user.getProspectSelection();
        if (selection != null) {
            this.prospectSelection = new ProspectSelectionDto(
                    selection.getRole(),
                    selection.getPropertyType(),
                    selection.getWorkType(),
                    selection.getBudget()
            );
        }
    }

}
