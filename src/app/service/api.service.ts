import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Media } from '../models/media';
import { Observable } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { MediaModel } from '../formdashboard/dashboardMediaModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data: any;
  public url = 'http://127.0.0.1:8000/api';
  getData(){
    return this.http.get('http://127.0.0.1:8000/api')
  }

  constructor(private http: HttpClient) { }

  // getMedia(){
  //   return this.http.get<any>(this.url+"/media")
  //   .pipe(map((res: any)=>{
  //     return res;
  //   }))
  // }

  postMedia(data: any){
    return this.http.post<any>(this.url+"/add/media", data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
}
