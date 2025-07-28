import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  Username = '';
  password = '';
  ConfirmPassword = '';
  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onHome() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.Username || !this.password || !this.ConfirmPassword) {
      this.errorMsg = 'Please fill in all fields!';
      return;
    }
    if (this.password !== this.ConfirmPassword) {
      this.errorMsg = 'Passwords do not match!';
      return;
    }
    this.authService.register(this.Username, this.password).subscribe({
      next: (res: any) => {
        this.successMsg = res.message;
        setTimeout(() => {
          this.router.navigate(['/home-page']);
        }, 1000);
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Something went wrong!';
      },
    });
  }
  toLogin() {
    this.router.navigate(['/login-page']);
  }
}
