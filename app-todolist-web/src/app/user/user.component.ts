import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = {
    name: 'Guilherme',
    username: 'Guigas014',
    password: '123456',
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.addUser(this.user).subscribe((res) => console.log(res));
  }
}
