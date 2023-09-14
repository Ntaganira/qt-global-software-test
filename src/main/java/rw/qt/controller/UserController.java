package rw.qt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import rw.qt.entity.User;
import rw.qt.service.PortalService;
import rw.qt.service.impl.UserService;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PortalService portalService;

    @GetMapping(value = "/all-users", produces = { "application/json" })
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/register-user", produces = { "application/json" })
    public ResponseEntity<?> register(@RequestBody User user) {
        Map<String, Object> rtn = new HashMap<>();
        if (userService.isExists(user.getUsername())) {
            rtn.put("error", "Already taken !");
            return new ResponseEntity<>(rtn, HttpStatus.BAD_REQUEST);
        }
        rtn.put("data", userService.save(user));
        rtn.put("success", "Registered as successfully!");
        return new ResponseEntity<>(rtn, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/remove-assignee/{id}", produces = { "application/json" })
    public ResponseEntity<?> removeAssignee(@PathVariable("id") long id) {
        Map<String, Object> rtn = new HashMap<>();
        userService.deleteById(id);
        rtn.put("data", "Assignee successfully removed !");
        return new ResponseEntity<>(rtn, HttpStatus.OK);
    }

    @PostMapping(value = "/update-user", produces = { "application/json" })
    public ResponseEntity<?> updateUserProfile(@RequestBody User user) {
        Map<String, Object> rtn = new HashMap<>();
        try {
            User user1 = userService.findById(user.getId());
            user1.setFirstName(user.getFirstName());
            user1.setLastName(user.getLastName());
            user1.setGender(user.getGender());
            user1.setPassword(user.getPassword());
            System.out.println(user1.getPassword());
            rtn.put("data", userService.save(user1));
            rtn.put("success", "Your profile is updated as successfully!");
            return new ResponseEntity<>(rtn, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(rtn, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/api/users")
    public ResponseEntity<?> getOnlineUser(HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        return new ResponseEntity<>(portalService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/api/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOne(@PathVariable("id") int userId) {
        return new ResponseEntity<>(portalService.getOne(userId), HttpStatus.OK);
    }

}
