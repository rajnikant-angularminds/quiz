import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
export interface questionsData{
  question: String,
  option1 : String,
  option2 : String,
  option3 : String,
  option4 : String,
  answer : String,
  topic: String
}
@Component({
  selector: 'app-delete-quiz',
  template: '',

})
export class DeleteQuizComponent implements OnInit {
  id;
   mytopic;
  deleteQuiz='http://localhost:4000/quizapp/delQuiz/';
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

   // console.log("delete quiz topic is:"+this.id);
    // this.mytopic= {"topic":this.topic};
    this.http.post<any>(this.deleteQuiz,{"id":this.id})
     .subscribe((res:any) =>{ 
       console.log("Successfully ",res+" Removed...");
       this.router.navigate(['/admin']);
     });
  }

}
