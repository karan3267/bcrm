package com.bank.DTO;

import com.bank.model.AccountType;
import com.bank.model.TransactionType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransactionsDTO {
    private long accountId;
    private BigDecimal amount;
    private TransactionType transactionType;
    private String description;
}
