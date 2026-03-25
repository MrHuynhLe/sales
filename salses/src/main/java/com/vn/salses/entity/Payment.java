package com.vn.salses.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    @JsonProperty("order_id")
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Order order;

    @Column(length = 50)
    private String method;

    @Column(precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(length = 50)
    private String status;

    @Column(name = "transaction_code", length = 100)
    @JsonProperty("transaction_code")
    private String transactionCode;

    @Column(name = "created_at")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
}