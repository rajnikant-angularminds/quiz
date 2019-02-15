import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuizServiceService } from '../quiz-service.service';
import { Options } from 'selenium-webdriver/firefox';

  export interface quizbank {
    questions: [
      {
        question: "",
        anwser:"",
        option1:"",
        option2:"",
        Options: [
          {
            option: "",
          }
        ]
      }
    ],
    answers:[],
  }
  var i,j;
  
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent  {
 Answers:String[] = new Array(40);
  submitted=false;
  alloptions='';
  sortoption='';
  getoptions=[];
  questions: FormArray;
  selectedEntry;
  data = {
    questions: [
      {
        question: "",
        answer:"",
        option1:"",
        option2:"",  
        options: [
          {
            option: "",
          }
        ]
      }
    ]
  }
  myForm: FormGroup;
quizData:quizbank[];
  constructor(private fb: FormBuilder,private service:QuizServiceService) {
    this.myForm = this.fb.group({
      name: [''],
      time: [''],
      questions: this.fb.array([])
    })

    this.addNewQuestion();
  }

  onSubmit() {
 
    var len, len1;
    if(this.myForm.invalid)
    {
     return;
   }  
    
   console.log(this.myForm.value.questions[0])  
   console.log(this.myForm.value.questions.length);
   
   // const obj= this.myForm.value.questions;
  // console.log(obj[0].question); 
   // len =this.myForm.value.questions.length;

   const filterdArray = this.Answers.filter(x => x != null) as string[];
        this.myForm.value.answers=filterdArray;
        console.log(this.myForm.value.answers);
    this.service.createQue(this.myForm.value);


  }

  addNewQuestion() {
    let control = <FormArray>this.myForm.controls.questions;
    control.push(
      this.fb.group({
        question: [''],
        answer: [''], 
        option1:[''],
        option2:[''],
        options: this.fb.array([]),
        
      })
     
    )
  }
  onSelectionChange(entry ,index) {
   this.selectedEntry = entry.value;
  console.log(this.selectedEntry,index);
    //console.log("hi");
    this.Answers[index]=this.selectedEntry;
}
  deleteQuestion(index) {
    let control = <FormArray>this.myForm.controls.questions;
    control.removeAt(index)
  }

  addNewAddOption(control) {
      control.push(
      this.fb.group({
               option: ['']
      }))
  }

  deleteOption(control, index) {
    control.removeAt(index)
  }

  setQuestions() {
    let control = <FormArray>this.myForm.controls.questions;
    this.data.questions.forEach(x => {
      control.push(this.fb.group({ 
        question: x.question, 
        answer: x.answer, 
        option1:x.option1,
        option2:x.option2,
       options: this.setOptions(x) 
      }))
    })
   
  }

  setOptions(x) {
    let arr = new FormArray([])
    x.options.forEach(y => {
      arr.push(this.fb.group({ 
        option: y.option 
      }))
    })
    return arr;
  }
  // getOptions()
  // {
  //    console.log(this.myForm.value.option1);
  // }
}


    /*
    console.log(len);
    var questions:String[] = new Array(len);
    var Answers:String[] = new Array(len);
    var Option1:String[] = new Array(len);
    var Option2:String[] = new Array(len);
    
    var myobj:String[];
    
    for(i=0;i<len;i++)
    {
      //  questions.push(obj[i].question);
      //  Answers.push(obj[i].answer);
      //  Option1.push(obj[i].option1);
      //  Option2.push(obj[i].option2);
   
        // options=","+obj[i].Options;
         len1 = obj[i].options.length;
        //   console.log(len1 );
       // myobj[i]= ; 
       //var options:String[]= new Array(len*len1);
       console.log(obj[i].options)
         for(j=0;j<len1;j++)
         {
       // console.log(obj[i].options[j]);
        var options= obj[i].options[j].option;
       this.alloptions += options+",";
       
        // options[j]=myobj[j].option;
         }
         this.alloptions += ",";
        
    

    }
    console.log(this.alloptions)
   var sortoption = this.alloptions.split(",,",100);
   var optlen = sortoption.length;
for(i=0;i<optlen;i++)
{
  // this.getoptions[i]  = sortoption.split(",",100);
}
   console.log(this.getoptions)
  //  this.service.createQue(this.myForm.value);
  //  console.log(questions);
  //  console.log(Answers); 
  //  console.log(Option1); 
  //  console.log(Option2);
  */