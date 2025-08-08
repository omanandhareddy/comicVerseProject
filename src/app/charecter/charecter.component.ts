import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-charecter',
  imports: [HttpClientModule, CommonModule,FooterComponent],
  templateUrl: './charecter.component.html',
  styleUrl: './charecter.component.css'
})
export class CharecterComponent implements OnInit {
  constructor(private http: HttpClient,private router:Router) {}
  heros: any[] = [];
  selectedHero: any = null;
  url = 'https://dbjson-eosu.onrender.com/comicCharacters';

  ngOnInit(): void {
    this.http.get<any[]>(this.url).subscribe((data) => (this.heros = data));
  }

  selectHero(hero: any) {
    this.selectedHero = hero;
  }

  closeModal() {
    this.selectedHero = null;
  }
  goBack() {
  this.router.navigate(['/home-page'])
}

}
