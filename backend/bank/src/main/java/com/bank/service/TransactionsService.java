package com.bank.service;

import com.bank.DTO.TransactionsDTO;
import com.bank.model.Accounts;
import com.bank.model.TransactionType;
import com.bank.model.Transactions;
import com.bank.repository.AccountsRepo;
import com.bank.repository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionsService {

    @Autowired
    TransactionRepo repo;
    @Autowired
    AccountsRepo accountsRepo;

    public List<Transactions> getTransactionsByAccount(long accountId) {
        Accounts accounts=accountsRepo.findById(accountId).orElseThrow(()->new RuntimeException("Account Not Found"));
        return repo.findByAccount(accounts);
    }

    public Transactions createTransactions(TransactionsDTO transactionsDTO) {
        Accounts account = accountsRepo.findById(transactionsDTO.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        Transactions transactions=new Transactions();
        transactions.setAccount(account);
        transactions.setAmount(transactionsDTO.getAmount());
        transactions.setTransactionType(transactionsDTO.getTransactionType());
        transactions.setDescription(transactionsDTO.getDescription());
        transactions.setStatus("Success");
        if (transactions.getTransactionType() == TransactionType.DEBIT) {
            account.setBalance(account.getBalance().subtract(transactionsDTO.getAmount()));
        } else {
            account.setBalance(account.getBalance().add(transactionsDTO.getAmount()));
        }
        accountsRepo.save(account);
        return repo.save(transactions);
    }

    public List<Transactions> getTransactions() {
        return repo.findAll();
    }

//    public List<Transactions> getTransactionsByCustomerId(int customerId) {
//
//        return repo.findByAccountWithCustomerId(customerId);
//    }
}
