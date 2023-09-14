package rw.qt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import rw.qt.dto.LoginDTO;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @GetMapping(value = "/api/auth/**")
    @ResponseBody
    public ResponseEntity<String> apiHome() {
        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<>("Welcome to QT-Global Software Ltd. We only support post methods \n",
                responseHeaders,
                HttpStatus.METHOD_NOT_ALLOWED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDTO.getUsername(), loginDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("You have successfully logged in!.", HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            Authentication authentication, HttpServletRequest request,
            HttpServletResponse response) {
        this.logoutHandler.logout(request, response, authentication);
        return new ResponseEntity<>(" You have successfully logged out!.", HttpStatus.OK);
    }
}
