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
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file';
import { Downloader } from '@ionic-native/downloader/ngx';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { FileTransfer } from '@ionic-native/file-transfer';
/**
 * Generated class for the DetailsSeriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;
 @IonicPage()
@Component({
  selector: 'page-details-serie',
  templateUrl: 'details-serie.html',
})
export class DetailsSeriePage {
  imageUrl: any;
  detailsSeason:any = DetailsSaisonPage;
  public idserie : any;
  public items:any;
  public allseasons:any;
  isFavorite = false; 
  favoriss: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,public favoriteservice: FavoriteProvider, public listfavs: Storage,
    private sanitizer: DomSanitizer, private downloader: Downloader, private iab: InAppBrowser,private transfer: FileTransfer, private file: File ) {
   // alert(this.navParams.get('data'));
    this.findMovie();
    this.favoriteservice.isFavorite(this.navParams.get('data')).then(isFav => {
      this.isFavorite = isFav; })

  }

   
  findMovie () {
    //console.log(this.navParams.get('data2'));
    //alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+this.navParams.get('data2'));
 
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('http://img.omdbapi.com/?apikey=75522b56&i=' + this.navParams.get('data'));
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

    ViewTrailer() {
      const options: InAppBrowserOptions = {
        zoom: 'no'
      }
  
      const browser = this.iab.create('https://www.youtube.com/results?search_query=' +this.navParams.get('nameofmovie') + 'trailer', '_self', options);
      //window.open('https://www.youtube.com/results?search_query=' + this.items[0].Title + 'trailer', '_blank', 'location=yes');
    }
  

    GetSeasonDetails(nbseason){

    // alert('http://www.omdbapi.com/?apikey=75522b56&i='+this.navParams.get('data')+"&Season="+nbseason) ;

    }
    download() {

      const url = 'http://img.omdbapi.com/?apikey=75522b56&i=' + this.navParams.get('data');
  
      // console.log('http://img.omdbapi.com/?apikey=75522b56&i=' + this.navParams.get('data'));
  
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + this.navParams.get('nameofmovie') + '.jpg').then((entry) => {
        alert("ok");
      }, (error) => {
        alert(JSON.stringify(error));
      });
    }

}
