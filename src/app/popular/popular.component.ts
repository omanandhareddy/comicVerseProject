import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilterPipe } from '../filter.pipe';
import { OverviewService } from '../overview.service';
import { FooterComponent } from '../footer/footer.component';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-popular',
  imports: [CommonModule,FormsModule,HttpClientModule,FilterPipe,FooterComponent,SkeletonLoaderComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent implements OnInit{
  searchText:string='';
  isLoading: boolean = true; 
  selectedComicOver:any[]=[]
  comicUrl='https://dbjson-eosu.onrender.com/COMICS'
  comicList:any[]=[]
  constructor(private router:Router,private http:HttpClient,private overviewService:OverviewService){}
    toHome(){
      this.router.navigate(['/home-page'])
    }
    toFavourites(){
      this.router.navigate(['/favourites']) 
    }
    toHeros(){
      this.router.navigate(['/charecter']);
    }
    toOverView(comic:any):any{
    this.selectedComicOver=comic
    this.overviewService.addOverView(this.selectedComicOver)
    this.router.navigate(['/overview'])
  }

ngOnInit(): any {
  this.http.get<any[]>(this.comicUrl).subscribe((data)=>{
    this.comicList = data.map(c => ({ ...c, loaded: false }));
    this.isLoading=false
  })
}

}
