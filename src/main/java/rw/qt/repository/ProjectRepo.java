package rw.qt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rw.qt.entity.Project;

public interface ProjectRepo extends JpaRepository<Project, Long> {

}
