import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);
  
  return http.get('https://jswtoken.onrender.com/auth/profile', { withCredentials: true }).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login-page']);
      return of(false);
    })
  );
};
