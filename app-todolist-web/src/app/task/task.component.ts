import { Component, OnInit, Self, SkipSelf } from '@angular/core';
import { BROWSER_STORAGE, StorageService } from '../storage.service';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [
    StorageService,
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage },
  ],
})
export class TaskComponent implements OnInit {
  task: Task = {
    description: 'contiuar a página de tasks do app',
    title: 'Continução do app',
    priority: 'ALTA',
    startAt: '2023-11-25T19:30:00',
    endAt: '2023-11-26T22:00:00',
  };

  token: string = '';

  constructor(
    private taskService: TaskService,
    @Self() private sessionStorageService: StorageService,
    @SkipSelf() private localStorageService: StorageService
  ) {}

  ngOnInit() {
    //Busca o usuário no localstorage e cria o token: 'Guigas014:123456'
    const signUsername = this.sessionStorageService.get('username');
    const signPassword = this.sessionStorageService.get('password');

    // this.token = signUsername + ':' + signPassword;
    this.token = `${signUsername}:${signPassword}`;
    console.log(this.token);

    this.taskService
      .addTask(this.task, this.token)
      .subscribe((res) => console.log(res));
  }
}
