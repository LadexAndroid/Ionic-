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
import * as papa from 'papaparse';
import { SocialSharing } from '@ionic-native/social-sharing';


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
  itemsforexport : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public favoriteservice: FavoriteProvider, public listfavs: Storage,
    private file : File, private transfert : FileTransfer,private socialSharing: SocialSharing) {
    this.findListOfFavs();
  }

  ionViewDidLoad() {

  }
  findListOfFavs() {
    let arr = [];
    let arrforexport= [];
    this.listfavs.get('favoriteFilms').then(data => {
      data.forEach(element => {
        arrforexport.push(element);
        let donns: Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&i=' + element);
        donns.subscribe(result => {
          arr.push(result);
        });
      });
      this.items = arr;
      this.itemsforexport = arrforexport;
    });
  }
  
  downloadCSV() {
   /* let arr =[];
    this.listfavs.get('favoriteFilms').then(data => {
      data.forEach(element => {
         arr.push(element);
      });
      //this.items = arr;
    });*/
    
      let thepath = 'TempIonicFolder';
      let thecsvfile = 'ListeDeFavoris.csv';
     // nom fichier nom chemin
     this.file.createDir(this.file.externalRootDirectory, thepath ,true).then(url=>{

      this.file.writeFile(url.toURL(),thecsvfile,JSON.stringify(this.itemsforexport),{replace:true}).then(file=>{
       let rootfolder = this.file.externalRootDirectory;
        this.socialSharing.share('','',rootfolder+'/'+thepath+'/'+thecsvfile,'');
      })
     })
   
    }

    downloadjson(){

      let thepath = 'TempIonicFolder';
      let thejsonfile = 'ListeDeFavoris.json';
     // nom fichier nom chemin
     this.file.createDir(this.file.externalRootDirectory, thepath ,true).then(url=>{

      this.file.writeFile(url.toURL(),thejsonfile,JSON.stringify(this.itemsforexport),{replace:true}).then(file=>{
       let rootfolder = this.file.externalRootDirectory;
        this.socialSharing.share('','',rootfolder+'/'+thepath+'/'+thejsonfile,'');
      })
     })
    }


    importList () {

      
    }
  
}
