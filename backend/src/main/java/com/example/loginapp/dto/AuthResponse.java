package com.example.loginapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private Long userId;
    private String fullName;
    private String email;
    private String role;

    public AuthResponse(String token, Long userId, String fullName, String email, String role) {
        this.token = token;
        this.tokenType = "Bearer";
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }
}
