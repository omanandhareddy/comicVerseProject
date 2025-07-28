import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FavouriteServiceService } from '../favourite-service.service';

@Component({
  selector: 'app-caurosel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
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

  constructor(private http: HttpClient,private favouriteServiceService:FavouriteServiceService) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3001/trendig').subscribe(data => this.trendingComics = data);
    this.http.get<any[]>('http://localhost:3001/originals').subscribe(data => this.originalComics = data);
    this.http.get<any[]>('http://localhost:3001/upcomingComicBooks').subscribe(data=>this.upcomingComics=data)
  }
  scrollLeft(container: HTMLDivElement) {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(container: HTMLDivElement) {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }

  showComic(comic: any) {
    this.selectedComic = comic;
  }
  addToFavourites(){
    if(this.selectedComic){
      this.favouriteServiceService.addFavourites(this.selectedComic)
      this.selectedComic=null
    }
  }
}
