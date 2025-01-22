import type { OnInit } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, Input, PLATFORM_ID, ViewEncapsulation } from '@angular/core'
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

@Component({
  selector: 'market-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MarketCarouselComponent implements OnInit {
  @Input({ required: true }) sources!: string[]

  swiper?: Swiper
  isBrowser = false
  isInited?: boolean

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  getSlideStyle(source: string) {
    return `background: url(${source}); background-size: cover; background-position: center;`
  }

  ngOnInit() {
    if (!this.isBrowser)
      return

    this.swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      speed: 400,
      spaceBetween: 0,
      loop: true,

      autoplay: {
        pauseOnMouseEnter: true,
        delay: 5000,
      },

      observer: true,

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
    this.isInited = true
  }
}
