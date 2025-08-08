import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../overview.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-overview',
  imports: [CommonModule,FooterComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit{
  
  detailCard: any;
  recommendedComics: any[] = [];
  selected:any[]=[]
  comicUrl = 'http://localhost:3001/COMICS';
  constructor(
    private router: Router,
    private overviewService: OverviewService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.overviewService.overviewCard$.subscribe((data: any) => {
      this.detailCard = data;
      this.getRandomRecommendedComics();
    });
  }
  getRandomRecommendedComics(): void {
    this.http.get<any[]>(this.comicUrl).subscribe((comics) => {
      const filtered = comics.filter(c => c.id !== this.detailCard?.id);
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      this.recommendedComics = shuffled.slice(0, 4);
    });
  }
  addToFav(card:any){
    this.http.post('https://jswtoken.onrender.com/auth/favourites', card, { withCredentials: true }).subscribe();
  }
  toOver(comic:any){
    this.selected=comic
    this.overviewService.addOverView(this.selected)
    this.router.navigate(['/overview'])
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
  toAcc(){
    this.router.navigate(['/userDetails']);
  }
}