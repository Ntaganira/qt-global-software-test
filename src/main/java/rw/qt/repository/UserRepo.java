package rw.qt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rw.qt.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);

    boolean existsByUsername(String username);

}
