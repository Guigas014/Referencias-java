import { Component, OnInit, Self, SkipSelf, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { User } from '../user';
import { UserService } from '../user.service';
import { BROWSER_STORAGE, StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [
    StorageService,
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage },
  ],
})
export class UserComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  };
  // user: User | undefined;

  constructor(
    private userService: UserService,
    @Self() private sessionStorageService: StorageService,
    @SkipSelf() private localStorageService: StorageService,
    private router: Router
  ) {}

  //Pertence ao swal do sweetAlert
  @ViewChild('mainSwal')
  public readonly mainSwal!: SwalComponent;

  onSubmit(newUser: NgForm) {
    this.user.username = newUser.value.username;
    this.user.password = newUser.value.password;
    console.log('user: ' + this.user.username);
    console.log('passsword: ' + this.user.password);

    //Trata os dados vindos do formulário.
    if (this.user.username == '' || this.user.password == '') {
      this.mainSwal.title = 'Algo errado!';
      this.mainSwal.text = 'nome de usúario ou senha deve ser preenchido!';

      this.mainSwal.fire();
      return;
    }

    if (this.user.password.length < 8) {
      this.mainSwal.title = 'Algo errado!';
      this.mainSwal.text = 'a senha deve ter no mínimo 8 dígitos!';

      this.mainSwal.fire();
      return;
    }

    // console.log('Continua!');

    //Salva io usuário no banco de dados.
    this.userService.addUser(this.user).subscribe((res) => {
      if (res.username == this.user.username) {
        this.mainSwal.title = 'Tudo certo!';
        this.mainSwal.text = `Usuário ${res.username} criado com sucesso!`;
        this.mainSwal.icon = 'success';
        this.mainSwal.iconColor = 'green';

        this.mainSwal.fire();

        //Faz o login salvando o usuário no localstorage do navegador.
        this.userLogin(this.user);

        //Vai para a paágina de tasks
        this.router.navigate(['/task']);

        // console.log(res);
      } else {
        this.mainSwal.title = 'Algo errado!';
        this.mainSwal.text = res.toString();
        this.mainSwal.icon = 'error';
        this.mainSwal.iconColor = '#f26419ff';

        this.mainSwal.fire();
        // console.log(res);
      }
    });
  }

  userLogin(signUser: User) {
    //manda as credenciais para o localstorage;
    this.sessionStorageService.set('username', signUser.username);
    this.sessionStorageService.set('password', signUser.password);
  }

  userLogout() {
    //apaga as credenciais para o localstorage;
    this.sessionStorageService.clear();
  }

  ngOnInit() {
    // this.userService.addUser(this.user).subscribe((res) => console.log(res));
  }
}
