import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Basic ' + btoa('username' + ':' + 'password'),
    }),
  };

  url = 'http://localhost:8080/users/';

  // Cria um usuário
  addUser(user: User): Observable<User> {
    // console.log(user);

    const newUser = this.http.post<User>(this.url, user, this.httpOptions).pipe(
      catchError((error: any): Observable<any> => {
        const e = error.error.message;
        // console.log(e);
        return of(e as string);
      })
    );

    return newUser;
  }
}
