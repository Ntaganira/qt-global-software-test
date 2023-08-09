package rw.qt.service;

import java.util.List;

import rw.qt.entity.Tasks;

public interface TaskService {

    Tasks save(Tasks t);

    List<Tasks> findAll();
}
