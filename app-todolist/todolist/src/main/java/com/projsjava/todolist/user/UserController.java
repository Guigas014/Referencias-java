package com.projsjava.todolist.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

      // @Autowired
      // private UserRepository userRepository;

      @Autowired
      private UserServcice userServcice;

      // Sign
      @PostMapping("/")
      public ResponseEntity<UserDTO> create(@RequestBody UserModel userModel) {

            UserDTO userCreated = new UserDTO(this.userServcice.saveUser(userModel));

            return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
      }

      @GetMapping("/login")
      public ResponseEntity<UserDTO> login(@RequestBody UserModel userModel) {

            UserDTO userLoged = new UserDTO(this.userServcice.login(userModel));

            return ResponseEntity.ok().body(userLoged);
      }
}
