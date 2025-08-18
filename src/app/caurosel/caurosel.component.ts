import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { OverviewService } from '../overview.service';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-caurosel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,SkeletonLoaderComponent],
  templateUrl: './caurosel.component.html',
  styleUrl: './caurosel.component.css'
})
export class CauroselComponent implements OnInit {
  @ViewChild('trendingScroll') trendingScroll!: ElementRef<HTMLDivElement>;
  @ViewChild('originalScroll') originalScroll!: ElementRef<HTMLDivElement>;
  @ViewChild('UpComingScroll') UpComingScroll!: ElementRef<HTMLDivElement>;

  trendingComics: any[] = [];
  originalComics: any[] = [];
  upcomingComics:any[]=[]
  selectedComic: any = null;
  isLoad:boolean=true;
  comic:any[]=[];

  constructor(private http: HttpClient,private router:Router,private overview:OverviewService) {}

  ngOnInit() {
    this.http.get<any[]>('https://dbjson-eosu.onrender.com/trendig').subscribe(data => this.trendingComics = data);
    this.http.get<any[]>('https://dbjson-eosu.onrender.com/originals').subscribe(data => this.originalComics = data);
    this.http.get<any[]>('https://dbjson-eosu.onrender.com/upcomingComicBooks').subscribe(data=>this.upcomingComics=data)
    this.isLoad=false
  }
  scrollLeft(container: HTMLDivElement) {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(container: HTMLDivElement) {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }
  toOverViewPage(selectedComic:any){
  this.comic=selectedComic
  this.overview.addOverView(this.comic)
    this.router.navigate(['/overview'])
  }
  showComic(comic: any) {
    this.selectedComic = comic;
  }
  addToFavourites(){
    if(this.selectedComic){
      this.http.post('https://jswtoken.onrender.com/auth/favourites', this.selectedComic, { withCredentials: true }).subscribe();
      this.selectedComic=null
    }
  }
}