import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Media } from '../models/media';
import { Observable, BehaviorSubject } from 'rxjs';
// import { RouterModule, Routes } from '@angular/router';
import { Login } from '../models/login';
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Youtube } from '../models/youtube';
// import { FilterPipe } from '../shared/filter.pipe';

interface myData {
  success:boolean;
  message:string;
  status:boolean
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public url: string = 'http://localhost:8000/api';
  medias!:Media[];
  id:any;
  login!:Login[];
  // activitie!: Youtube;

  email='';
  password='';
  wrongCredentials= false;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

// public activities = new BehaviorSubject<any>([]);


  public media = new BehaviorSubject<any>([]);

  public search = new BehaviorSubject<string>("");



  private loggedInStatus = false;


  setLoggedIn(value: boolean){
    this.loggedInStatus = value;
  }

  get isLoginIn(){
    return this.loggedInStatus;
  }


  getUserDetails( email:any, password:any) {
    // Post thes email and password to api server user info if correct
    return this.http.post<myData>(this.url+"/login", {
      email,
      password
     }
    )
  }


  loginData(pEmail:any, pPassword:any){
    // this.wrongCredentials = !this.wrongCredentials;
    const headers = new HttpHeaders();
    const loginData = {
      email: pEmail,
      password: pPassword
    }
    return new Observable<boolean>((observer)=>{
      this.http.post(this.url+"/login", loginData).subscribe(result =>{
        headers: headers;
        observer.next(true);
        observer.complete();
      },error=>{
        observer.error(false);
        observer.complete();
      });
    });
  }


  // Get media by categorie
  getMediaByCategorie(id:any) {
    return this.http.get(this.url+"/categorie/media/"+id)
  }

 // Filter media by user (tag)
  filterMediaByUser(id:any) {
    return this.http.get(this.url+"/tag/"+id)
  }

 // Get media by continent
  mediaContinent(id:any) {
    return this.http.get(this.url+"/pays/media/"+id)
  }

  tagUser(id:any) {
    return this.http.get(this.url+"/tag/"+id)
  }

   // user logout
   logout() {
    return new Observable<boolean>((observer)=>{
      this.http.get<myData>(this.url+'/logout').subscribe(result=>{
        observer.next(true);
        observer.complete();
    },error=>{
      observer.error(false);
      observer.complete();
    });
    })
   }
// withCredentials: true


  // Send Media methode post
  postDataMedia(data:any) {
    const headers = new HttpHeaders();
    return this.http.post(this.url+"/addmedia", data, {
      headers: headers,

    })
  }


  // Register 'Create new user'
  postRegister(data:any) {
    const headers = new HttpHeaders();
    return this.http.post(this.url+'/register', data,{
      headers: headers
    })
  }

  // updating Media
  updateMedia(data:any, id:number) {
    const headers = new HttpHeaders();
    return this.http.post(this.url+'/update/media/'+id,data,
    {
      headers: headers
    }
    )
  }

  // Delete media
  delete(id: any){
    return this.http.post(this.url+'/destroy/media/'+id,{
    })
  }

 // Send actualite methode post
 postActualite(data:any) {
  const headers = new HttpHeaders();
  return this.http.post(this.url+"/add/actualite", data, {
    headers: headers,
    // withCredentials: true
  })
}

  // updating Actualite
  updateActu(data:any, id:number) {
    const headers = new HttpHeaders();
    return this.http.post(this.url+'/update/actualite/'+id,data,
    {
      headers: headers
    }
    )
  }
}
