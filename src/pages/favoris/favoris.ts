import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
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
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file';
import { Downloader } from '@ionic-native/downloader/ngx';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public favoriteservice: FavoriteProvider, public listfavs: Storage,
    private file : File, private transfert : FileTransfer) {
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

  downloadCSV() {
    var teams:any;
    teams=this.items;
    var csv: any = ''
    var line: any = ''

    var SpT = teams.length;
    
    
    //Teams
    for (var i = 0; i < SpT; i++) {
      
       
          line += teams[i].Title + '\r\n';
          console.log("COMPLETE : "+ teams[i].Title);
        
      
     
    }
    csv =line;
    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    this.file.writeFile(this.file.applicationDirectory,  "ListeDeFavoris.csv", blob)
    .then(
    _ => {
      alert('Success ;-)'+this.file.applicationDirectory)
    }
    )
    .catch(
    err => {

      this.file.writeExistingFile(this.file.applicationDirectory,  "ListeDeFavoris.csv", blob)
        .then(
        _ => {
          alert('Success ;-)2'+this.file.applicationDirectory)
        }
        )
        .catch(
        err => {
          alert(err+'Failure'+this.file.applicationDirectory)
        }
        )
    }
    )
 
  /*  var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "ListeDeFavoris.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);*/
  }
}
