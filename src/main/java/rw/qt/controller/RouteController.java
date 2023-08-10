package rw.qt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import rw.qt.entity.User;
import rw.qt.service.impl.UserService;

@Controller
public class RouteController {

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/register")
    public String registration() {
        return "UI/register";
    }

    @GetMapping(value = "/login")
    public String login() {
        return "UI/login";
    }

    @GetMapping(value = "/index", produces = { "application/json" })
    public String index(HttpServletRequest request) {
        String username = request.getRemoteUser();
        User user;
        user = userService.findByUsername(username);
        httpSession.setAttribute("user", user);
        return "UI/index";
    }
}
