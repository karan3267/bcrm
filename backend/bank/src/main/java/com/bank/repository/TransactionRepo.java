package com.bank.repository;

import com.bank.model.Accounts;
import com.bank.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<Transactions,Long> {
    List<Transactions> findByAccount(Accounts accounts);
//    List<Transactions> findByAccountWithCustomerId(Long customer_id);
}
