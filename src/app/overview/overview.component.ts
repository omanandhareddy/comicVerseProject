import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../overview.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-overview',
  imports: [CommonModule,FooterComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit{
  detailCard: any;
  recommendedComics: any[] = [];

  constructor(
    private router: Router,
    private overviewService: OverviewService
  ) {}

  ngOnInit(): void {
    this.overviewService.overviewCard$.subscribe((data: any) => {
      this.detailCard = data;

      if (Array.isArray(data?.allComics)) {
        this.recommendedComics = data.allComics
          .filter((c: any) => c?.title?.startsWith('I'))
          .slice(0, 5);
      } else {
        this.recommendedComics = [];
      }
    });
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
    this.router.navigate(['/home']);
  }

  toHeroes(): void {
    this.router.navigate(['/heroes']);
  }
}