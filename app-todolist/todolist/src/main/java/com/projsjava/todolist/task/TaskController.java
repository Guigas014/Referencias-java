package com.projsjava.todolist.task;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projsjava.todolist.user.UserException;
import com.projsjava.todolist.user.UserModel;
import com.projsjava.todolist.user.UserRepository;
import com.projsjava.todolist.utils.Utils;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/tasks")
public class TaskController {

      @Autowired
      private TaskRepository taskRepository;

      @Autowired
      private UserRepository userRepository;

      @PostMapping("/")
      public ResponseEntity create(@RequestBody TaskModel taskModel, HttpServletRequest request) {
            System.out.println("\nChegou no controller" + request.getAttribute("idUser"));

            var idUser = request.getAttribute("idUser");
            taskModel.setIdUser((UUID) idUser);

            var currentDate = LocalDateTime.now();

            if (currentDate.isAfter(taskModel.getStartAt()) || currentDate.isAfter(taskModel.getEndAt())) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("A data de início / término deve ser maior do que a data atual.");
            }

            if (taskModel.getStartAt().isAfter(taskModel.getEndAt())) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("A data de início deve ser menor do que a data de término.");
            }

            taskModel.setStatus(TaskStatus.PENDING);
            var task = this.taskRepository.save(taskModel);

            return ResponseEntity.status(HttpStatus.OK).body(task);
      }

      @GetMapping("/")
      public List<TaskModel> list(HttpServletRequest request) {
            var idUser = request.getAttribute("idUser");

            var tasks = this.taskRepository.findByIdUser((UUID) idUser);

            return tasks;
      }

      @PutMapping("/{id}")
      public ResponseEntity update(@RequestBody TaskModel taskModel, HttpServletRequest request,
                  @PathVariable UUID id) {

            var task = this.taskRepository.findById(id).orElse(null);

            if (task == null) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("Tarefa não encontrada!");
            }

            var idUser = request.getAttribute("idUser");

            if (!task.getIdUser().equals(idUser)) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("Usuário sem permissão para alterar a tarefa.");
            }

            Utils.copyNonNullProperties(taskModel, task);
            var taskUpdated = this.taskRepository.save(task);

            // taskModel.setIdUser((UUID) request.getAttribute("idUser"));
            // taskModel.setId(id);
            return ResponseEntity.ok().body(taskUpdated);
      }

      @DeleteMapping("/{id}")
      public ResponseEntity delete(@PathVariable UUID id, HttpServletRequest request) {
            var task = this.taskRepository.findById(id).orElse(null);

            if (task == null) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("Tarefa não encontrada!");
            }

            var idUser = request.getAttribute("idUser");

            if (!task.getIdUser().equals(idUser)) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("Usuário sem permissão para alterar a tarefa.");
            }

            this.taskRepository.deleteById(id);

            return ResponseEntity.ok().body("Tarefa excluida com sucesso!");
      }

      @PatchMapping("/status/{id}")
      public ResponseEntity updateStatus(@RequestBody TaskModel taskModel,
                  HttpServletRequest request, @PathVariable UUID id) {

            var task = this.taskRepository.findById(id).orElse(null);

            if (task == null) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("Tarefa não encontrada!");
            }

            var idUser = request.getAttribute("idUser");

            if (!task.getIdUser().equals(idUser)) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("Usuário sem permissão para alterar a tarefa.");
            }

            if (task.getStatus() == TaskStatus.DONE) {
                  task.setStatus(TaskStatus.PENDING);
            } else {
                  task.setStatus(TaskStatus.DONE);
            }

            Utils.copyNonNullProperties(taskModel, task);
            var taskUpdated = this.taskRepository.save(task);

            return ResponseEntity.ok().body(taskUpdated);
      }

      @PatchMapping("/user/name")
      public ResponseEntity saveName(@RequestBody String name, HttpServletRequest request) {
            var idUser = request.getAttribute("idUser");

            var user = this.userRepository.findById((UUID) idUser).orElse(null);

            if (user == null) {
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                              .body("Usuário não exsite.");
            }

            user.setName(name);
            this.userRepository.save(user);

            return ResponseEntity.ok().body("Nome de usuário atualizado");
      }

}
