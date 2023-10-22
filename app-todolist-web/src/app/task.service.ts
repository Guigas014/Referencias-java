import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('Guigas014:123456'),
    }),
  };

  url = 'http://localhost:8080/tasks/';

  //Cria uma task
  addTask(task: Task): Observable<Task> {
    console.log('chegou aqui!');

    const newTask = this.http.post<Task>(this.url, task, this.httpOptions).pipe(
      catchError((error: any): Observable<any> => {
        const e = error.error;
        console.log(e);
        return e;
      })
    );

    return newTask;
  }
}
