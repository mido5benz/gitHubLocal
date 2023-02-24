package com.adesso.controllers;

import com.adesso.model.Customer;
import com.adesso.service.CustomerService;
import org.hibernate.query.ReturnableType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {


    @GetMapping(path = "/")
    public String index() {
        return "external";
    }
    @Autowired
    private CustomerService customerService;

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers(){
        List<Customer> response = customerService.findAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> create(@RequestBody Customer customerUpdate){

        Map<String, Object> response = new HashMap<>();

        try {
            customerService.save(customerUpdate);

        }catch (Exception e){

            response.put("Message","Fehler beim Speichern des Objekts !!!");
            response.put("Fehler",e.getMessage().concat(": ").concat(e.getLocalizedMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @DeleteMapping("/delete/{customerId}")
    public ResponseEntity<Map<String, Object>> deleteCustomer(@PathVariable(name = "customerId") Integer id){

        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Customer> customer = customerService.findById(id);
            if(customer.isPresent()) {
                customerService.deleteCustomer(id);
                response.put("deleted",Boolean.TRUE);
                return new ResponseEntity<>(response,HttpStatus.OK);
            }else{
                response.put("deleted",Boolean.FALSE);
                return new ResponseEntity<>(response,HttpStatus.NO_CONTENT);
            }


        }catch (Exception e){
            response.put("Message","Fehler beim löschen des Objekts !");
            response.put("Fehler",e.getMessage().concat(": ").concat(e.getLocalizedMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Map<String, Object>> updateCustomer(@RequestBody Customer customer, @PathVariable(name = "id") Integer id){

        Map<String, Object> response = new HashMap<>();
        Optional<Customer> actualCustome = customerService.findById(id);
        Customer updateCustomer = null;

        try{
            if(actualCustome.isPresent()){

                Customer cc = new Customer();
                actualCustome.get().setAge(customer.getAge());
                actualCustome.get().setEmail(customer.getEmail());
                actualCustome.get().setName(customer.getName());
                updateCustomer = customerService.save(actualCustome.get());

                response.put("Message","Customer wurde erfolgreich aktualisiert");
                response.put("neue Customer",actualCustome.get());

            }

        }catch(Exception e){
            response.put("Message ",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response,HttpStatus.OK);

    }





}
