package com.projsjava.todolist.user;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import at.favre.lib.crypto.bcrypt.BCrypt;

@Service
public class UserServcice {

      @Autowired
      private UserRepository userRepository;

      @Transactional
      public UserModel saveUser(UserModel userModel) {
            var user = this.userRepository.findByUsername(userModel.getUsername());

            // if (user != null) {
            // System.out.println("Usuário já existe!");
            // return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("erro", "Usuário
            // já existe!")
            // .body(null);
            // }

            if (user != null) {
                  throw new UserException("Usuário já existe!");
            }

            var passwordHashed = BCrypt.withDefaults()
                        .hashToString(12, userModel.getPassword().toCharArray());

            userModel.setPassword(passwordHashed);
            userModel.setCreatedAt(LocalDateTime.now());


            userRepository.save(userModel);

            // UserDTO userDTO = new UserDTO(userModel);

            return userModel;
      }

      public UserModel login(UserModel userModel) {
            var user = this.userRepository.findByUsername(userModel.getUsername());

            if (user == null) {
                  throw new UserException("Usuário ou senha estão incorretos!");
            }

            return user;
      }

}
