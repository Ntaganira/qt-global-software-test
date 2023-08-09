package rw.qt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import rw.qt.entity.User;
import rw.qt.service.impl.UserService;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping(value = "/register")
    public String login() {
        return "UI/register";
    }

    @GetMapping(value = "/all-users", produces = { "application/json" })
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/register-user", produces = { "application/json" })
    public ResponseEntity<?> register(@RequestBody User user) {
        Map<String, Object> rtn = new HashMap<>();
        if (userService.isExists(user.getUsername()))
            new Exception("Username already tacken!");

        rtn.put("data", userService.save(user));
        rtn.put("success", "Registered as successfully!");
        return new ResponseEntity<>(rtn, HttpStatus.CREATED);
    }

}
