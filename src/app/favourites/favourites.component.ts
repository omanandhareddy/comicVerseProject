import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewService } from '../overview.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { FavouritesService } from '../favourites.service'; // ADD THIS IMPORT
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-favourites',
  imports: [CommonModule, FooterComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: any[] = [];
  favComic: any[] = [];
  isLoading = false; // ADD THIS
  error: string | null = null; // ADD THIS

  private destroy$ = new Subject<void>(); // ADD THIS

  constructor(
    private favouritesService: FavouritesService, // REPLACE HttpClient with this
    private overview: OverviewService,
    private router: Router
  ) {}

  // REPLACE ngOnInit METHOD
  ngOnInit(): void {
    this.favouritesService.favourites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favourites => {
        this.favourites = favourites;
      });

    this.favouritesService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    this.favouritesService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.error = error;
      });
  }

  // ADD THIS METHOD
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // REPLACE removeFromFavourites METHOD
  removeFromFavourites(id: number): void {
    if (confirm('Are you sure you want to remove this comic from favourites?')) {
      this.favouritesService.removeFromFavourites(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success) {
              console.log('Removed from favourites successfully');
            } else {
              console.log('Failed to remove:', response.message);
            }
          },
          error: (error) => {
            console.error('Error removing from favourites:', error);
          }
        });
    }
  }

  toO(comic: any): void {
    this.favComic = comic;
    this.overview.addOverView(this.favComic);
    this.router.navigate(['/overview']);
  }

  back(): void {
    this.router.navigate(['/home-page']);
  }

  // ADD THESE NEW METHODS
  refresh(): void {
    this.favouritesService.refreshFavourites()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  clearError(): void {
    this.favouritesService.clearError();
  }
}