import { FileTransferObject } from '@ionic-native/file-transfer';
import { FileTransfer } from '@ionic-native/file-transfer';
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
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file';
import { Downloader } from '@ionic-native/downloader/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the DetailsMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-details-movie',
  templateUrl: 'details-movie.html',
})

export class DetailsMoviePage {
  storageDirectory: string = '';
  items: any;
  imageUrl: any;
  isFavorite = false;
  public allseasons: any;
  favoriss: any;

  constructor(private transfer: FileTransfer, private file: File, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public favoriteservice: FavoriteProvider,
    public listfavs: Storage, private sanitizer: DomSanitizer, private downloader: Downloader, private iab: InAppBrowser) {



    this.items = new Observable<any>();
    this.favoriteservice.isFavorite(this.navParams.get('data')).then(isFav => {
      this.isFavorite = isFav;
    })
    // AJOUTER IMG. pour avoir le blob 
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
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    const browser = this.iab.create('https://www.youtube.com/results?search_query=' +this.navParams.get('nameofmovie') + 'trailer', '_self', options);
    //window.open('https://www.youtube.com/results?search_query=' + this.items[0].Title + 'trailer', '_blank', 'location=yes');
  }

  findMovie() {
     this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('http://img.omdbapi.com/?apikey=75522b56&i=' + this.navParams.get('data'));
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
  download() {

    const url = this.navParams.get('img');

    // console.log('http://img.omdbapi.com/?apikey=75522b56&i=' + this.navParams.get('data'));

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + this.navParams.get('nameofmovie') + '.jpg').then((entry) => {
      alert("ok");
    }, (error) => {
      alert(JSON.stringify(error));
    });
  }
}
