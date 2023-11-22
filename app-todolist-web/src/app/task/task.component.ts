import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  task: Task = {
    description: 'gravar aula de java',
    title: 'Gravação de aula',
    priority: 'ALTA',
    startAt: '2023-10-21T19:30:00',
    endAt: '2023-10-21T22:00:00',
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // this.taskService.addTask(this.task).subscribe();
  }
}
