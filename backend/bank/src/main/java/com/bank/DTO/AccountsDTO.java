package com.bank.DTO;

import com.bank.model.AccountType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AccountsDTO {
    private int customer_id;
    private BigDecimal balance;
    private AccountType account_type;
}

