package rw.qt.service;

import java.util.List;

import rw.qt.dto.TaskDTO;
import rw.qt.dto.TaskDTOResponse;
import rw.qt.entity.Tasks;

public interface TaskService {

    Tasks save(Tasks t);

    List<TaskDTO> findAll();

    TaskDTOResponse findAll(int pageNo, int pageSize);

    Tasks findById(long id);

    void deleteById(long id);
}
