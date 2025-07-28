import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteServiceService {
  private favouritesCards: any[] = [];
  private favouritesub = new BehaviorSubject<any[]>([]);
  favourites$ = this.favouritesub.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favourites');
      if (saved) {
        this.favouritesCards = JSON.parse(saved);
        this.favouritesub.next(this.favouritesCards);
      }
    }
  }

  addFavourites(comic: any) {
    
    const saved = localStorage.getItem('favourites');
    if (saved) {
      this.favouritesCards = JSON.parse(saved);
    }

    if (!this.favouritesCards.some(item => item.id === comic.id)) {
      this.favouritesCards.push(comic);
      this.updateStorage();
    }
  }

  removeCard(id: number) {
    this.favouritesCards = this.favouritesCards.filter(card => card.id !== id);
    this.updateStorage();
  }

  private updateStorage() {
    this.favouritesub.next(this.favouritesCards);
    localStorage.setItem('favourites', JSON.stringify(this.favouritesCards));
  }
}
