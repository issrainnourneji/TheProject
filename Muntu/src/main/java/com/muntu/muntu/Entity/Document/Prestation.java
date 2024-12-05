package com.muntu.muntu.Entity.Document;


import com.muntu.muntu.Enums.Lot;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class Prestation {

    @Id
    @GeneratedValue
    private Long id;
    private String designation;
    @Enumerated(EnumType.STRING)
    private Lot lot;
    private Double prixFourniture ;
    private Double prixUnitaire;
    private String unite = "unitaire";
}

