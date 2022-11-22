import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, ActivatedRoute, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './service/data.service';
import { ApiService } from './service/api.service';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private dataService: DataService,
              private router: Router,
              private apiService: ApiService
    ) {}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      return this.dataService.isLoggedIn$.pipe(
        tap((isLoggedIn) => {
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
          }
        })
      );
    }
}
