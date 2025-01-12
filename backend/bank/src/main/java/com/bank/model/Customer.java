package com.bank.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Entity
public class Customer {
    public Customer() {
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                ", address='" + address + '\'' +
                ", kyc_verified=" + kyc_verified +
                ", created_at=" + created_at +
                '}';
    }

    public int getId() {
        return id;
    }

    public Customer(int id, String name, String email, Long phone, String address, boolean kyc_verified, Date created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.kyc_verified = kyc_verified;
        this.created_at = created_at;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isKyc_verified() {
        return kyc_verified;
    }

    public void setKyc_verified(boolean kyc_verified) {
        this.kyc_verified = kyc_verified;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String email;
    private Long phone;
    private String address;
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Accounts> accounts;
    private boolean kyc_verified;
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Date created_at;
}
