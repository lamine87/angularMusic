import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Media } from '../models/media';
import { Observable } from 'rxjs';
// import { RouterModule, Routes } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';




@Injectable({
  providedIn: 'root'
})
export class DataService {
  public url:string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  uploadData(data:any) {
    const headers = new HttpHeaders();
    return this.http.post(this.url+'/addmedia', data,{
      headers: headers
    })
  }

  // getData(){
  //   return this.http.get('http://127.0.0.1:8000/api')
  // }

  // getYoutube(){
  //   return this.http.get('http://127.0.0.1:8000/api')
  // }


  getSearchTitle(title: string){

    const response = new Promise(resolve => {
      this.http.get(this.url+`/media/search/${title}`).subscribe(data =>{
        resolve(data);
      }, err => {
          console.log(err);
      });
    });
    return response;
  }




}
