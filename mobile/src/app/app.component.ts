import { Component, QueryList, ViewChildren } from '@angular/core';
import { IonRouterOutlet, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  curency: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private toastController:ToastController,
    private oneSignal:OneSignal
  ) {
    this.initializeApp();
    console.log = function () {};
  }
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  
  backButtonEvent() {

    this.platform.backButton.subscribe(() => {
      if (window.location.pathname == "/tabs/home") {
        navigator['app'].exitApp();
      }
    });
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === "/tabs/home" ||
          this.router.url === "/login" ||
          this.router.url === "/tabs/profile"
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator["app"].exitApp();
          } else {
            this.showToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: "press back again to exit App.",
      duration: 2000,
      mode:'ios',
      cssClass:"my-toast",
    });
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#999999");
      this.splashScreen.hide();
      this.backButtonEvent();
    });

    
  }


}
