import { Component, OnInit, Self, SkipSelf, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { BROWSER_STORAGE, StorageService } from '../service/storage.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { User } from '../types/user';
import { UserService } from '../service/user.service';

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

  token: string = '';

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
    // console.log('user: ' + this.user.username);
    // console.log('passsword: ' + this.user.password);

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

    // console.log(this.user.password);

    //Chamar um método para ver se o usuário existe no banco e pegar esse usúario.
    this.userService.getUser(this.user).subscribe((res) => {
      //Se o usuário existe no DB
      if (res.username == this.user.username) {
        this.userLogin(res);

        //Vai para a página de tasks
        this.router.navigate(['/task']);

        console.log(res);
      } else {
        this.mainSwal.title = 'Algo errado!';
        this.mainSwal.text = res.toString();
        this.mainSwal.icon = 'error';
        this.mainSwal.iconColor = '#f26419ff';

        this.mainSwal.fire();
      }
    });
  }

  userLogin(userLoged: User) {
    //manda as credenciais para o localstorage;
    this.sessionStorageService.set('username', userLoged.username);
    this.sessionStorageService.set('password', userLoged.password);
    this.sessionStorageService.set(
      'name',
      userLoged.name != null ? userLoged.name : ''
    );
  }

  ngOnInit() {}
}
