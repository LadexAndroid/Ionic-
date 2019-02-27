import { DetailsSeriePage } from './../details-serie/details-serie';
import { DetailsMoviePage } from './../details-movie/details-movie';
import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';  
import * as $ from 'jquery';
import { findLinkByComponentData } from 'ionic-angular/umd/navigation/url-serializer';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
/**
 * Generated class for the SeriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serie',
  templateUrl: 'serie.html',
})
export class SeriePage {

  detailspage:any = DetailsSeriePage;
  public items:any;
  public MovieTitle:any;
  public firsty: number = 0;
  public secondly: number = 20;

  constructor(public navCtrl: NavController,  private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeriePage');
  }
 opendetails(item){
  console.log("Voici voila : "+ JSON.stringify(item) );
 }
  CallOmdb (movie) {
    // alert('http://www.omdbapi.com/?apikey=75522b56&s='+movie+"&type=series");
     let data : Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&s='+movie+"&type=series");
     data.subscribe(result => {
    
     let arr = [];
   
     for(let k in result) {
       
       arr.push({[k] : result[k]});
    
     } 
    console.log(arr[0].Search);
     this.items = arr[0].Search;
     });
    }
   
    doInfinite(event) {
     
        
        
       let data : Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&s='+this.MovieTitle+"&page="+(this.secondly/10)+"&type=series");
       //alert('http://www.omdbapi.com/?apikey=75522b56&s='+this.MovieTitle+"&page="+(this.secondly/10));
       data.subscribe(result => {
         let arr=[];
       for(let k in result){
        arr.push({[k] : result[k]});
       }
       
       this.secondly+=10;
   
       console.log(arr[0].Search);
   
      // this.items.concat(arr[0].Search);
       this.items = this.items.concat(arr[0].Search);
       console.log("item : "+this.items);
       event.complete();
     });

   }
}
