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

    public Project findById(long id) {
        return repo.findById(id).get();
    }

    public boolean existsById(long id) {
        return repo.existsById(id);
    }

    public Project save(Project p) {
        return repo.save(p);
    }

    public List<Project> findByTasks(List<Long> tasks) {
        return repo.findByTasksIn(tasks);
    }

}
