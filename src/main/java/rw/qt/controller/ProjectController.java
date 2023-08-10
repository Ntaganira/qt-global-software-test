package rw.qt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rw.qt.entity.Project;
import rw.qt.service.ProjectService;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping(value = "/create-project")
    public ResponseEntity<?> newProject(@RequestBody Project project) {
        Map<String, Object> rtn = new HashMap<>();
        try {
            rtn.put("data", projectService.save(project));
        } catch (Exception e) {
        }
        return new ResponseEntity<>(rtn, HttpStatus.OK);
    }

    @GetMapping(value = "/find-projects-by-task-id/{ids}")
    public ResponseEntity<?> newProject(@PathVariable("id") List<Long> ids) {
        Map<String, Object> rtn = new HashMap<>();
        try {
            rtn.put("data", projectService.findByTasks(ids));
        } catch (Exception e) {
        }
        return new ResponseEntity<>(rtn, HttpStatus.OK);
    }

    @GetMapping(value = "/find-project/{id}")
    public ResponseEntity<?> findProject(@PathVariable("id") long id) {
        Map<String, Object> rtn = new HashMap<>();
        try {
            rtn.put("data", projectService.findById(id));
        } catch (Exception e) {
        }
        return new ResponseEntity<>(rtn, HttpStatus.OK);
    }
}
