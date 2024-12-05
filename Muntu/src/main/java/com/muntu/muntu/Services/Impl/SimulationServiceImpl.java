package com.muntu.muntu.Services.Impl;


import com.muntu.muntu.Dto.UserDto;
import com.muntu.muntu.Entity.Simulation.Categorie;
import com.muntu.muntu.Entity.Simulation.ProspectSelection;
import com.muntu.muntu.Entity.Simulation.Question;
import com.muntu.muntu.Entity.User;
import com.muntu.muntu.Repository.Simulation.CategorieRepository;
import com.muntu.muntu.Repository.Simulation.QuestionRepository;
import com.muntu.muntu.Repository.Simulation.SelectionRepository;
import com.muntu.muntu.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SimulationServiceImpl {

    private  final QuestionRepository questionRepository;
    private  final CategorieRepository categorieRepository;
    private  final SelectionRepository selectionRepository;
    private final UserRepository userRepo;




    //Questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public void updateQuestion(Long questionId, String questionText, List<Categorie> categories) {
        questionRepository.updateQuestionText(questionId, questionText);
        categories.forEach(category -> {
            questionRepository.updateCategory(category.getId(), category.getContent(), category.getPrice());
        });
    }

    public Question getSimulationById(Long id){
        return questionRepository.getById(id);
    }

    public void deleteQuestionById(Long id){
        questionRepository.deleteById(id);
    }

    //Categories
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }
    public Categorie addCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }


    public Categorie getCategorieById(Long id) {
        return categorieRepository.findById(id).orElse(null);
    }

    public void deleteCategorieById(Long id){
        categorieRepository.deleteById(id);
    }

    //selections

    public List<User> getAllUsersWithSelections() {
        // Récupérer tous les utilisateurs et leurs sélections de prospect
        return userRepo.findAll();
    }

    public UserDto getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User Not found"));
        return new UserDto(user); // Convertir en UserDTO pour inclure ProspectSelectionDto
    }
}

