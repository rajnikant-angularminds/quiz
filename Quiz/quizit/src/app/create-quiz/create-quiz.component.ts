
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuizServiceService } from '../quiz-service.service';
import { Router } from '@angular/router';
var myObj,mydata, k, i,j, x = "";
type MyArrayType = Array<{id: number, text: string}>;
;
export interface questionsData{
  question: String,
  option1 : String,
  option2 : String,
  option3 : String,
  option4 : String,
  answer : String
}

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})

export class CreateQuizComponent implements OnInit {
  submitted=false;
  QuestionBankForm: FormGroup;
  public mySentences:questionsData[];
  questions: FormArray;
  constructor(private fb:FormBuilder,private service:QuizServiceService,private router:Router) { }

  ngOnInit() {
    if(this.service.isAdminLoggednIn())
    {  
     
    this.QuestionBankForm = this.fb.group({
      topic: ['',Validators.required],
      questions: this.fb.array([
        this.initQuestions()
      ]),
      options: this.fb.array([
        this.initOptions()
      ])
    });
  }
  else{
    this.router.navigate(['login']);
    console.log("user...")  
  }
  }
  initQuestions()
  {
    return this.fb.group({
      question: ['',Validators.required],   //Xs
        })
  }
  initOptions()
  {
    return this.fb.group({
       option: ['',Validators.required]
    })
  }
  addQuestions() {      //addX
    const control = <FormArray>this.QuestionBankForm.controls['questions'];
    control.push(this.initQuestions());
  }
  addOptions(iy) {
    const control = (<FormArray>this.QuestionBankForm.controls['questions']).at(iy).get('options') as FormArray;
    control.push(this.initOptions());
  }
  submit()
  {
    //JSON.parse();
    this.submitted=true
    if(this.QuestionBankForm.invalid)
    {
     return;
   }  
    const myobj= JSON.stringify(this.QuestionBankForm.value.questions);

   const obj= this.QuestionBankForm.value.questions;

 this.mySentences = this.QuestionBankForm.value.questions;
 //mydata ={"topic":this.QuestionBankForm.value.topic }
 
  // for (i = 0; i < this.mySentences.length; i++) {
  //       console.log( this.mySentences[i]);
  //   }  

    mydata ={"topic":this.QuestionBankForm.value.topic, "questions":this.mySentences}
    this.service.createQue(mydata);
    
    this.router.navigate(['/admin']);

  }
  ShowList(){ 
    this.router.navigate(['/admin']);
  }
  
}

  // createItem(): FormGroup {
  //   return this.fb.group({
  //     question: ['',Validators.required],
  //     option1: ['',Validators.required],
  //     option2: ['',Validators.required],
  //     option3: ['',Validators.required],
  //     option4: ['',Validators.required],
  //     answer: ['',Validators.required]
  //   });
  // }

  // addItem(): void {
  //   this.questions = this.QuestionBankForm.get('questions') as FormArray;
  //   this.questions.push(this.createItem());
  // }

 





/*

<div class="panel panel-primary" style="max-width:500px;margin-left:auto;margin-right:auto;" >

  <div class="panel-heading"> Create Quiz</div>
    <div class="panel-body">
<form [formGroup]="QuestionBankForm"(ngSubmit)="submit()">
    <button type="submit" class="btn-success" (click)="addItem()">Add</button>
    <button type="submit" class="btn-success" (click)="ShowList()">ShowList</button><br><br>
  <label>Topic</label><input type="text" formControlName="topic" [class.is-invalid]="QuestionBankForm.controls.topic.invalid  && (QuestionBankForm.controls.topic.touched || QuestionBankForm.controls.topic.dirty)">
  <span class="text-danger" *ngIf=" QuestionBankForm.hasError('required','topic') &&(QuestionBankForm.controls['topic'].dirty || QuestionBankForm.controls['topic'].touched)"> 
    Topic is required
</span><br>
  <div formArrayName="questions" *ngFor="let item of QuestionBankForm.get('questions').controls; let i = index;">
          <div [formGroupName]="i">
                       
          <table class="table">
              <tbody>
                 <tr><td class="label">Question</td><td>
                   <input type="text" formControlName="question" [class.is-invalid]="item.controls.question.invalid && QuestionBankForm.submitted (item.controls.question.touched || item.controls.question.dirty)" >
                  <span class="text-danger" *ngIf="item.hasError('required','question') && (item.controls['question'].dirty || item.controls['question'].touched) ">
                      Question is required</span>
                  </td></tr>
                  <tr ><td class="label">Option 1</td><td><input type="text" formControlName="option1" [class.is-invalid]="item.controls.option1.invalid && (QuestionBankForm.controls.option1.touched || item.controls.option1.dirty)"> 
                    <span class="text-danger" *ngIf="item.hasError('required','option1') && (item.controls['option1'].dirty || item.controls['option1'].touched)">
                      Option1  is required
                  </span></td></tr>
                  <tr><td class="label">Option 2</td><td><input type="text" formControlName="option2" [class.is-invalid]="item.controls.option2.invalid && (item.controls.option2.touched || item.controls.option2.dirty)"> 
                    <span class="text-danger" *ngIf="item.hasError('required','option2') && (item.controls['option2'].dirty || item.controls['option2'].touched)">
                      Option2 is required
                  </span></td></tr>
                  <tr><td class="label">Option 3</td><td><input type="text" formControlName="option3" [class.is-invalid]="item.controls.option3.invalid && (item.controls.option3.touched || QuestionBankForm.controls.option3.dirty)"> 
                    <span class="text-danger" *ngIf=" item.hasError('required','option3') && (item.controls['option3'].dirty || item.controls['option3'].touched)">
                      option3 is required
                  </span></td></tr>
                  <tr><td class="label">Option 4</td><td><input type="text" formControlName="option4" [class.is-invalid]="item.controls.option4.invalid && (item.controls.option4.touched || item.controls.option4.dirty)">
                     <span class="text-danger" *ngIf=" item.hasError('required','option4') && (item.controls['option4'].dirty || item.controls['option4'].touched)">
                      option4 is required
                  </span></td></tr>
                  <tr><td class="label">Answer</td><td><input type="text" formControlName="answer" [class.is-invalid]="item.controls.answer.invalid && (item.controls.answer.touched || item.controls.answer.dirty)">
                     <span class="text-danger" *ngIf="item.hasError('required','answer') &&(item.controls['answer'].dirty || item.controls['answer'].touched)">
                      Answer is required
                  </span></td></tr>
                 
               </tbody>
              </table>  
             
             </div> 
          </div>

</form> 
</div>
<div class="panel-footer">
<button type="submit" class="btn-success" (click)="submit()">Save</button>
</div>
</div>
*/



