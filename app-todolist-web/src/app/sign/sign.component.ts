import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { User } from '../types/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
})
export class SignComponent {
  constructor(private userService: UserService, private router: Router) {}

  user: User = {
    username: '',
    password: '',
    name: '',
  };

  //Pertence ao swal do sweetAlert
  @ViewChild('mainSwal')
  public readonly mainSwal!: SwalComponent;

  onSubmit(newUser: NgForm) {
    this.user.username = newUser.form.value.username;
    this.user.password = newUser.form.value.password;
    this.user.name = newUser.form.value.name;

    console.log(this.user);

    if (this.user.username == '') {
      this.mainSwal.title = 'Algo errado!';
      this.mainSwal.text = 'nome de usúario deve ser preenchido!';
      this.mainSwal.fire();
      return;
    }

    if (this.user.password == '') {
      this.mainSwal.title = 'Algo errado!';
      this.mainSwal.text = 'a senha deve ser preenchido!';

      this.mainSwal.fire();
      return;
    }

    if (this.user.name == '') {
      this.mainSwal.title = 'Algo errado!';
      this.mainSwal.text = 'o nome deve ser preenchido!';

      this.mainSwal.fire();
      return;
    }

    if (this.user.password.length < 8) {
      this.mainSwal.title = 'Algo errado!';
      this.mainSwal.text = 'a senha deve ter no mínimo 8 dígitos!';

      this.mainSwal.fire();
      return;
    }

    //Salva o usuário no banco de dados.
    this.userService.addUser(this.user).subscribe((res) => {
      //Se o usuário foi inserido no DB.
      if (res.username == this.user.username) {
        this.mainSwal.title = 'Tudo certo!';
        this.mainSwal.text = `Usuário ${res.username} criado com sucesso!`;
        this.mainSwal.icon = 'success';
        this.mainSwal.iconColor = 'green';

        this.mainSwal.fire();

        //REsolver oproblema do password. Isso não vai resolver o problema.
        // const password = res.password.replace('.', '');
        // console.log(atob(res.password));
        // console.log(this.user);

        //Faz o login salvando o usuário no localstorage do navegador.

        //Vai para ao Home
        this.router.navigate(['/user']);

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
}
