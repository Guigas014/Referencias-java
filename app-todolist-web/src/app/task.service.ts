import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, take } from 'rxjs';

import { Task } from './task';
import { User } from './user';

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

  updateAuthorization(token: string) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      `Basic ${btoa(token)}`
    );
  }

  //inseri um task no banco de dados
  addTask(task: Task, token: string): Observable<Task> {
    console.log('chegou aqui!');

    //Atualiza o Authorization do header.
    this.updateAuthorization(token);

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

  updateTask(task: Task, token: string, id: number): Observable<Task> {
    //Atualiza o Authorization do header.
    this.updateAuthorization(token);

    const updatedTask = this.http
      .put<Task>(this.url + id, task, this.httpOptions)
      .pipe(
        catchError((error: any): Observable<any> => {
          const e = error.error;
          console.log(e);
          return of(e as string);
        })
      );

    return updatedTask;
  }

  getTasks(token: string): Observable<Task[]> {
    //Atualiza o Authorization do header.
    this.updateAuthorization(token);

    const tasks = this.http.get<Task[]>(this.url, this.httpOptions).pipe(
      catchError((error: any): Observable<any> => {
        const e = error.error;
        console.log(e);
        return of(e as string);
      })
    );

    // console.log(tasks);
    return tasks;
  }

  deleteTask(id: any, token: string): Observable<null> {
    //Atualiza o Authorization do header.
    this.updateAuthorization(token);
    // console.log(this.httpOptions);

    const message = this.http
      .delete<null>(this.url + id, this.httpOptions)
      .pipe(
        catchError((error: any): Observable<any> => {
          const e = error.error;
          console.log(e);
          return of(e as string);
        })
      );

    // console.log(message);
    return message;
  }

  updateStatus(id: any, token: string): Observable<Task> {
    //Atualiza o Authorization do header.
    this.updateAuthorization(token);
    // console.log(this.httpOptions);

    const task = this.http
      .put<Task>(`${this.url}status/${id}`, '', this.httpOptions)
      .pipe(
        catchError((error: any): Observable<any> => {
          const e = error.error;
          console.log(e);

          return of(e as string);
        })
      );
    return task;
  }

  updateName(name: string, token: string): Observable<User> {
    //Atualiza o Authorization do header.
    this.updateAuthorization(token);

    const userUpdate = this.http
      .patch<User>(`${this.url}user/name`, name, this.httpOptions)
      .pipe(
        catchError((error: any): Observable<any> => {
          const e = error.error;
          console.log(e);
          return of(e as string);
        })
      );

    return userUpdate;
  }
}
