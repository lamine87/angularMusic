import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './service/data.service';
import { Router, ActivatedRoute  } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private dataService: DataService,
              private router: Router
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.dataService.isLoginIn){
        this.router.navigate(['/dashboard']);
      }
      return this.dataService.isLoginIn;
  }
}
