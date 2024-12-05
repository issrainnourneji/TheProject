package com.muntu.muntu.Controller;

import com.muntu.muntu.Entity.Document.Prestation;
import com.muntu.muntu.Services.Impl.PrestationServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Prestation")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class PrestationController {
    private final PrestationServiceImpl prestationPrixService;


    @GetMapping("/all")
    public List<Prestation> getAllPrestation() {
        return prestationPrixService.RetrieveAllprestations();
    }

    @PostMapping("/add")
    public Prestation addPrestation(@RequestBody Prestation prestationPrix) {
        return prestationPrixService.addPrestation(prestationPrix);
    }

    @PutMapping("/update")
    public Prestation updatePrestation(@RequestBody Prestation prestationPrix) {
        return prestationPrixService.updatePresttaion(prestationPrix);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Prestation> updatePrestation(@PathVariable Long id, @RequestBody Prestation prestation) {
        Prestation updatedPrestation = prestationPrixService.updatePrestationById(id, prestation);
        return ResponseEntity.ok(updatedPrestation);
    }

    @GetMapping("get/{idD}")
    public Prestation getById(@PathVariable("idD") Long id) {
        return prestationPrixService.RetrievePrestation(id);
    }


    @DeleteMapping("/delete/{id}")
    public void deletePrestation(@PathVariable("id") Long id) {
        prestationPrixService.DeletePrestation(id);
    }

}

