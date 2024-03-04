import {
  Component,
  OnInit,
  Self,
  SkipSelf,
  Inject,
  LOCALE_ID,
  ViewChild,
} from '@angular/core';
import { BROWSER_STORAGE, StorageService } from '../service/storage.service';
import { Location, formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { TaskService } from '../service/task.service';
import { Task } from '../types/task';

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

  tasks: Task[] = [];
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

  getToken() {
    //Busca o usuário no localstorage e cria o token: 'Guigas014:123456'
    const signUsername = this.sessionStorageService.get('username');
    const signPassword = this.sessionStorageService.get('password');
    // this.name = this.name || '';
    // this.token = signUsername + ':' + signPassword;
    this.token = `${signUsername}:${signPassword}`;
  }

  //Atualiza o nome de usuário
  onSubmit(name: string) {
    this.getToken();

    this.taskService.updateName(name, this.token).subscribe((res) => {
      console.log(res.name);
    });

    this.localStorageService.set('name', name);

    this.openSetting();
  }

  createOrUpdateTask() {
    this.getToken();

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

    if (this.task.id) {
      //Chama o backend para atualizar os dados
      this.taskService
        .updateTask(this.task, this.token, this.task.id)
        .subscribe((res) => {
          if (res.id == this.task.id) {
            // console.log(res);
            //Alerta de sucesso
            this.taskSwal.title = 'Tudo certo!';
            this.taskSwal.text = 'Tarefa atualizada com sucesso!';
            this.taskSwal.icon = 'success';
            this.taskSwal.iconColor = 'green';

            this.taskSwal.fire();

            //Fecha o formulário de inserir.
            this.openNewTask();

            this.clearTask();

            //Atualiza a lista de tarefas
            this.getTasks();
          } else {
            this.taskSwal.title = 'Algo errado!';
            this.taskSwal.text = res.toString();
            this.taskSwal.icon = 'error';
            this.taskSwal.iconColor = '#f26419ff';

            this.taskSwal.fire();
          }
        });

      return;
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

        //Fecha o formulário de inserir.
        this.openNewTask();

        this.clearTask();

        //Atualiza a lista de tarefas
        this.getTasks();
      } else {
        this.taskSwal.title = 'Algo errado!';
        this.taskSwal.text = res.toString();
        this.taskSwal.icon = 'error';
        this.taskSwal.iconColor = '#f26419ff';

        this.taskSwal.fire();
      }
    });
  }

  getTasks() {
    this.getToken();

    this.taskService.getTasks(this.token).subscribe((res) => {
      this.tasks = res;
      // console.log(this.tasks);
      // if (this.tasks.length == 0) {
      //   alert('Não existe nenhuma tarefa cadastrada!');
      // }
    });
  }

  updateTask(id: any) {
    this.openNewTask();

    this.tasks.map((task) => {
      if (task.id == id) {
        this.task.description = task.description;
        this.task.title = task.title;
        this.task.priority = task.priority;
        this.task.startAt = task.startAt;
        this.task.endAt = task.endAt;
        this.task.id = task.id;
      }
    });
  }

  deleteTask(id: any) {
    this.getToken();

    if (id == '') {
      this.taskSwal.title = 'Dado inválido';
      this.taskSwal.text = 'Id não existente';

      this.taskSwal.fire();
      return;
    }

    this.taskService.deleteTask(id, this.token).subscribe((res) => {
      if (res == null) {
        //Alerta de sucesso
        this.taskSwal.title = 'Tudo certo!';
        this.taskSwal.text = 'Tarefa excluída com sucesso!';
        this.taskSwal.icon = 'success';
        this.taskSwal.iconColor = 'green';

        this.taskSwal.fire();

        //Atualiza a lista de tarefas recarregando a página
        this.getTasks();
      } else {
        this.taskSwal.title = 'Algo errado!';
        this.taskSwal.text = res;
        this.taskSwal.icon = 'error';
        this.taskSwal.iconColor = '#f26419ff';

        this.taskSwal.fire();
      }
      // console.log(res);
    });
  }

  clearTask() {
    const today = formatDate(
      new Date().toDateString(),
      'yyyy-MM-dd',
      this.locale
    );

    //Apaga o id da task
    this.task.id = undefined;

    // console.log(today);
    // Limpa os campos do formulário
    this.task.description = '';
    this.task.title = '';
    this.task.priority = '';
    this.task.startAt = today;
    this.task.endAt = today;

    // Apaga a menssagem de erro de cada input.
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

  updateStatus(id: any) {
    this.getToken();

    this.taskService.updateStatus(id, this.token).subscribe((res) => {
      if (res.status != this.task.status) {
        //Alerta de sucesso
        this.taskSwal.title = 'Tudo certo!';
        this.taskSwal.text = 'Status atualizado!';
        this.taskSwal.icon = 'success';
        this.taskSwal.iconColor = 'green';

        this.taskSwal.fire();

        //Atualiza a lista de tarefas recarregando a página
        this.getTasks();
      } else {
        this.taskSwal.title = 'Algo errado!';
        this.taskSwal.text = res.toString();
        this.taskSwal.icon = 'error';
        this.taskSwal.iconColor = '#f26419ff';

        this.taskSwal.fire();

        this.getTasks();
      }
    });

    // if (this.taskStatus == true) {
    //   console.log('tarefa concluída!!');
    //   this.taskStatus = false;
    // } else if (this.taskStatus == false) {
    //   console.log('tarefa pendente!!');
    //   this.taskStatus = true;
    // }
  }

  userLogout() {
    //apaga as credenciais do localstorage;
    this.sessionStorageService.clear();

    //Vai para a página de login
    this.router.navigate(['/user']);
  }

  constructor(
    private taskService: TaskService,
    @Self() private sessionStorageService: StorageService,
    @SkipSelf() private localStorageService: StorageService,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string // private location: Location
  ) {}

  ngOnInit() {
    this.name = this.sessionStorageService.get('name') || '';
    this.getTasks();
    console.log('reload');
  }
}
