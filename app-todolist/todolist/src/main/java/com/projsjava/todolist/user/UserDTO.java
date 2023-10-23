package com.projsjava.todolist.user;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.BeanUtils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

      private UUID id;
      private String username;
      private String name;
      private String password;
      private LocalDateTime createdAt;

      public UserDTO() {
      }

      public UserDTO(UserModel entity) {
            BeanUtils.copyProperties(entity, this);
      }

}
