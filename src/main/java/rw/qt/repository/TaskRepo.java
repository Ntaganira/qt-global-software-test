package rw.qt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rw.qt.entity.Tasks;

@Repository
public interface TaskRepo extends JpaRepository<Tasks, Long> {

}
