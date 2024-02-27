import {
  Component,
  OnInit,
  Self,
  SkipSelf,
  Inject,
  LOCALE_ID,
  ViewChild,
} from '@angular/core';
import { BROWSER_STORAGE, StorageService } from '../storage.service';
import { Router } from '@angular/router';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { TaskService } from '../task.service';
import { Task } from '../task';
import { formatDate } from '@angular/common';

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
  priorities = ['ALTA', 'MÉDIA', 'BAIXA'];

  task: Task = {
    description: '',
    title: '',
    priority: '',
    startAt: '',
    endAt: '',
  };

  name: string = '';
  token: string = '';

  setting = false;
  newTask = false;

  taskStatus = true;

  openSetting() {
    this.setting = !this.setting;
  }

  openNewTask() {
    this.newTask = !this.newTask;
    this.clearTask();
  }

  //Pertence ao swal do sweetAlert
  @ViewChild('taskSwal')
  public readonly taskSwal!: SwalComponent;

  onSubmit() {
    this.openSetting();
  }

  createTask() {
    //Busca o usuário no localstorage e cria o token: 'Guigas014:123456'
    const signUsername = this.sessionStorageService.get('username');
    const signPassword = this.sessionStorageService.get('password');
    this.name = signUsername || '';
    // this.token = signUsername + ':' + signPassword;
    this.token = `${signUsername}:${signPassword}`;

    //Trata os dados vindos do formulário.
    if (this.task.title == '') {
      this.taskSwal.title = 'Título!';
      this.taskSwal.text = 'o título deve ser preenchido!';

      this.taskSwal.fire();
      return;
    }

    if (this.task.description == '') {
      this.taskSwal.title = 'Descrição!';
      this.taskSwal.text = 'a descrição deve ser preenchido!';

      this.taskSwal.fire();
      return;
    }

    if (this.task.priority == '') {
      this.taskSwal.title = 'Prioridade!';
      this.taskSwal.text = 'uma prioridade deve ser selecionada!';

      this.taskSwal.fire();
      return;
    }

    if (this.task.startAt == '') {
      this.taskSwal.title = 'Data de início';
      this.taskSwal.text = 'a data de início deve ser preenchida!';

      this.taskSwal.fire();
      return;
    } else {
      //Passa a data para o formato de Date.
      this.task.startAt = formatDate(
        this.task.startAt,
        ' YYYY-MM-ddThh:mm:ss',
        this.locale
      );
    }

    if (this.task.endAt == '') {
      this.taskSwal.title = 'Data de termino';
      this.taskSwal.text = 'a data de termino deve ser preenchida!';

      this.taskSwal.fire();
      return;
    } else {
      //Passa a data para o formato de Date.
      this.task.endAt = formatDate(
        this.task.endAt,
        ' YYYY-MM-ddThh:mm:ss',
        this.locale
      );
    }

    //Chama o backend para salvar no DB
    this.taskService.addTask(this.task, this.token).subscribe((res) => {
      if (res.title == this.task.title) {
        //Alerta de sucesso
        this.taskSwal.title = 'Tudo certo!';
        this.taskSwal.text = 'Tarefa criado com sucesso!';
        this.taskSwal.icon = 'success';
        this.taskSwal.iconColor = 'green';

        this.taskSwal.fire();

        this.clearTask();

        //Fecha o formulário de inserir.
        this.openNewTask();
      } else {
        this.taskSwal.title = 'Algo errado!';
        this.taskSwal.text = res.toString();
        this.taskSwal.icon = 'error';
        this.taskSwal.iconColor = '#f26419ff';

        this.taskSwal.fire();
      }
    });
  }

  clearTask() {
    const today = formatDate(
      new Date().toDateString(),
      'yyyy-MM-dd',
      this.locale
    );

    console.log(today);
    // Limpa os campos do formulário
    this.task.description = '';
    this.task.title = '';
    this.task.priority = '';
    this.task.startAt = today;
    this.task.endAt = today;

    const errorMessage = document.getElementsByClassName('form-error');
    for (let i = 0; i < errorMessage.length; i++) {
      errorMessage[i].setAttribute('hidden', 'true');
      // console.log(errorMessage);
    }
  }

  top() {
    document.scrollingElement?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  makeTask() {
    if (this.taskStatus == true) {
      console.log('tarefa concluída!!');
      this.taskStatus = false;
    } else if (this.taskStatus == false) {
      console.log('tarefa pendente!!');
      this.taskStatus = true;
    }
  }

  constructor(
    private taskService: TaskService,
    @Self() private sessionStorageService: StorageService,
    @SkipSelf() private localStorageService: StorageService,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  userLogout() {
    //apaga as credenciais do localstorage;
    this.sessionStorageService.clear();

    //Vai para a página de login
    this.router.navigate(['/user']);
  }

  ngOnInit() {}
}
