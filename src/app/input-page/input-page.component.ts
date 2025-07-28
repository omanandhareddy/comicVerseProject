import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputPipePipe } from '../input-pipe.pipe';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-input-page',
  imports: [FormsModule,CommonModule,HttpClientModule,InputPipePipe,LoaderComponent],
  templateUrl: './input-page.component.html',
  styleUrl: './input-page.component.css'
})
export class InputPageComponent {
inputFilter:string=''
constructor(private router:Router,private http:HttpClient){}
  toNavigate(){
     this.router.navigate(['/popular'])
  }
  toHome(){
    this.router.navigate(['/home-page'])
  }
comicList: any[] = [];
isLoading = true;
ngOnInit(): void {
  this.http.get<any[]>('http://localhost:3001/COMICS').subscribe((data) => {
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
}
