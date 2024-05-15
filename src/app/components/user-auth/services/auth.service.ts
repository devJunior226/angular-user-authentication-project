import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  registerUser(userDetails: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}?email=${email}`);
  }
}
