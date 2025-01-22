import { Component } from '@angular/core'
import { MarketCarouselComponent } from '../../../components/market/carousel/carousel.component'
import { MarketCatalogueComponent } from "../../../components/market/catalogue/catalogue.component";

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [MarketCarouselComponent, MarketCatalogueComponent],
  templateUrl: './main.component.html',
})
export class MainPageComponent {
  imageSources = ['../assets/cat.jpg', '../assets/cat.jpg', '../assets/cat.jpg']
}
