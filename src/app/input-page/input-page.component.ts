import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputPipePipe } from '../input-pipe.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { OverviewService } from '../overview.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-input-page',
  imports: [FormsModule,CommonModule,HttpClientModule,InputPipePipe,LoaderComponent],
  templateUrl: './input-page.component.html',
  styleUrl: './input-page.component.css'
})
export class InputPageComponent {
inputFilter:string=''
  user:any={}
  updatedUsername = '';
  showModal = false;
constructor(private router:Router,private http:HttpClient,private overview:OverviewService){}
  toNavigate(){
     this.router.navigate(['/popular'])
  }
  toHome(){
    this.router.navigate(['/home-page'])
  }
comicList: any[] = [];
isLoading = true;
card:any[]=[];
ngOnInit(): void {
  this.http.get<any[]>('https://dbjson-eosu.onrender.com/COMICS').subscribe((data) => {
    this.comicList = data;
    this.isLoading = false;
  });
}
toFa(){
  this.router.navigate(['/favourites']) 
}
ToH(){
  this.router.navigate(['/charecter']);
}

toDetail(comic:any){
  this.card=comic
  this.overview.addOverView(this.card);
  this.router.navigate(['/overview']);
}
toggleModal() {
  this.showModal = !this.showModal;
}
logout() {
  this.router.navigate(['/login-page']);
}
toFav(){
  this.router.navigate(['/favourites']) 
 }
 toUser(){
  this.router.navigate(['/userDetails'])
}
}
