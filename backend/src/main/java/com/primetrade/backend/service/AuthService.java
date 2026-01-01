package com.primetrade.backend.service;

import com.primetrade.backend.dto.*;
import com.primetrade.backend.enums.Role;
import com.primetrade.backend.model.User;
import com.primetrade.backend.repository.IUserRepository;
import com.primetrade.backend.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final IUserRepository repo;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthService(IUserRepository repo,
                       BCryptPasswordEncoder encoder,
                       JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public String register(RegisterRequest req) {

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(Role.valueOf(req.getRole())); // USER / ADMIN

        repo.save(user);
        return "User registered successfully";
    }

    public JwtResponse login(LoginRequest req) {

        User user = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return new JwtResponse(jwtUtil.generateToken(user.getEmail()), user.getRole().toString());
    }
}
