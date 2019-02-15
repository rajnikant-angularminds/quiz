import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuizServiceService } from '../quiz-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
export interface questionsData{
  topic:string,
  time:string,
  question: String,
  option1 : String,
  option2 : String,
  option3 : String,
  option4 : String,
  answer : String,
  
}
var i;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public getAllData:questionsData[];
  public myAllData:questionsData[];
  topics:string[];
  
  public len;
  mytopics:String[];
  constructor(private fb:FormBuilder,private service:QuizServiceService,private http:HttpClient,private router:Router) { }
  url='http://localhost:4000/quizapp/getAllData/ ';
  adminAuth='http://localhost:4000/quizapp/checkAdmin/ ';
  mytopic='';
  times='';
  id;
  geTime:Number[]
  ngOnInit() {
   
    if(this.service.isAdminLoggednIn())
    {  
        //     console.log("getting token",this.service.getToken());
         //     console.log("calling request to get all data");
               this.http.get<any>(this.url).subscribe(
                      (res:any) =>
                    { 
                          this.getAllData = res.user;
        //                  console.log(res.user);
                          this.showdata();
                        });
              
        }
        else{
  

          this.router.navigate(['dashboard']);
          console.log("user...")  
        }
      }
   
  
showdata()
{
  
  //console.log( this.getAllData);
 // this.myAllData=this.getAllData;
  this.len=this.getAllData.length;
  //console.log(this.len);
  // for(i=0;i<length;i++){
  //   console.log(this.getAllData[i].t)
  // }
  this.getAllData.map((cur)=>{
    return this.mytopic += cur.topic+",";
  });
  this.getAllData.map((cur)=>{
    console.log(cur.time);
  
 // return this.geTime.push[i]= parseInt(cur.time);
   return this.times += cur.time+",";
   
  });
  //this.mytopic =+this.getAllData[].topic;
  console.log( this.mytopic );
  this.mytopics =  this.mytopic.split(",", 10); 

  this.geTime =  this.times.split(",").map(function(item) {
    return parseInt(item, 10);
});
}
logout()
{
 
    localStorage.removeItem("admin");
    localStorage.removeItem("LoggedInUser");
    this.router.navigate(["login"]);
  
}
}

          // this.http.post<any>(this.adminAuth,{"username":this.service.getToken(),"usertype":"admin"}).subscribe(
            //   (res:any) =>
            // { 
            //   if(res.status===true)
            //   {
              // this.router.navigate(['admin']);
              // console.log("admin...")
              // }
              // else{
      
  
    // console.log(this.mytopic);
//}