import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    tap({
      error: (error) => {
        console.error('HTTP Error:', error);
        if (error.status === 401) {
          router.navigate(['/login']);
        } else if (error.status === 404) {
          router.navigate(['/not-found']);
        } else {
          alert('Something went wrong! Please try again.');
        }
      }
    })
  );
};
