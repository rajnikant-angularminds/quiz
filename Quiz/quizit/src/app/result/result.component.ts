import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  marks='';
  totalques='';
  topic='';
  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
  //  console.log(this.route.snapshot.url[1].path);
    this.marks +=  this.route.snapshot.url[1].path;
    this.totalques +=this.route.snapshot.url[2].path;
    //this.topic +=this.route.snapshot.url[3].path;
    //this.totalques = this.marks = this.route.snapshot.params.id2;
    console.log(this.topic);
  }
  Finish()
  {
    this.router.navigate(['/dashboard']);
  }

}
// //   name = 'Angular 6';
//   timeLeft: number = 60;
//   interval;

//   startTimer() {
//     this.interval = setInterval(() => {
//       if(this.timeLeft > 0) {
//         this.timeLeft--;
//       } else {
//         this.timeLeft = 60;
//       }
//     },1000)
//   }

//   pauseTimer() {
//     clearInterval(this.interval);
//   }