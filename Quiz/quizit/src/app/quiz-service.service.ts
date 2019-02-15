import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

var i;
@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(private http:HttpClient,private router:Router) { }
  //recent url for create
  //url='http://localhost:4000/quizapp/admin/ '; 

  url='http://localhost:4000/quizapp/insertdata/'
  public loginurl = "http://localhost:4000/quizapp/login/";
  getQue='http://localhost:4000/quizapp/getQue/ ';
  registerUrl='http://localhost:4000/quizapp/register/ ';
  scoreUrl='http://localhost:4000/quizapp/score/ ';
  isadmin=false;
  isuser =false;
  createQue(data)
  {
    console.log("inside create questionaire service");
    console.log(data);
    return this.http.post<any>(this.url,data)
    .subscribe((res:any) =>{ 
      console.log("Successfully added")

       
    });
        
  }
  getQuestions(data)
  {
    console.log("inside get question service",data);
    
  }
  CheckAutroization(data) {

  
  }
  isLoggednIn() {
    return this.getToken() != null;
  }
  getToken() {
      return localStorage.getItem("LoggedInUser");
    }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
   
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
 
 
  logout() {
    localStorage.removeItem("LoggedInUser");
    this.router.navigate(["login"]);
  }
  storeData(marks,topic)
  {
  console.log(marks,topic);
  console.log("inside create store score");
 
  return this.http.post<any>(this.scoreUrl,{"score":marks,"topic":topic,"user":this.getToken()})
  .subscribe((res:any) =>{ 
    console.log("Successfully added",res)

     
  });
      
  } 
  }
  // register(data)
  // {
  //   console.log("inside registration ",data);
  //   console.log(data);
  //   return this.http.post<any>(this.registerUrl,data)
  //   .subscribe((res: any) => {
  //     if(res.status === true){
  //      console.log("Succfully registered ");
  //   }
  // })

