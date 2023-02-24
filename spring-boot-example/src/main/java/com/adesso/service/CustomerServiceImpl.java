package com.adesso.service;

import com.adesso.dao.CustomerDao;
import com.adesso.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service

public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private CustomerDao customerDao;

//    @Autowired
//    EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public List<Customer> findAll() {
        return (List<Customer>) customerDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Customer> findById(Integer id) {

        return Optional.ofNullable(customerDao.findById(id).orElse(null));
    }

    @Override
    @Transactional
    public Customer save(Customer customer) {
        return customerDao.save(customer);
    }

    @Override
    @Transactional
    public void deleteCustomer(Integer id) {
        customerDao.deleteById(id);
    }
}
