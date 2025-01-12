package com.bank.controller;

import com.bank.DTO.AccountsDTO;
import com.bank.model.Accounts;
import com.bank.service.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
public class AccountsController {

    @Autowired
    AccountsService service;

    @GetMapping("/accounts")
    public List<Accounts> getAllAccounts(){
        return service.getAllAccounts();
    }
    @GetMapping("/account/{account_id}")
    public Accounts getAccountById(@PathVariable long account_id){
        return service.getAccountById(account_id);
    }

    @PostMapping("/accounts")
    public void createAccount(@RequestBody AccountsDTO accountsDTO){
        service.createAccount(accountsDTO);
    }
    @PutMapping("/accounts")
    public void updateAccount(@RequestBody AccountsDTO accountsDTO){
        service.updateAccount(accountsDTO);
    }

    @DeleteMapping("/accounts/{account_id}")
    public void deleteAccount(@PathVariable long account_id){
        service.deleteAccount(account_id);
    }

    @GetMapping("/accounts/customer/{customer_id}")
    public List<Accounts> getAllAccountsByCustomerId(@PathVariable int customer_id){
        return service.getAllAccountsByCustomerId(customer_id);
    }
    @PatchMapping("/accounts/{account_id}/{balance}")
    public void updateAccountBalance(@PathVariable long account_id,@PathVariable BigDecimal balance){
        service.updateAccountBalance(account_id,balance);
    }
}
