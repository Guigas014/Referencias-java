import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

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

  onSubmit(newUser: NgForm) {
    // console.log(newUser.value.password);
    this.user.username = newUser.value.username;
    this.user.password = newUser.value.password;
    console.log('user: ' + this.user.username);
    console.log('passsword: ' + this.user.password);

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
