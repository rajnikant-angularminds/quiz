import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 registrationForm: FormGroup = this.fb.group( 
    {    
          uname : ['',Validators.required],
          email : ['',Validators.required],
          password :['',Validators.required]
         
     });
    
  constructor(private fb: FormBuilder,private toastr: ToastrService,private http:HttpClient,private service:UserService,private router:Router) { 
    
  }
 
  register = "http://localhost:8080/godaddy/register";
  ngOnInit() {
    if(this.service.loggedIn()){
      console.log(this.service.loggedIn());
      console.log("hiiii");
      this.router.navigateByUrl('/home');
   
    }
    
  }
  onSubmit()
  {
   
        
        console.log("userlogin data",this.registrationForm.value);
       
        this.http.post('http://localhost:8080/godaddy/register', this.registrationForm.value)
          .subscribe((res: any) => {
             console.log(res);
             if(res.status==='success')
             {
              this.toastr.success('Registered Successfully!', 'Register');
              this.router.navigate(['/login']);
             }
           
           
          });
  }
  logout()
  {
    
    this.service.logout();
  }
}
