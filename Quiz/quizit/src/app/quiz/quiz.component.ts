import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizServiceService } from '../quiz-service.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { getLocaleTimeFormat } from '@angular/common';
import { Options } from 'selenium-webdriver/edge';
//import { mobiscroll } from '@mobiscroll/angular-lite';
export interface questionsData {
  question: String,
  option1: String,
  option2: String,
  options: [{
    option: String
  }]
  answer: String[],
  time: string

}
export interface answersData {

  answer: String[]


}
export interface optionsData {
  option: string
}

var i, x;
const source = interval(1000);
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  getQue = 'http://localhost:4000/quizapp/getQue/ ';
  public mySentences: questionsData[];
  public Getquestion: questionsData[];
  public getAnswers: answersData[];
  public GetData;
  public QueOptions;
  public Answer;
  getTime;
  len;

  mytime: any;
  readioCheck = false;
  submitted = false;
  myoptions = [];
  otheroptions: optionsData[];
  QuizForm: FormGroup;
  public index = 0;
  public marks = 0;
  topic;
  endExam: boolean = false;
  selectedOption: string = '';

  constructor(private fb: FormBuilder, private service: QuizServiceService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
  config: any;
  abc: any;
  value
  ngOnInit() {

    this.topic = this.route.snapshot.params.id;
    this.value = parseInt(this.route.snapshot.url[2].path) * 60;
    //  console.log(this.abc);
    //  console.log(this.topic);

    this.QuizForm = this.fb.group({
      options: ['', Validators.required]
    })
    //    console.log(this.getAnswers);
    this.config = { leftTime: this.value };
    const subscribe = source.subscribe((val) => {
      if (val > (this.value - 1)) {
        // console.log("exxe");
        this.service.storeData(this.marks, this.topic);
        this.router.navigate(['result', this.marks, this.index]);

      }
      setTimeout(() => subscribe.unsubscribe(), (this.value + 1) * 1000);
    });
    this.getQuesData();
  }
  getQuesData() {
    //service for getting quiz data
    console.log("first");
    this.http.post<any>(this.getQue, { "topic": this.topic })
      .subscribe((res: any) => {
        this.mySentences = res.user.questions;
        this.getAnswers = res.user.answer;
        this.len = res.user.questions.length
        var obj = JSON.stringify(res.user);
        var myobject = JSON.parse(obj)
        console.log(this.mySentences);
        console.log(this.mytime);
        this.getData();

      });
    console.log(this.mytime);
    this.mytime = parseInt(this.mytime);
  }
  getTimer() {
    console.log("second");
    console.log(this.mytime);
    //set timer

    //  this.abc = {leftTime:this.mytime}; 


  }

  getData() {
    console.log(this.mySentences);
    console.log("index", this.index, "length", this.len)
    if (this.index < this.len) {
      this.GetData = this.mySentences[this.index];
      // this.otheroptions = this.mySentences[this.index];
      this.Answer = this.getAnswers[this.index];
      console.log(this.getAnswers[this.index])
      this.myoptions.push(this.GetData.option1)
      this.myoptions.push(this.GetData.option2)
      this.otheroptions = this.GetData.options;
      console.log("selected opt", this.selectedOption)
      console.log("selected opt", this.Answer)

      for (i = 0; i < this.otheroptions.length; i++) {
        this.myoptions.push(this.otheroptions[i].option);

      }
      this.Answer = this.mySentences[this.index].answer;
      this.index++;
      console.log("end Exam", this.endExam);
    }
    if (this.index < this.len) {

    }
    else {
      this.endExam = true;
      this.submitted = true;
    }
  }
  get f() { return this.QuizForm.controls; }

  NextData() {
    this.myoptions = [];
    if (this.selectedOption === this.Answer) {
      this.marks++;
    }
    if (this.submitted === true) {
      this.getData();
      console.log(this.marks);
    }
    else {
      this.readioCheck = true;
    }
  }
  radioSelected(event: any) {
    console.log(this.getAnswers)
    this.Answer = this.getAnswers[this.index - 1];
    console.log(this.Answer)
    this.selectedOption = event.target.value;
    this.submitted = true;
    this.readioCheck = false;
    console.log("hi", this.Answer)
   
  }
  EndQuiz() {
    if (this.selectedOption === this.Answer) {
      this.marks++;
    }
    console.log("you scored " + this.marks);
    this.service.storeData(this.marks, this.topic);
    this.router.navigate(['result', this.marks, this.index]);

  }


}


