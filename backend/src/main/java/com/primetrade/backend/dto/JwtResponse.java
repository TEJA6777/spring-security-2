package com.primetrade.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class JwtResponse {
    private String token;
    private String role;

    public JwtResponse(String token) {
        this.token = token;
        this.role = null;
    }

    public JwtResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
