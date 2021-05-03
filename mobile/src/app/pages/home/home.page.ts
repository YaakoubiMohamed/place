import { Component, ElementRef, ViewChild } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { IonSlides } from "@ionic/angular";
import { UtilService } from "src/app/util.service";
import { CategorieService } from '../../shared/services/categorie.service';
import { Categorie } from '../../shared/classes/categorie';
import { Offre } from '../../shared/classes/offre';
import { OffresService } from './../../shared/services/offres.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  cartData: any = [];
  discount: any = [];
  services: any = [];
  data: any = [];
  token: string = "";
  categories: Categorie[] = [];
  offres: Offre[] = [];
  constructor( private util: UtilService,
    private categorieservice: CategorieService,
    private router: Router,
    private offreservice: OffresService) {}

  ionViewDidLoad() {}

  cart() {
    this.cartData = JSON.parse(localStorage.getItem("cart-data"));

    if (this.cartData == null) {
      this.util.presentToast("Cart is Empty");
    } else {
      this.util.navCtrl.navigateForward("tabs/home/cart");
    }
  }

  slideOpts = {
    initialSlide: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 1.2,
    slidesPerGroup: 1,
    spaceBetween: -8,
    speed: 400,
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(
          `${swiper.params.containerModifierClass}coverflow`
        );
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth,
          height: swiperHeight,
          slides,
          $wrapperEl,
          slidesSizesGrid,
          $,
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal
          ? -transform$$1 + swiperWidth / 2
          : -transform$$1 + swiperHeight / 2;
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier =
            ((center - slideOffset - slideSize / 2) / slideSize) *
            params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * offsetMultiplier;
          let translateX = isHorizontal ? params.stretch * offsetMultiplier : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex =
            -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal
              ? $slideEl.find(".swiper-slide-shadow-left")
              : $slideEl.find(".swiper-slide-shadow-top");
            let $shadowAfterEl = isHorizontal
              ? $slideEl.find(".swiper-slide-shadow-right")
              : $slideEl.find(".swiper-slide-shadow-bottom");
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(
                `<div class="swiper-slide-shadow-${
                  isHorizontal ? "left" : "top"
                }"></div>`
              );
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(
                `<div class="swiper-slide-shadow-${
                  isHorizontal ? "right" : "bottom"
                }"></div>`
              );
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length)
              $shadowBeforeEl[0].style.opacity =
                offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length)
              $shadowAfterEl[0].style.opacity =
                -offsetMultiplier > 0 ? -offsetMultiplier : 0;
          }
        }

        // Set correct perspective for IE10
        if (
          swiper.support.pointerEvents ||
          swiper.support.prefixedPointerEvents
        ) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(duration);
      },
    },
  };

  @ViewChild("mySlider") slider: IonSlides; //second way

  getIndex() {
    this.slider.getActiveIndex();
  }

  check(id) {
    localStorage.setItem("order-id", id);
    this.util.navCtrl.navigateForward("tabs/orders/billing-detail");
  }

  ngOnInit() {
    this.categorieservice.getCategories().subscribe(admin => {
      this.categories = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Categorie;
      });      
      console.log(this.categories);           
    });
    this.offreservice.getOffres().subscribe(admin => {
      this.offres = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Offre;
      });      
      console.log(this.offres);           
    });
  }

  ionViewDidEnter() {}

  ionViewWillEnter() {
    this.cartData = JSON.parse(localStorage.getItem("cart-data"));
    //this.util.startLoad();
    localStorage.removeItem("address-id");
    localStorage.removeItem("date");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("SelectAddress");
    localStorage.removeItem("coupon-id");
    localStorage.removeItem("discount_");
    localStorage.removeItem("discount_type");
    
    this.token = localStorage.getItem("token");

    
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  servicesId: any = [];
  categorieDetail(s) {
    /*
    let navigationExtra: NavigationExtras = {
      state: {
        id: id.id,
      },
    };
    this.servicesId = JSON.parse(localStorage.getItem("servicesId"))
      ? JSON.parse(localStorage.getItem("servicesId"))
      : [];
      */
    //this.servicesId.push(id);
    localStorage.setItem("id",s.id);
    this.router.navigate(["/categorie"], { queryParams: { id: s.id }});
    //localStorage.setItem("product-id");
  }
}
