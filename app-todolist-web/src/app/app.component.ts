import { Component, OnInit, Self } from '@angular/core';
import { BROWSER_STORAGE, StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    StorageService,
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage },
  ],
})
export class AppComponent {
  title = 'todo list';
  // username?: string = '';

  // constructor(@Self() private sessionStorageService: StorageService) {}

  // ngOnInit() {
  //   const username = this.sessionStorageService.get('username');
  // }
}
