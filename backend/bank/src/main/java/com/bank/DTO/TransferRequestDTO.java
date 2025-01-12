package com.bank.DTO;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class TransferRequestDTO {
    private long fromAccountId;
    private long toAccountId;
    private BigDecimal amount;
}
