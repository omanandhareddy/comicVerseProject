import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string) {
    return this.http.post('https://jswtoken.onrender.com/auth/register', { username, password }, { withCredentials: true });
  }

  login(username: string, password: string) {
    return this.http.post('https://jswtoken.onrender.com/auth/login', { username, password }, { withCredentials: true });
  }
}
