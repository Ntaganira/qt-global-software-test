package rw.qt.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rw.qt.dto.TaskDTO;
import rw.qt.dto.TaskDTOResponse;
import rw.qt.entity.Project;
import rw.qt.entity.Tasks;
import rw.qt.entity.User;
import rw.qt.repository.TaskRepo;
import rw.qt.service.ProjectService;
import rw.qt.service.TaskService;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepo repos;
    private final UserService userService;
    private final ProjectService projectService;

    @Override
    public Tasks save(Tasks t) {
        return repos.save(t);
    }

    @Override
    public List<TaskDTO> findAll() {
        return repos.findAll().stream().map(this::dtoMapper).collect(Collectors.toList());

    }

    @Override
    public TaskDTOResponse findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Tasks> tasksPage = repos.findAll(pageable);
        List<Tasks> taskList = tasksPage.getContent();
        List<TaskDTO> content = taskList
                .stream()
                .map(this::dtoMapper).collect(Collectors.toList());

        TaskDTOResponse taskResponse = new TaskDTOResponse();
        taskResponse.setData(content);
        taskResponse.setPageNo(tasksPage.getNumber());
        taskResponse.setPageSize(tasksPage.getSize());
        taskResponse.setTotalElements(tasksPage.getTotalElements());
        taskResponse.setTotalPages(tasksPage.getTotalPages());
        taskResponse.setLast(tasksPage.isLast());

        return taskResponse;
    }

    public TaskDTO dtoMapper(Tasks task) {
        try {
            String assignees = "";
            String projects = "";
            for (String l : task.getAssignees()) {
                // if (userService.isExistsById(l)) {
                // User u = userService.findById(l);
                // if (u != null)
                assignees += " ->" + l;
                // }
            }
            for (Long l : task.getProjects()) {
                if (projectService.existsById(l)) {
                    Project p = projectService.findById(l);
                    if (p != null)
                        projects += " ->" + p.getName();

                }
            }

            return TaskDTO.builder()
                    .projects(projects == null ? "[]" : projects)
                    .assignees(assignees == null ? "[]" : assignees)
                    .id(task.getId())
                    .status(task.getStatus())
                    .endDate(task.getEndDate())
                    .startDate(task.getStartDate())
                    .title(task.getTitle())
                    .description(task.getDescription())
                    .priority(task.getPriority())
                    .attachment(task.getAttachment())

                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Tasks findById(long id) {
        return repos.findById(id).get();
    }

    @Override
    public void deleteById(long id) {
        repos.deleteById(id);
    }
}
