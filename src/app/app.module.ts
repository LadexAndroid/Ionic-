import { FavorisPage } from './../pages/favoris/favoris';
import { DetailsSeriePage } from './../pages/details-serie/details-serie';
import { SeriePage } from './../pages/serie/serie';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OmdbProvider } from '../providers/omdb/omdb';
import { DetailsMoviePage } from '../pages/details-movie/details-movie';
import { DetailsEpisodePage } from '../pages/details-episode/details-episode';
import { DetailsSaisonPage } from '../pages/details-saison/details-saison';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    DetailsMoviePage,
    SeriePage,
    DetailsSeriePage,
    DetailsEpisodePage,
    DetailsSaisonPage,
    FavorisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    DetailsMoviePage,
    SeriePage,
    DetailsSeriePage,
    DetailsEpisodePage,
    DetailsSaisonPage,
    FavorisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OmdbProvider,
    FavoriteProvider
  ]
})
export class AppModule {}
