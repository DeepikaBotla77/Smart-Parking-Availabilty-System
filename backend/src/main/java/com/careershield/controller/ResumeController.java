package com.careershield.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

/**
 * REST controller for resume analysis.
 * TODO: Integrate with PDF parser and ML-based resume analysis.
 */
@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(@RequestParam("file") MultipartFile file) {
        // TODO: Parse PDF, extract text, analyze skills, calculate ATS score
        return ResponseEntity.ok(Map.of(
            "atsScore", 72,
            "detectedSkills", new String[]{"Java", "Python", "SQL"},
            "message", "Resume analyzed successfully"
        ));
    }

    @GetMapping("/history")
    public ResponseEntity<?> getAnalysisHistory() {
        // TODO: Fetch user's resume analysis history from database
        return ResponseEntity.ok(Map.of("analyses", new Object[]{}));
    }
}
