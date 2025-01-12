package com.bank.controller;

import com.bank.model.Customer;
import com.bank.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("/customers")
    public List<Customer> getCustomers(){
        return customerService.getCustomers();
    }

    @PostMapping("/customers")
    public void createCustomer(@RequestBody Customer customer){
        customerService.createCustomer(customer);
    }

    @GetMapping("/customers/{customerId}")
    public Customer getCustomer(@PathVariable int customerId){
        return customerService.getCustomer(customerId);
    }

    @PutMapping("/customers")
    public void updateCustomer(@RequestBody Customer customer){
        customerService.updateCustomer(customer);
    }

    @DeleteMapping("/customers/{customerId}")
    public void deleteCustomer(@PathVariable int customerId){
        customerService.deleteCustomer(customerId   );
    }
}
