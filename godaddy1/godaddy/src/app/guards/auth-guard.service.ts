import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: UserService,
    private Route: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //return this.auth.isLoggednout;
    if(this.auth.loggedIn()){
      return true;
    }else{
      this.Route.navigate(["login"]);
      return false;
    }
  }
}
