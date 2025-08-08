import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  constructor(private router: Router, private http: HttpClient) {}

  user: any = {};
  showUpdateModal = false;
  updatedUsername = '';
  updatedPassword = '';

  ngOnInit(): void {
    this.http.get('https://jswtoken.onrender.com/auth/profile', { withCredentials: true })
      .subscribe((data: any) => {
        this.user = data;
        this.updatedUsername = data.username;
      });
  }

  toNavigate() {
    this.router.navigate(['/popular']);
  }

  toNew() {
    this.router.navigate(['/input-page']);
  }

  toFav() {
    this.router.navigate(['/favourites']);
  }

  toHome() {
    this.router.navigate(['/home-page']);
  }

  toHeroes() {
    this.router.navigate(['/charecter']);
  }

  // ✅ FIXED: now it's a proper method
  updateUser() {
    const body = {
      username: this.updatedUsername,
      password: this.updatedPassword
    };

    this.http.patch('https://jswtoken.onrender.com/auth/update', body, { withCredentials: true })
      .subscribe(
        (res: any) => {
          console.log('✅ Update success', res);
          this.showUpdateModal = false;
          this.ngOnInit();
        },
        (err) => {
          console.error('❌ Update failed', err);
        }
      );
  }

  openUpdateModal() {
    this.updatedUsername = this.user.username;
    this.updatedPassword = '';
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
  }
  toAcc(){
    this.router.navigate(['/userDetails']);
  }
}
