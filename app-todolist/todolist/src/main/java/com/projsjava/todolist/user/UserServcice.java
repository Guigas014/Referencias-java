package com.projsjava.todolist.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServcice {

      @Autowired
      private UserRepository userRepository;

      @Transactional
      public UserDTO saveUser(UserModel user) {

            userRepository.save(user);

            UserDTO userDTO = new UserDTO(user);

            return userDTO;
      }

}
