package rw.qt.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import rw.qt.dto.TaskDTO;
import rw.qt.entity.Project;
import rw.qt.entity.Tasks;
import rw.qt.entity.User;
import rw.qt.service.ProjectService;
import rw.qt.service.TaskService;
import rw.qt.service.impl.UserService;

@Controller
public class TaskController {

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @GetMapping(value = "/index", produces = { "application/json" })
    public String index(HttpServletRequest request) {
        String username = request.getRemoteUser();
        User user;
        user = userService.findByUsername(username);
        httpSession.setAttribute("user", user);
        return "UI/index";
    }

    @GetMapping(value = "/all-projects", produces = { "application/json" })
    public ResponseEntity<?> getAllProjects() {
        return new ResponseEntity<>(projectService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/all-tasks", produces = { "application/json" })
    public ResponseEntity<?> getAllTask() {
        Map<String, Object> rtn = new HashMap<>();
        User loggedIn = (User) httpSession.getAttribute("user");
        rtn.put("user", loggedIn);
        rtn.put("data", taskService.findAll());
        return new ResponseEntity<>(rtn, HttpStatus.OK);
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

    @GetMapping(value = "/update-task/{id}")
    public ResponseEntity<?> Update(@PathVariable("id") long id) {
        Map<String, Object> rtn = new HashMap<>();
        try {
            rtn.put("data", taskService.findById(id));
        } catch (Exception e) {
        }
        return new ResponseEntity<>(rtn, HttpStatus.OK);
    }

    @PostMapping(value = "/create-project")
    public ResponseEntity<?> newProject(@RequestBody Project project) {
        Map<String, Object> rtn = new HashMap<>();
        try {
            rtn.put("data", projectService.save(project));
        } catch (Exception e) {
        }
        return new ResponseEntity<>(rtn, HttpStatus.OK);
    }
}
