package rw.qt.service;

import java.util.List;

import rw.qt.dto.TaskDTO;
import rw.qt.entity.Tasks;

public interface TaskService {

    Tasks save(Tasks t);

    List<TaskDTO> findAll();

    Tasks findById(long id);
}
