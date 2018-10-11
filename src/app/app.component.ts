import { Component,ViewChild } from '@angular/core';
import { Platform,Nav, AlertController, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  showedAlert: boolean = false;
  confirmAlert: any;
  constructor(public platform: Platform, statusBar: StatusBar,public alertCtrl: AlertController, private ionicApp: IonicApp, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#7293cc");
      splashScreen.hide();
      platform.registerBackButtonAction(() => {
        let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
        if (activePortal) {
          activePortal.dismiss();
          activePortal.onDidDismiss(() => { });
          //return;
        }

        if (this.ionicApp._modalPortal.getActive()) {
          this.ionicApp._modalPortal.getActive().dismiss();
          this.ionicApp._modalPortal.getActive().onDidDismiss(() => { });
          return;
        }
        if (this.nav.length() == 1) {
          if (!this.showedAlert) {
            this.confirmExitApp();
          } else {
            this.showedAlert = false;
            this.confirmAlert.dismiss();
          }
        }
        if (this.nav.canGoBack()) {
          this.nav.pop();
        }

      });
    });
  }
  // confirmation pop up to exit from app
  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert = this
      .alertCtrl
      .create({
        subTitle: "Do you want to exit from the app?",
        buttons: [
          {
            text: 'NO',
            handler: () => {
              this.showedAlert = false;
              return;
            }
          }, {
            text: 'YES',
            handler: () => {
              this
                .platform
                .exitApp();
            }
          }
        ]
      });
    this
      .confirmAlert
      .present();
  }
}

