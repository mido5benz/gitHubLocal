package com.adesso.dao;

import com.adesso.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface CustomerDao extends JpaRepository<Customer, Integer> {

}
