package com.careershield.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * ResumeAnalysis entity to store resume analysis results.
 */
@Entity
@Table(name = "resume_analyses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String fileName;
    private Integer atsScore;

    @Column(columnDefinition = "TEXT")
    private String detectedSkills;

    @Column(columnDefinition = "TEXT")
    private String missingSkills;

    @Column(columnDefinition = "TEXT")
    private String suggestions;

    private String suggestedRole;
    private LocalDateTime analyzedAt;

    @PrePersist
    protected void onCreate() {
        analyzedAt = LocalDateTime.now();
    }
}
