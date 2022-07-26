import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }
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
