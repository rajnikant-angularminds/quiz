import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuizServiceService } from '../quiz-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Timeouts } from 'selenium-webdriver';
export interface questionsData {
  topic: string,
  time: string,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String
}
var i;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public getAllData: questionsData[];
  public myAllData: questionsData[];
  topics: string[];
  public len;
  mytopics: String[];
   geTime: Number[]
  constructor(private fb: FormBuilder, private service: QuizServiceService, private http: HttpClient, private router: Router) { }
  url = 'http://localhost:4000/quizapp/getAllData/ ';
  mytopic = '';
  times = '';
  ngOnInit() {
    //  console.log(this.service.getUser());
    if (!this.service.isLoggednIn()) {
      console.log("tokent not available");
      this.router.navigate(['login']);
    }
    else {
      console.log("calling request to get all data");
      this.http.get<any>(this.url).subscribe(
        (res: any) => {
          this.getAllData = res.user;
       //   console.log(res.user[0].time);
          this.showdata();
        });
    }
  }
  showdata() {
   // console.log(this.getAllData);
    this.len = this.getAllData.length;
   // console.log(this.len);
    this.getAllData.map((cur) => {
    return this.mytopic += cur.topic + ",";
    });
    i = 0;
    this.getAllData.map((cur) => {
  //    console.log(cur.time);
      return this.times += cur.time + ",";

    });

    //this.mytopic =+this.getAllData[].topic;
  //  console.log(this.times);
    this.mytopics = this.mytopic.split(",", 10);

    this.geTime = this.times.split(",").map(function (item) {
      return parseInt(item, 10);
    });
  //  console.log(this.geTime);
 
  }
  logout() {

    localStorage.removeItem("admin");
    localStorage.removeItem("LoggedInUser");
    this.router.navigate(["login"]);

  }
}
