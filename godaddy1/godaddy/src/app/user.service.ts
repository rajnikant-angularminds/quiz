import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  loggedIn(){
    return this.getToken() !== null;
  }
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }

   getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("domain");
    this.router.navigate(["/login"]);
  }
  getCart() {
    return localStorage.getItem("domain");
  }
  isCart(){
    return this.getCart() !== null;
  }

   setAdminToken(admintoken:string)
   {
    localStorage.setItem("admin", admintoken)
   }
   getAdminToken()
   {
    return localStorage.getItem("admin");
   }
  
   isAdminLoggednIn() {
     return this.getAdminToken() != null;
  }
 
 
  
}