/*



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuizServiceService } from '../quiz-service.service';
import { Router } from '@angular/router';
var myObj,mydata, k, i,j, x = "";
type MyArrayType = Array<{id: number, text: string}>;
;
export interface questionsData{
  question: String,
  option1 : String,
  option2 : String,
  option3 : String,
  option4 : String,
  answer : String
}

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})

export class CreateQuizComponent implements OnInit {
  submitted=false;
  QuestionBankForm: FormGroup;
  public mySentences:questionsData[];
  questions: FormArray;
  schema:FormGroup;
  options: FormArray;
  constructor(private fb:FormBuilder,private service:QuizServiceService,private router:Router) { }

  ngOnInit() {
    if(this.service.isAdminLoggednIn())
    {  
     
    this.QuestionBankForm = this.fb.group({
      topic: ['',Validators.required],
      questions: this.fb.array([
        this.initX()
               
          ]),
    });
  }
  else{
    this.router.navigate(['login']);
    console.log("user...")  
  }

  }
  initX() {
    return this.fb.group({
        question: ['',Validators.required],
        answer: ['',Validators.required],
       
         options: this.fb.array([
          this.initY()
             
                   
          ]),
    })
     
  }
  initY(){
        return this.fb.group({
          option: ['',Validators.required],
      })
  }
  addX() {
    const control = <FormArray>this.QuestionBankForm.controls['questions'];
    control.push(this.initX());
  }

  addY() {
    const control = this.QuestionBankForm.controls['questions']['options'];
    control.push(this.initY());
  }

  
  // createItem(): FormGroup {
  //   return this.fb.group({
  //     question: ['',Validators.required],
  //     options: this.fb.array([ this.createOption() ]),//['',Validators.required],
  //     answer: ['',Validators.required]
  //   });
  // }  
  // createOption():FormGroup {
  //   return this.fb.group({
  //     option: ['',Validators.required]
  //       });
  // }

  // addItem(): void {
  //   this.questions = this.QuestionBankForm.get('questions') as FormArray;
  //   this.questions.push(this.createItem());
  // }
  // addOption(): void {
  //   this.options = this.QuestionBankForm.get('options') as FormArray;
  //   this.questions.push(this.createItem());
  // }

  submit()
  {
    //JSON.parse();
    this.submitted=true
    if(this.QuestionBankForm.invalid)
    {
     return;
   }  
    const myobj= JSON.stringify(this.QuestionBankForm.value.questions);

   const obj= this.QuestionBankForm.value.questions;

 this.mySentences = this.QuestionBankForm.value.questions;
 //mydata ={"topic":this.QuestionBankForm.value.topic }
 
  // for (i = 0; i < this.mySentences.length; i++) {
  //       console.log( this.mySentences[i]);
  //   }  

    mydata ={"topic":this.QuestionBankForm.value.topic, "questions":this.mySentences}
    this.service.createQue(mydata);
    
    this.router.navigate(['/admin']);

  }
  ShowList(){
    this.router.navigate(['/admin']);
  }
  
}
*/