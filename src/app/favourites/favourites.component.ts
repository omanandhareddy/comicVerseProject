import { Component, OnInit } from '@angular/core';
import { FavouriteServiceService } from '../favourite-service.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-favourites',
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',

})
export class FavouritesComponent implements OnInit {
  favourites: any[] = [];

  constructor(private favouriteServiceService: FavouriteServiceService) {}

  ngOnInit(): void {
    this.favouriteServiceService.favourites$.subscribe((data) => {
      this.favourites = data;
    });
  }

  removeFromFavourites(id: number) {
    this.favouriteServiceService.removeCard(id);
  }
}
