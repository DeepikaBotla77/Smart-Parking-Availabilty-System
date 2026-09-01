package com.careershield.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * ScamReport entity to store scam analysis results.
 */
@Entity
@Table(name = "scam_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScamReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String companyName;
    private String companyWebsite;

    @Column(columnDefinition = "TEXT")
    private String jobDescription;

    private Integer trustScore;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(columnDefinition = "TEXT")
    private String warnings;

    @Column(columnDefinition = "TEXT")
    private String positives;

    private LocalDateTime analyzedAt;

    @PrePersist
    protected void onCreate() {
        analyzedAt = LocalDateTime.now();
    }

    public enum Status { GENUINE, SUSPICIOUS, HIGH_RISK_SCAM }
}
