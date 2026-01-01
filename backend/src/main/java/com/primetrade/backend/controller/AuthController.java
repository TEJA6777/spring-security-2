package com.primetrade.backend.controller;

import com.primetrade.backend.dto.JwtResponse;
import com.primetrade.backend.dto.LoginRequest;
import com.primetrade.backend.dto.RegisterRequest;
import com.primetrade.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest req) {
        service.register(req);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest req) {
        return service.login(req);
    }
}
