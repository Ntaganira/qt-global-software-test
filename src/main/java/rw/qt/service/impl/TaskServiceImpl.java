package rw.qt.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rw.qt.entity.Tasks;
import rw.qt.repository.TaskRepo;
import rw.qt.service.TaskService;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepo repos;

    @Override
    public Tasks save(Tasks t) {
        return repos.save(t);
    }

    @Override
    public List<Tasks> findAll() {
        return repos.findAll();
    }

}
