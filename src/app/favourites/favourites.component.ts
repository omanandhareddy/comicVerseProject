import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { OverviewService } from '../overview.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-favourites',
  imports: [CommonModule,FooterComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',

})
export class FavouritesComponent implements OnInit {
  favourites: any[] = [];
  FavComic:any[]=[];

  constructor(private http:HttpClient, private  Overview:OverviewService,private router:Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://jswtoken.onrender.com/auth/favourites', { withCredentials: true })
      .subscribe(res => {
        this.favourites = res;
      });
  }
  
  removeFromFavourites(id: number) {
    this.http.patch('https://jswtoken.onrender.com/auth/favourites/remove', { id }, { withCredentials: true })
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  
  toO(comic:any){
    this.FavComic=comic;
    this.Overview.addOverView(this.FavComic)
    this.router.navigate(['/overview'])
  }
}
