package com.bank.controller;

import com.bank.DTO.TransactionsDTO;
import com.bank.model.Transactions;
import com.bank.service.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionsController {
    @Autowired
    TransactionsService service;
    @GetMapping
    public List<Transactions> getAllTransactions(){
        return service.getTransactions();
    }
    @GetMapping("/account/{account_id}")
    public List<Transactions> getTransactionsByAccount(@PathVariable long account_id) {
        return service.getTransactionsByAccount(account_id);
    }
    @PostMapping
    public Transactions createTransactions(@RequestBody TransactionsDTO transactionsDTO){
        return service.createTransactions(transactionsDTO);
    }
//    @GetMapping("/customer/{customer_id")
//    public List<Transactions> getTransactionsByCustomerId(@PathVariable int customer_id){
//        return service.getTransactionsByCustomerId(customer_id);
//    }
}
