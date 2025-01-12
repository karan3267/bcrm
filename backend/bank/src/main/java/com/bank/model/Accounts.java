package com.bank.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Accounts {
    @Id
    private long account_number;
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    @Column(name="balance",precision = 16,scale = 2)
    private BigDecimal balance;
    @Enumerated(EnumType.STRING)
    private AccountType account_type;
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Date created_at;
}
