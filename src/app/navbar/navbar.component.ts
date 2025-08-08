import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user:any={}
  updatedUsername = '';
  showModal = false;
   profile = {
    name: '',
    email: '',
    favComics: ''
  };
  constructor(private router:Router,private http:HttpClient){}
  ngOnInit(): void {
    this.http.get('https://jswtoken.onrender.com/auth/profile', { withCredentials: true })
      .subscribe((data: any) => {
        this.user = data;
        this.updatedUsername = data.username;
      });
  }
  toNavigate(){
     this.router.navigate(['/popular'])
  }
  toNew(){
    this.router.navigate(['/input-page'])
  }
  toFav(){
   this.router.navigate(['/favourites']) 
  }
    toggleModal() {
    this.showModal = !this.showModal;
  }

  logout() {
    this.router.navigate(['/login-page']);
  }
  toChar(){
    this.router.navigate(['/charecter']);
  }
  toUser(){
    this.router.navigate(['/userDetails'])
  }

}
