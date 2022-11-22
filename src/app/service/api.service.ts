import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
// import { FilterPipe } from '../shared/filter.pipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // medias: any;
   url:string = 'http://localhost:8000/api';

   public actualite = new BehaviorSubject<any>([]);
   public search = new BehaviorSubject<string>("");
  //  public actualite : any[]= [];
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http.post(this.url+"/login",
    { email, password });

  }


}
