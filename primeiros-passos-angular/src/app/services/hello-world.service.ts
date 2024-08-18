import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelloWorldService {
  private apiURL = 'https://cat-fact.herokuapp.com/facts';

  constructor(private client: HttpClient) {}

  getHelloWorld(): Observable<any> {
    return this.client.get(this.apiURL);
  }
}
