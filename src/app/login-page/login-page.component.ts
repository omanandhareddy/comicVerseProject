import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-login-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  
})
export class LoginPageComponent {
  Username = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onLogin() {
    this.authService.login(this.Username, this.password).subscribe({
      next: () => this.router.navigate(['/home-page']),
      error: err => this.errorMsg = err.error.message
    });
  }
}