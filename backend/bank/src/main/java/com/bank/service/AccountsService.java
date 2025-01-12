package com.bank.service;

import com.bank.DTO.AccountsDTO;
import com.bank.model.Accounts;
import com.bank.model.Customer;
import com.bank.repository.AccountsRepo;
import com.bank.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class AccountsService {
    @Autowired
    AccountsRepo repo;
    @Autowired
    CustomerRepo customerRepo;
    public List<Accounts> getAllAccounts() {
        return repo.findAll();
    }

    public void createAccount(AccountsDTO accountsDTO) {
        String prefix = new SimpleDateFormat("yyMM").format(new Date());
        Customer customer = customerRepo.findById(accountsDTO.getCustomer_id()).orElseThrow(() -> new RuntimeException("Customer not found with ID: " + accountsDTO.getCustomer_id()));
        int customerId=customer.getId();
        String accountNumberStr = prefix + String.format("%06d%04d", customerId, System.currentTimeMillis()%10000);
        long account_number= Long.parseLong(accountNumberStr);
        Accounts accounts = Accounts.builder()
                .customer(customer)
                .account_number(account_number)
                .balance(accountsDTO.getBalance())
                .account_type(accountsDTO.getAccount_type())
                .build();
        repo.save(accounts);
    }

    public Accounts getAccountById(long accountId) {
        return repo.findById(accountId).orElseThrow();
    }

    public void updateAccount(AccountsDTO accountsDTO) {
        String prefix = new SimpleDateFormat("yyMM").format(new Date());
        Customer customer = customerRepo.findById(accountsDTO.getCustomer_id()).orElseThrow(() -> new RuntimeException("Customer not found with ID: " + accountsDTO.getCustomer_id()));
        int customerId=customer.getId();
        String accountNumberStr = prefix + String.format("%06d", customerId);
        long account_number= Long.parseLong(accountNumberStr);
        Accounts accounts = Accounts.builder()
                .customer(customer)
                .account_number(account_number)
                .balance(accountsDTO.getBalance())
                .account_type(accountsDTO.getAccount_type())
                .build();
        repo.save(accounts);
    }

    public void deleteAccount(long accountId) {
        repo.deleteById(accountId);
    }

    public List<Accounts> getAllAccountsByCustomerId(int customerId) {
        return repo.findByCustomerId(customerId);
    }

    public void updateAccountBalance(long accountId, BigDecimal balance) {
        Accounts accountById = getAccountById(accountId);
        accountById.setBalance(balance);
        repo.save(accountById);
    }
}
