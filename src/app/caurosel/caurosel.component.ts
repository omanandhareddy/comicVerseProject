import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritesService } from '../favourites.service'; // ADD THIS IMPORT
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-caurosel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './caurosel.component.html',
  styleUrl: './caurosel.component.css'
})
export class CauroselComponent implements OnInit, OnDestroy {
  @ViewChild('trendingScroll') trendingScroll!: ElementRef<HTMLDivElement>;
  @ViewChild('originalScroll') originalScroll!: ElementRef<HTMLDivElement>;
  @ViewChild('UpComingScroll') UpComingScroll!: ElementRef<HTMLDivElement>;

  trendingComics: any[] = [];
  originalComics: any[] = [];
  upcomingComics: any[] = [];
  selectedComic: any = null;

  private destroy$ = new Subject<void>(); // ADD THIS

  constructor(
    private http: HttpClient,
    private favouritesService: FavouritesService // ADD THIS
  ) {}

  ngOnInit() {
    this.http.get<any[]>('https://dbjson-eosu.onrender.com/trendig').subscribe(data => this.trendingComics = data);
    this.http.get<any[]>('https://dbjson-eosu.onrender.com/originals').subscribe(data => this.originalComics = data);
    this.http.get<any[]>('https://dbjson-eosu.onrender.com/upcomingComicBooks').subscribe(data => this.upcomingComics = data);
  }

  // ADD THIS METHOD
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  // REPLACE THIS METHOD
  addToFavourites(): void {
    if (this.selectedComic) {
      this.favouritesService.addToFavourites(this.selectedComic)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success) {
              console.log('Added to favourites successfully');
              this.selectedComic = null;
            } else {
              console.log('Failed to add:', response.message);
            }
          },
          error: (error) => {
            console.error('Error adding to favourites:', error);
          }
        });
    }
  }

  // ADD THESE NEW METHODS
  isInFavourites(comicId: number): boolean {
    return this.favouritesService.isInFavourites(comicId);
  }

  quickAddToFav(comic: any): void {
    this.favouritesService.addToFavourites(comic)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (error) => {
          console.error('Error adding to favourites:', error);
        }
      });
  }

  toggleFavourite(comic: any): void {
    this.favouritesService.toggleFavourite(comic)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (error) => {
          console.error('Error toggling favourite:', error);
        }
      });
  }
}
