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

  public items:any;
  public TheEpisode:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.findMovie();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsEpisodePage');
  }
  findMovie () {
    console.log("YOYO"+'http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data'));
    //alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+this.navParams.get('data2'));
 

    //alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+"&Season="+this.navParams.get('nbseason'));
    let data : Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data'));
    data.subscribe(result => {
   
    let arr = [];
  
    for(let k in result) {
      
      arr.push({[k] : result[k]});
   
    } 
   //console.log("theresult: "+result.totalSeasons);

    this.TheEpisode = arr;
    console.log("TheEpisode : "+JSON.stringify(this.TheEpisode) );
    });


   // alert(this.allseasons);
    

    }
}
