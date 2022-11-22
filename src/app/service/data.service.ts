import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Media } from '../models/media';
import { Observable, BehaviorSubject } from 'rxjs';
import { Login } from '../models/login';
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { RouterModule, CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Youtube } from '../models/youtube';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

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
  // login!:Login[];
  // activitie!: Youtube;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'token_auth';
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  // user!: Login | null;

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
    ) {
      this._isLoggedIn$.next(!!this.token);
      // this.user = this.getUser(this.token);
    }

  // Public activities = new BehaviorSubject<any>([]);
  public media = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  private loggedInStatus = false;

  setLoggedIn(value: boolean){
    this.loggedInStatus = value;
  }

  get isLoginIn(){
    return this.loggedInStatus;
  }

  // Get media by categorie
  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap((response: any) => {
        console.log(response)
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        // this.user = this.getUser(response.token);

      })
    );
  }

  private getUser(token: string): Login | null {
    if (!token) {
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as Login;
  }

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
