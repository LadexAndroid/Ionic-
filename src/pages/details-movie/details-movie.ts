
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { findLinkByComponentData } from 'ionic-angular/umd/navigation/url-serializer';
import { Observable } from 'rxjs/Observable';
import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DetailsMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-movie',
  templateUrl: 'details-movie.html',
})

export class DetailsMoviePage {
  items: any;
  isFavorite = false;
  public allseasons: any;
  favoriss: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public favoriteservice: FavoriteProvider, public listfavs: Storage) {
    this.items = new Observable<any>();
    this.favoriteservice.isFavorite(this.navParams.get('data')).then(isFav => {
      this.isFavorite = isFav;
    })

    this.listfavs.get('favoriteFilms').then(data => console.log(JSON.stringify(data)));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsMoviePage');
  }
  ngOnInit() {
    console.log("LOADING");
    this.findMovie();

  }
  ViewTrailer() {
    window.open('https://www.youtube.com/results?search_query=' + this.items[0].Title + 'trailer', '_blank');
  }

  findMovie() {
    let data: Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&i=' + this.navParams.get('data'));
    data.subscribe(result => {
      this.items = result;
    });
  }

  favoriteFilm() {
    this.favoriteservice.favoriteFilm(this.navParams.get('data')).then(() => {
      this.isFavorite = true;
    });
  }

  unfavoriteFilm() {
    this.favoriteservice.unfavoriteFilm(this.navParams.get('data')).then(() => {
      this.isFavorite = false;
    });
  }

}
