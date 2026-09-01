package com.careershield.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * REST controller for authentication endpoints.
 * TODO: Implement JWT-based authentication service.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        // TODO: Implement user registration with password hashing
        return ResponseEntity.ok(Map.of(
            "message", "Registration successful",
            "token", "jwt-token-placeholder"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        // TODO: Implement login with JWT token generation
        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "token", "jwt-token-placeholder"
        ));
    }
}
