package com.muntu.muntu.Repository.Simulation;

import com.muntu.muntu.Entity.Simulation.ProspectSelection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SelectionRepository extends JpaRepository<ProspectSelection, Long> {
    List<ProspectSelection> findByUserId(Long userId);
}
