package com.adesso.service;

import com.adesso.model.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> findAll();

    Optional<Customer> findById(Integer id);

    Customer save(Customer customer);

    void deleteCustomer(Integer id);



}
