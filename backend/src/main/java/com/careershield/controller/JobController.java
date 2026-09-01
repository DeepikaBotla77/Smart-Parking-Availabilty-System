package com.careershield.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

/**
 * REST controller for job recommendations.
 * TODO: Implement job matching service with database integration.
 */
@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    @GetMapping
    public ResponseEntity<?> getJobs(
        @RequestParam(required = false) String skills,
        @RequestParam(required = false) String type,
        @RequestParam(required = false) String search
    ) {
        // TODO: Fetch and filter jobs from database, calculate match percentages
        return ResponseEntity.ok(Map.of("jobs", List.of(), "total", 0));
    }

    @GetMapping("/recommendations")
    public ResponseEntity<?> getRecommendations(@RequestParam String skills) {
        // TODO: Match user skills against job requirements
        return ResponseEntity.ok(Map.of("recommendations", List.of()));
    }
}
