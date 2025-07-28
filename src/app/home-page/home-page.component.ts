import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CauroselComponent } from '../caurosel/caurosel.component';
import { BannerComponent } from '../banner/banner.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent,CauroselComponent,BannerComponent,FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
