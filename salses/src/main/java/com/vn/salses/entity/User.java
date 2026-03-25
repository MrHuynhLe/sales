package com.vn.salses.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String username;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "full_name", length = 255)
    @JsonProperty("full_name")
    private String fullName;

    @Column(length = 50)
    private String role = "STAFF";

    @Column(name = "created_at")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
}