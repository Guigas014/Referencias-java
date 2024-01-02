import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Basic ' + btoa('Guigas014:123456'),
    }),
  };

  url = 'http://localhost:8080/tasks/';

  //inseri um task no banco de dados
  addTask(task: Task, token: string): Observable<Task> {
    console.log('chegou aqui!');

    //Atualiza o Authorization do header.
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      `Basic ${btoa(token)}`
    );
    // console.log(this.httpOptions.headers.getAll('Authorization'));

    const newTask = this.http.post<Task>(this.url, task, this.httpOptions).pipe(
      catchError((error: any): Observable<any> => {
        const e = error.error;
        console.log(e);
        return of(e as string);
      })
    );

    return newTask;
  }
}
