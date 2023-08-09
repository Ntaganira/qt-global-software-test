package rw.qt.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import rw.qt.dto.TaskDTO;
import rw.qt.entity.Tasks;
import rw.qt.service.ProjectService;
import rw.qt.service.TaskService;
import rw.qt.service.impl.UserService;

@Controller
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @GetMapping(value = "/index", produces = { "application/json" })
    public String index() {
        return "UI/index";
    }

    @GetMapping(value = "/all-projects", produces = { "application/json" })
    public ResponseEntity<?> getAllProjects() {
        return new ResponseEntity<>(projectService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/all-tasks", produces = { "application/json" })
    public ResponseEntity<?> getAllTask() {
        return new ResponseEntity<>(taskService.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/create-task")
    public ResponseEntity<?> createTask(@RequestBody Tasks task) {
        Map<String, Object> rtn = new HashMap<>();
        try {
            rtn.put("data", taskService.save(task));
        } catch (Exception e) {
        }
        return new ResponseEntity<>(rtn, HttpStatus.OK);
    }
}
