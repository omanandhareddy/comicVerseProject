import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string) {
    return this.http.post('http://localhost:3000/auth/register', { username, password }, { withCredentials: true });
  }

  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/auth/login', { username, password }, { withCredentials: true });
  }
}
