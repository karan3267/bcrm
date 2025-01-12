package com.bank.service;

import com.bank.model.Accounts;
import com.bank.model.TransactionType;
import com.bank.model.Transactions;
import com.bank.repository.AccountsRepo;
import com.bank.repository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class TransferService {
    @Autowired
    private AccountsRepo accountsRepo;
    @Autowired
    private TransactionRepo transactionRepo;

    public void transferAmount(long fromAccountId, long toAccountId, BigDecimal amount) {
        Accounts fromAccount=accountsRepo.findById(fromAccountId).orElseThrow(() -> new RuntimeException("Sender account not found"));
        Accounts toAccount=accountsRepo.findById(toAccountId).orElseThrow(() -> new RuntimeException("Sender account not found"));
        System.out.println(fromAccount.getBalance().compareTo(amount));

        if(fromAccount.getBalance().compareTo(amount)<0){
            throw new RuntimeException("Insufficient Balance");
        }
        Transactions debitTransaction=new Transactions();
        debitTransaction.setAccount(fromAccount);
        debitTransaction.setTransactionType(TransactionType.DEBIT);
        debitTransaction.setDescription("Transfer to account :"+toAccountId);
        debitTransaction.setAmount(amount);
        debitTransaction.setStatus("Success");
        transactionRepo.save(debitTransaction);
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));

        accountsRepo.save(fromAccount);Transactions creditTransaction=new Transactions();
        creditTransaction.setAccount(toAccount);
        creditTransaction.setTransactionType(TransactionType.CREDIT);
        creditTransaction.setDescription("Received from account :"+toAccountId);
        creditTransaction.setAmount(amount);
        creditTransaction.setStatus("Success");
        transactionRepo.save(creditTransaction);
        toAccount.setBalance(toAccount.getBalance().add(amount));
        accountsRepo.save(toAccount);
    }
}
