import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';

export interface Comic {
  id: number;
  title: string;
  cover: string;
  [key: string]: any;
}

export interface ApiResponse {
  message: string;
  success?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private readonly API_BASE = 'https://jswtoken.onrender.com/auth';
  
  private favouritesSubject = new BehaviorSubject<Comic[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public favourites$ = this.favouritesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public favouritesCount$ = this.favourites$.pipe(
    map(favourites => favourites.length)
  );

  constructor(private http: HttpClient) {
    this.loadFavourites();
  }

  loadFavourites(): Observable<Comic[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<Comic[]>(`${this.API_BASE}/favourites`, { 
      withCredentials: true 
    }).pipe(
      tap(favourites => {
        this.favouritesSubject.next(favourites || []);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading favourites:', error);
        this.errorSubject.next('Failed to load favourites');
        this.favouritesSubject.next([]);
        return of([]);
      }),
      finalize(() => {
        this.loadingSubject.next(false);
      })
    );
  }

  getFavourites(): Comic[] {
    return this.favouritesSubject.value;
  }

  getFavouritesCount(): number {
    return this.getFavourites().length;
  }

  isInFavourites(comicId: number): boolean {
    return this.getFavourites().some(comic => comic.id === comicId);
  }

  addToFavourites(comic: Comic): Observable<ApiResponse> {
    if (!comic || !comic.id) {
      console.error('Invalid comic data');
      return of({ message: 'Invalid comic data', success: false });
    }

    if (this.isInFavourites(comic.id)) {
      console.log('Comic already in favourites');
      return of({ message: 'Comic already in favourites', success: false });
    }

    const currentFavourites = this.getFavourites();
    this.favouritesSubject.next([...currentFavourites, comic]);

    return this.http.post<ApiResponse>(`${this.API_BASE}/favourites`, comic, { 
      withCredentials: true 
    }).pipe(
      map(response => ({ ...response, success: true })),
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding to favourites:', error);
        this.favouritesSubject.next(currentFavourites);
        this.errorSubject.next('Failed to add to favourites');
        return of({ message: 'Failed to add to favourites', success: false });
      })
    );
  }

  removeFromFavourites(comicId: number): Observable<ApiResponse> {
    const currentFavourites = this.getFavourites();
    const comicExists = this.isInFavourites(comicId);

    if (!comicExists) {
      return of({ message: 'Comic not in favourites', success: false });
    }

    const updatedFavourites = currentFavourites.filter(comic => comic.id !== comicId);
    this.favouritesSubject.next(updatedFavourites);

    // Use PATCH for backward compatibility with your existing backend
    return this.http.patch<ApiResponse>(`${this.API_BASE}/favourites/remove`, { id: comicId }, { 
      withCredentials: true 
    }).pipe(
      map(response => ({ ...response, success: true })),
      catchError((error: HttpErrorResponse) => {
        console.error('Error removing from favourites:', error);
        this.favouritesSubject.next(currentFavourites);
        this.errorSubject.next('Failed to remove from favourites');
        return of({ message: 'Failed to remove from favourites', success: false });
      })
    );
  }

  toggleFavourite(comic: Comic): Observable<ApiResponse> {
    if (this.isInFavourites(comic.id)) {
      return this.removeFromFavourites(comic.id);
    } else {
      return this.addToFavourites(comic);
    }
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  refreshFavourites(): Observable<Comic[]> {
    return this.loadFavourites();
  }
}