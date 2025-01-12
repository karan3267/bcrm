package com.bank.service;

import com.bank.model.Customer;
import com.bank.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    CustomerRepo customerRepo;

    public List<Customer> getCustomers(){
        return customerRepo.findAll();
    }

    public void createCustomer(Customer customer){
        customerRepo.save(customer);
    }

    public Customer getCustomer(int customerId){
        return customerRepo.findById(customerId).orElse(new Customer());
    }

    public void updateCustomer(Customer customer){
        customerRepo.save(customer);
    }

    public void deleteCustomer(int customerId){
        customerRepo.deleteById(customerId);
    }
}
