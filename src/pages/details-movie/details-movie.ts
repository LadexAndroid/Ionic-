import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { findLinkByComponentData } from 'ionic-angular/umd/navigation/url-serializer';
import { Observable } from 'rxjs/Observable';



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

export class DetailsMoviePage  {
  items:any;
  public allseasons:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient ) {
   // alert(this.navParams.get('data'));
   this.items=new Observable<any>();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsMoviePage');
  }
  ngOnInit(){
    console.log("LOADING");
    this.findMovie();

  }
  ViewTrailer(){
   // console.log("caca"+ this.items[0].Title );
    window.open('https://www.youtube.com/results?search_query='+ this.items[0].Title+'trailer', '_blank');
  }

  findMovie () {
     //alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+this.navParams.get('data2'));
    /*for(let){

    }*/
     let data : Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data'));
     data.subscribe(result => {
    // this.items= result.json();
    this.items = result;
     let arr = [];
   
     for(let k in result) {
      // alert({[k] : result[k]});
       arr.push(k);
      // console.log( result[k]);
      // for(let k2 in result[k]) {
        // alert();
       //  arr.push({[k2] : result[k2]});
       //}
     }
    // alert(arr);
   
     
     console.log(this.items);
     });
    }

}
