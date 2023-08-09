package rw.qt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rw.qt.entity.Project;
import rw.qt.repository.ProjectRepo;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo repo;

    public List<Project> findAll() {
        return repo.findAll();
    }
}
