package com.bank.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)

    private Accounts account;

    private BigDecimal amount;
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    private String description;

    private LocalDateTime timestamp = LocalDateTime.now();

    private String status;
}
