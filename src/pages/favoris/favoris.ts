import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { findLinkByComponentData } from 'ionic-angular/umd/navigation/url-serializer';
import { Observable } from 'rxjs/Observable';
import { DetailsSaisonPage } from '../details-saison/details-saison';
import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FavorisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public favoriteservice: FavoriteProvider, public listfavs: Storage) {
    this.findListOfFavs();
  }

  ionViewDidLoad() {

  }
  findListOfFavs() {
    let arr = [];
    this.listfavs.get('favoriteFilms').then(data => {
      data.forEach(element => {
        let donns: Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&i=' + element);
        donns.subscribe(result => {
          arr.push(result);
        });
      });
      this.items = arr;
    });
  }
}
