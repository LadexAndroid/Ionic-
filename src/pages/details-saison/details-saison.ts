import { DetailsEpisodePage } from './../details-episode/details-episode';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { findLinkByComponentData } from 'ionic-angular/umd/navigation/url-serializer';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the DetailsSaisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-saison',
  templateUrl: 'details-saison.html',
})
export class DetailsSaisonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.findMovie();
  }

  detailsepisode:any = DetailsEpisodePage;

  public items:any;
  public allepisodes:any;
  public TheSeason : any;

   
  findMovie () {
    this.TheSeason = this.navParams.get('nbseason');
    //console.log(this.navParams.get('data2'));
    //alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+this.navParams.get('data2'));
 
    console.log('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+"&Season="+this.navParams.get('nbseason'));
    //alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+"&Season="+this.navParams.get('nbseason'));
    let data : Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+"&Season="+this.navParams.get('nbseason'));
    data.subscribe(result => {
   
    let arr = [];
  
    for(let k in result) {
      
      arr.push({[k] : result[k]});
   
    } 
   //console.log("theresult: "+result.totalSeasons);

    this.allepisodes = arr[3].Episodes;
    //console.log("allepisodes : "+ arr[3].Episodes );
    console.log("allepisodes : "+JSON.stringify(this.allepisodes) );
    });

    
   // alert(this.allseasons);
    

    }

}
