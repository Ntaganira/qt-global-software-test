package rw.qt.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginDTO {
    @NotEmpty(message = "Username required")
    private String username;
    @NotEmpty(message = "Password required")
    private String password;
}
