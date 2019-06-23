
import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {AccSettingsPage} from "../pages/acc-settings/acc-settings";
import {LinkToBusinessPage} from "../pages/link-to-business/link-to-business";
import {AboutPage} from "../pages/about/about";
import { AlertController } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  accSettingsPage = AccSettingsPage;
  linkToBusinessPage = LinkToBusinessPage;
  loadAboutPage = AboutPage;
  loadHomePage = HomePage;





  @ViewChild('nav') nav: Nav;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              private menuCtrl:MenuController,
              ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

}




