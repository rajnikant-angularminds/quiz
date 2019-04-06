import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin:FormGroup = this.fb.group({
    username :  ['',Validators.required],
    password :  ['',Validators.required],
  
  });
  constructor(private fb: FormBuilder,private toastr: ToastrService,private http:HttpClient,private service:UserService,private router:Router) { 
    
  }
  loginurl = "http://localhost:8080/godaddy/login";
 
  
  ngOnInit() {
    if(this.service.loggedIn()){
      console.log(this.service.loggedIn());
      console.log("hiiii");
    
      this.router.navigateByUrl('/home');
   
    }
    else{
      this.router.navigateByUrl('/login');
    }
    
   
  }
  login()
  {
    console.log("userlogin data",this.userLogin.value);
    this.http.post('http://localhost:8080/godaddy/login', this.userLogin.value).subscribe(
    data => {
      if (data['status'] != 'error') {
      
       this.service.sendToken(data['token']);

       if(this.service.isCart())
       {
        this.router.navigate(['/checkout']);
       }
       else
       {
        this.toastr.success('Login success!', 'Login');
        this.router.navigate(['/home']);
       }
        
        }
      else {
        //this.toast.addToast(this.toast.TOAST_TYPES.ERROR, data['message']);
      }
    },
    err => {
      this.router.navigate(['/login']);
    })
   
  }
  

}
