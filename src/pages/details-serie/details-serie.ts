import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { findLinkByComponentData } from 'ionic-angular/umd/navigation/url-serializer';
import { Observable } from 'rxjs/Observable';
import { DetailsSaisonPage } from '../details-saison/details-saison';

/**
 * Generated class for the DetailsSeriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-serie',
  templateUrl: 'details-serie.html',
})
export class DetailsSeriePage {

  detailsSeason:any = DetailsSaisonPage;
  public idserie : any;
  public items:any;
  public allseasons:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient ) {
   // alert(this.navParams.get('data'));
    this.findMovie();

  }

   
  findMovie () {
    //console.log(this.navParams.get('data2'));
    //alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+this.navParams.get('data2'));
 
    console.log("whatwedo : "+'http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data'));
    this.idserie=this.navParams.get('data');
    let data : Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data'));
    data.subscribe(result => {
   
    let arr = [];
  
    for(let k in result.totalSeasons) {
      
      arr.push(parseInt(k+1));
      
    } 
   //console.log("theresult: "+result.totalSeasons);
    this.allseasons = arr;
    console.log(this.allseasons);
    });


   // alert(this.allseasons);
    

    }
    
    GetSeasonDetails(nbseason){

    // alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+"&Season="+nbseason) ;

    }

}
