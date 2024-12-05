package com.muntu.muntu.Controller;


import com.muntu.muntu.Dto.UserDto;
import com.muntu.muntu.Entity.Simulation.Categorie;
import com.muntu.muntu.Entity.Simulation.Question;
import com.muntu.muntu.Services.Impl.SimulationServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("simulation")
@AllArgsConstructor
public class SimulationController {

    private final SimulationServiceImpl simulationService;

    //Questions
    @PostMapping("/addQ")
    public Question addQuestion(@RequestBody Question question) {
        return simulationService.addQuestion(question);
    }

    @GetMapping("/allQuestions")
    public List<Question> getAllQuestions() {
        return simulationService.getAllQuestions();
    }



    @PutMapping("questionsup /{questionId}")
    public ResponseEntity<Void> updateQuestion(@PathVariable Long questionId, @RequestBody Question questionUpdateDTO) {
        simulationService.updateQuestion(questionId, questionUpdateDTO.getText(), questionUpdateDTO.getCategories());
        return ResponseEntity.ok().build();
    }

    //Categories
    @GetMapping("/allCategories")
    public List<Categorie> getAllCategories() {
        return simulationService.getAllCategories();
    }

    @PostMapping("/addC")
    public Categorie addCategorie(@RequestBody Categorie categorie) {
        return simulationService.addCategorie(categorie);
    }

    @GetMapping("/categorie/{id}")
    public Categorie getItemById(@PathVariable Long id) {
        return simulationService.getCategorieById(id);
    }

    //selectionns

    @GetMapping("/prospects")
    public List<UserDto> getAllUsersWithSelections() {
        // Transformer chaque User en UserDTO
        return simulationService.getAllUsersWithSelections().stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("prospect/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto userDTO = simulationService.getUserById(id);
        return ResponseEntity.ok(userDTO);
    }

}

