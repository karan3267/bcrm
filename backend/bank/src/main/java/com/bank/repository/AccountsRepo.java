package com.bank.repository;

import com.bank.model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountsRepo extends JpaRepository<Accounts,Long> {
    List<Accounts> findByCustomerId(int customerId);
}
