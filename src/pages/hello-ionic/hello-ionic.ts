
import { DetailsMoviePage } from './../details-movie/details-movie';
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavController} from 'ionic-angular';
import * as $ from 'jquery';
import { findLinkByComponentData } from 'ionic-angular/umd/navigation/url-serializer';
import { Observable } from 'rxjs/Observable';
import * as papa from 'papaparse';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  detailspage:any = DetailsMoviePage;
  public items:any;
  public MovieTitle:any
  public firsty: number = 0;
  public secondly: number = 20;
  csvData: any[] = [];
  headerRow: any[] = [];
  
  constructor(private NavCtrl : NavController, private http: HttpClient ) {
     
    }
  //////////////////////////
  private readCsvData() {
    this.http.get('assets/dummuData.csv')
      .subscribe(
      data => this.extractData(this.items),
      err => this.handleError(err)
      );
  }
  private handleError(err) {
    console.log('something went wrong: ', err);
  }
 
  trackByFn(index: any, item: any) {
    return index;
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
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
   extractData(res) {
    let csvData = res['_body'] || '';
    
    let parsedData = papa.parse(csvData).data;
 
    this.headerRow = parsedData[0];
 
    parsedData.splice(0, 1);
    this.csvData = parsedData;
  }
  //////////////////////////////
  GetRandomMovie () {
    var RandomMovies = ['Star Wars'];
    var number = Math.floor((Math.random() *RandomMovies.length-1)+1);
    var movie = RandomMovies[number];
   
     this.CallOmdb(this.MovieTitle);
   // document.getElementById("filmdata").textContent=JSON.stringify(this.items);
    
  }
  showDetails(){


  }
  CallomdbOne () {

  }
  CallOmdb (movie) {
  //alert('http://www.omdbapi.com/?apikey=75522b56&s='+movie);
  let data : Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&s='+movie+"&type=movie");
  data.subscribe(result => {
 // this.items= result.json();
 
  let arr = [];

  for(let k in result) {
   // alert({[k] : result[k]});
    arr.push({[k] : result[k]});
   // console.log( result[k]);
   // for(let k2 in result[k]) {
     // alert();
    //  arr.push({[k2] : result[k2]});
    //}
  }
 // alert(arr);
 console.log(arr[0].Search);
  this.items = arr[0].Search;
  });
 }

 doInfinite(event) {
  
     
     
    let data : Observable<any> = this.http.get('http://www.omdbapi.com/?apikey=75522b56&s='+this.MovieTitle+"&page="+(this.secondly/10)+"&type=movie");
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
   
 // this.items.push(this.arri[0].Search);
    // App logic to determine if all data is loaded
    // and disable the infinite scroll
  
 
}




}