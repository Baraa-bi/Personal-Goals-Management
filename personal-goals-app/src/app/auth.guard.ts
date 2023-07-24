import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateUserService } from './authenticate-user.service';
import { IauthUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  accessToken!: string;
  constructor(
    private _router: Router,
    private _authenticateUserService: AuthenticateUserService
  ) {
    this._authenticateUserService.state.subscribe((user: IauthUser) => {
      this.accessToken = user.tokens.access.token;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.accessToken) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
