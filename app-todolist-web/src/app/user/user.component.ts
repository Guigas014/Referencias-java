import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user';
import { UserService } from '../user.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  };
  // user: User | undefined;

  constructor(private userService: UserService) {}

  //Pertence ao swal do sweetAlert
  @ViewChild('mainSwal')
  public readonly mainSwal!: SwalComponent;

  onSubmit(newUser: NgForm) {
    this.user.username = newUser.value.username;
    this.user.password = newUser.value.password;
    console.log('user: ' + this.user.username);
    console.log('passsword: ' + this.user.password);

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

    console.log('Continua!');
    this.mainSwal.title = 'Tudo certo!';
    this.mainSwal.text = 'Usuário criado com sucesso!';
    this.mainSwal.icon = 'success';
    this.mainSwal.iconColor = 'green';

    this.mainSwal.fire();

    // this.userService.addUser(this.user).subscribe((res) => console.log(res));
    this.userLogin();
  }

  userLogin() {
    //manda as credenciais para o localstorage;
  }

  userLogout() {
    //apaga as credenciais para o localstorage;
  }

  ngOnInit() {
    // this.userService.addUser(this.user).subscribe((res) => console.log(res));
  }
}
