import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Media } from '../models/media';
import { Observable } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // medias: any;
   url:string = 'http://localhost:8000/api';


  constructor(private http: HttpClient) {

  }

  getMedia(){
    // this.http.get(this.url+`/media`).subscribe((res:any)=>{
    //   //console.log(res);
    //   this.medias = res;
    // });
  }

  httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8;multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      'Authorization' : 'Bearer',
      // 'Content-Length': '',
      // 'X-Requested-With' : 'XMLHttpRequest',
    })
  }

  postMedia(media: any): Observable<any>{
    return this.http.post<any>(this.url+`/addmedia`, media, this.httpOptions);
  }
}
