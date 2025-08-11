import { Component, OnInit, OnDestroy } from '@angular/core';
import { OverviewService } from '../overview.service';
import { FavouritesService } from '../favourites.service'; // ADD THIS IMPORT
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, FooterComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit, OnDestroy {
  user: any = {};
  detailCard: any;
  recommendedComics: any[] = [];
  selected: any[] = [];
  updatedUsername: string = '';
  comicUrl = 'https://dbjson-eosu.onrender.com/COMICS';
  
  private destroy$ = new Subject<void>(); // ADD THIS

  constructor(
    private router: Router,
    private overviewService: OverviewService,
    private http: HttpClient,
    private favouritesService: FavouritesService // ADD THIS
  ) {}

  ngOnInit(): void {
    this.overviewService.overviewCard$.subscribe((data: any) => {
      this.detailCard = data;
      this.getRandomRecommendedComics();
    });

    this.http.get('https://jswtoken.onrender.com/auth/profile', { withCredentials: true })
      .subscribe((data: any) => {
        this.user = data;
        this.updatedUsername = data.username;
      });
  }

  // ADD THIS METHOD
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getRandomRecommendedComics(): void {
    this.http.get<any[]>(this.comicUrl).subscribe((comics) => {
      const filtered = comics.filter(c => c.id !== this.detailCard?.id);
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      this.recommendedComics = shuffled.slice(0, 4);
    });
  }

  // REPLACE THIS METHOD
  addToFav(card: any): void {
    this.favouritesService.addToFavourites(card)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Added to favourites successfully');
          } else {
            console.log('Failed to add:', response.message);
          }
        },
        error: (error) => {
          console.error('Error adding to favourites:', error);
        }
      });
  }

  // ADD THESE NEW METHODS
  isInFavourites(comicId: number): boolean {
    return this.favouritesService.isInFavourites(comicId);
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

  toOver(comic: any): void {
    this.selected = comic;
    this.overviewService.addOverView(this.selected);
    this.router.navigate(['/overview']);
  }

  toNavigate(): void {
    this.router.navigate(['/popular']);
  }

  toNew(): void {
    this.router.navigate(['/input-page']);
  }

  toFav(): void {
    this.router.navigate(['/favourites']);
  }

  toHome(): void {
    this.router.navigate(['/home-page']);
  }

  toHeroes(): void {
    this.router.navigate(['/charecter']);
  }

  toAcc(): void {
    this.router.navigate(['/userDetails']);
  }
}
