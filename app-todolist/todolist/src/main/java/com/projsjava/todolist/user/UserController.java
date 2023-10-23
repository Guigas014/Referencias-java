package com.projsjava.todolist.user;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.favre.lib.crypto.bcrypt.BCrypt;

@RestController
@RequestMapping("/users")
public class UserController {

      @Autowired
      private UserRepository userRepository;

      @Autowired
      private UserServcice userServcice;

      @PostMapping("/")
      public ResponseEntity<UserDTO> create(@RequestBody UserModel userModel) {
            var user = this.userRepository.findByUsername(userModel.getUsername());

            if (user != null) {
                  System.out.println("Usuário já existe!");
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("erro", "Usuário já existe!")
                              .body(null);
            }

            var passwordHashed = BCrypt.withDefaults()
                        .hashToString(12, userModel.getPassword().toCharArray());

            userModel.setPassword(passwordHashed);
            userModel.setCreatedAt(LocalDateTime.now());

            UserDTO userCreated = this.userServcice.saveUser(userModel);

            return ResponseEntity.status(HttpStatus.CREATED)
                        .body(userCreated);
      }

}