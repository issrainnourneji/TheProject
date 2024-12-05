package com.muntu.muntu.Repository;
import com.muntu.muntu.Entity.EmailVerif.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    Optional<Token> findByToken(String token);

    @Transactional
    void deleteByUserId(Integer id);

}
