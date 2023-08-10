package rw.qt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rw.qt.entity.Project;

public interface ProjectRepo extends JpaRepository<Project, Long> {
    List<Project> findByTasksIn(List<Long> tasks);
}
