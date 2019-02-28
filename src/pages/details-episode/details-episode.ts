import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { findLinkByComponentData } from 'ionic-angular/umd/navigation/url-serializer';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the DetailsEpisodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-episode',
  templateUrl: 'details-episode.html',
})
export class DetailsEpisodePage {

  public items: any; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.items = new Observable<any>();
    this.findMovie();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsEpisodePage');
  }
  findMovie() {
    let data: Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&i=' + this.navParams.get('data'));
    data.subscribe(result => {
      this.items = result;
    });
  }
}
