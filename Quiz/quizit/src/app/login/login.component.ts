import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuizServiceService } from '../quiz-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginurl = "http://localhost:4000/quizapp/login/";
  constructor(private fb: FormBuilder,private _userService: QuizServiceService,private http: HttpClient,private router:Router) { 
    
  }
  userLogin: FormGroup;
  ngOnInit() {
    console.log(this._userService.isLoggednIn());
    //console.log(!this._userService.isLoggednIn());
    if(!this._userService.isLoggednIn())
    {
     
      // console.log(this._userService.isLoggednIn());
      this.userLogin = this.fb.group({
        username :  ['',Validators.required],
        password :  ['',Validators.required],
      
      });
     

    }
    else if(this._userService.getAdminToken())
            {
              this.router.navigate(['admin']);
            }
            else{
            this.router.navigate(['dashboard']);

            }
      
       
  }
  
  login() {
        this.http.post<any>(this.loginurl, this.userLogin.value)
      .subscribe((res: any) => {
        console.log(res.user.usertype);
        this._userService.sendToken(this.userLogin.value.username);
        if(res.user.usertype==="admin")
        {
        
        
        this._userService.setAdminToken(this.userLogin.value.username);
        //   console.log("admin");
          this.router.navigate(['admin']);
        }
        else{
         
        //    this._userService.setUser(true);
        //    //this._userService.setAdmin(false);
        //  console.log("user");    
         this.router.navigate(['dashboard']);
        }
      });
 }
  show()
  {
    console.log("routing");
    this.router.navigate(['login']);  
  }
}
