package com.bank.controller;

import com.bank.DTO.TransferRequestDTO;
import com.bank.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transfer")
public class TransferController {
    @Autowired
    TransferService transferService;
    @PostMapping
    public ResponseEntity<String> transferAmount(@RequestBody TransferRequestDTO transferRequest){
        transferService.transferAmount(transferRequest.getFromAccountId(),transferRequest.getToAccountId(),transferRequest.getAmount());
        return ResponseEntity.ok("Transfer Successful");
    }
}
