import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizServiceService } from './quiz-service.service';
import { AuthguardService } from './authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard {

  constructor(private auth: QuizServiceService,
    private myRoute: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //return this.auth.isLoggednout;
    if(this.auth.isLoggednIn()){
      return true;
    }else{
      this.myRoute.navigate(["login"]);
      return false;
    }
  }

  
}
