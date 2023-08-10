package rw.qt.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rw.qt.dto.TaskDTO;
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
        return repos.findAll().stream().map(i -> mapDTO(i)).collect(Collectors.toList());

    }

    public TaskDTO mapDTO(Tasks task) {
        try {
            String assignees = "";
            String projects = "";
            for (Long l : task.getAssignees()) {
                if (userService.isExistsById(l)) {
                    User u = userService.findById(l);
                    if (u != null)
                        assignees += " ->" + u.getFirstName();
                }
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
