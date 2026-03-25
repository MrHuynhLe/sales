package com.vn.salses.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String code;

    @Column(name = "customer_id")
    @JsonProperty("customer_id")
    private Long customerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private Customer customer;

    @Column(name = "user_id")
    @JsonProperty("user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "total_amount", precision = 12, scale = 2, columnDefinition = "DECIMAL(12,2) DEFAULT 0")
    @JsonProperty("total_amount")
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "discount_amount", precision = 12, scale = 2, columnDefinition = "DECIMAL(12,2) DEFAULT 0")
    @JsonProperty("discount_amount")
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(name = "shipping_fee", precision = 12, scale = 2, columnDefinition = "DECIMAL(12,2) DEFAULT 0")
    @JsonProperty("shipping_fee")
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Column(length = 50, columnDefinition = "VARCHAR(50) DEFAULT 'PENDING'")
    private String status = "PENDING";

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(name = "created_at")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
}