import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Media } from '../models/media';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url = 'http://127.0.0.1:8000/api';
  httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

  constructor(private http: HttpClient) { }

  postMedia(data: any){
    return this.http.post<any>(this.url+"/add/media", JSON.stringify(data))
    .pipe(map((res: any)=>{
      return res;
    }))
  }
}
