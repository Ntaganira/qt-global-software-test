package rw.qt.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRegisterDTO {
    @NotNull(message = "Username is required")
    private String username;
    private String firstName;
    private String lastName;
    private String gender;
    @NotNull(message = "Password is required")
    private String password;
    private List<Long> tasks;
    private String photo;
}
