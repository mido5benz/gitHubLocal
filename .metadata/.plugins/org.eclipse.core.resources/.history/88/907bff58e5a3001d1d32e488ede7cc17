package com.example.springbootbackendapirest.controllers;

import antlr.ASTNULLType;
import com.example.springbootbackendapirest.models.entity.Cliente;
import com.example.springbootbackendapirest.services.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClienteRestController {

        @Autowired
        private IClienteService clienteService;
        @GetMapping("/clientes")
        public List<Cliente> index() {
            return clienteService.findAll();
        }

        @GetMapping("/clientes/{id}")
        public ResponseEntity<?> show(@PathVariable Long id) {
            Map<String, Object> response = new HashMap<>();
            Cliente cliente = null;
            try {
                cliente = clienteService.findById(id);
            } catch (DataAccessException e) {
                response.put("mensaje", "Error al realizar la consulta en la base de datos");
                response.put("error", e.getMessage().concat(": ").concat(e.getLocalizedMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            if (cliente == null) {
                response.put("mensaje", "El cliente ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
        }

        @PostMapping("/clientes")
        @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
        public ResponseEntity<?> create(@Valid @RequestBody Cliente cliente, BindingResult bindingResult) {
            Cliente clienteNew = null;
            Map<String, Object> response = new HashMap<>();

            if (bindingResult.hasErrors()) {
                List<String> errors = bindingResult.getFieldErrors()
                        .stream()
                        .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                        .collect(Collectors.toList());

                response.put("errors", errors);
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
            }


            try {
                clienteNew = clienteService.save(cliente);
            } catch (DataAccessException e) {
                response.put("mensaje", "Error al realizar el insert en la base de datos");
                response.put("error", e.getMessage().concat(": ").concat(e.getLocalizedMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            response.put("mensaje", "El cliente ha sido creado con éxito!");
            response.put("cliente", clienteNew);

            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
        }

        @PutMapping("/clientes/{id}")
        @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
        public ResponseEntity<?> update(@Valid @RequestBody Cliente cliente, BindingResult bindingResult, @PathVariable Long id ) {
            Cliente clienteActual = clienteService.findById(id);
            Cliente clienteUpdated = null;
            Map<String, Object> response = new HashMap<>();

            if (bindingResult.hasErrors()) {
                List<String> errors = bindingResult.getFieldErrors()
                        .stream()
                        .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                        .collect(Collectors.toList());

                response.put("errors", errors);
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
            }

            if (clienteActual == null) {
                response.put("mensaje", "Error: no se pudo editar, el cliente ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
            }

            try {
                clienteActual.setApellido(cliente.getApellido());
                clienteActual.setNombre(cliente.getNombre());
                clienteActual.setEmail(cliente.getEmail());
                clienteActual.setCreateAt(cliente.getCreateAt());

                clienteUpdated = clienteService.save(clienteActual);
            } catch (DataAccessException e) {
                response.put("mensaje", "Error al actualizar el cliente en la base de datos");
                response.put("error", e.getMessage().concat(": ").concat(e.getLocalizedMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            response.put("mensaje", "El cliente ha sido actualizado con éxito!");
            response.put("cliente", clienteUpdated);
            return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
        }

        @DeleteMapping("/clientes/{id}")
        public ResponseEntity<?> delete(@PathVariable Long id) {
            Map<String, Object> response = new HashMap<>();

            try {
                clienteService.delete(id);
            } catch (DataAccessException e) {
                response.put("mensaje", "Error al eliminar el cliente de la base de datos");
                response.put("error", e.getMessage().concat(": ").concat(e.getLocalizedMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            response.put("mensaje", "El cliente ha sido eliminado con éxito!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
        }


}
