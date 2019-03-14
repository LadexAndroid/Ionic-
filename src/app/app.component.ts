import { FavorisPage } from './../pages/favoris/favoris';
import { SeriePage } from './../pages/serie/serie';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  hellopage: any = HelloIonicPage;
  SeriePage: any = SeriePage;
  FavorisPage: any = FavorisPage;
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{ title: string, component: any }>;
  alertCtrl: any;

  constructor(private androidPermissions: AndroidPermissions,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {

      androidPermissions.requestPermissions(
        [
          androidPermissions.PERMISSION.CAMERA,
          androidPermissions.PERMISSION.CALL_PHONE,
          androidPermissions.PERMISSION.GET_ACCOUNTS,
          androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]
      );

    })
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Films', component: HelloIonicPage },
      { title: 'Series', component: SeriePage },
      { title: 'Favoris', component: FavorisPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  salutation() {

    alert("yoyo");
  }

}
