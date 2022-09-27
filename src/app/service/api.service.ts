import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
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




}
