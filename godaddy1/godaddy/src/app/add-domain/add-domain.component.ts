import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

export class domainData{
  domainName:String;
  price:Number;
  userFullName:String;
  address:String;
  zipcode:String;
  registrationDate:Date
  constructor(domainName: string, price: number,userFullName:String,address:String,zipcode:String,registrationDate:Date) {
         this.domainName = domainName;
        this.price = price;
        this.userFullName = userFullName;
        this.address = address;
        this.zipcode = zipcode;
        this.registrationDate = registrationDate;
    
       }
}
@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.css']
})
export class AddDomainComponent implements OnInit {

  constructor(private fb: FormBuilder,private http:HttpClient,private service:UserService,private router:Router) { 
    
  }
  domainsData:Array<domainData>=[];
  addDomainForm: FormGroup;
  domains=[];
  results=[];
 
  domainNames=[];
  register = "http://localhost:8080/godaddy/addDomain";
  ngOnInit() {
    if (!this.service.loggedIn()) {
      console.log("tokent not available");
      this.router.navigate(['login']);
    }
    else {
      if(localStorage.getItem("domain"))
      {
           
     
    this.addDomainForm = this.fb.group( 
      {    
            fullname : ['',Validators.required],
             address : ['',Validators.required],
             zipcode : ['',Validators.required],
            
           
       });

       this.domains.push(JSON.parse(localStorage.getItem("domain")))
       console.log(this.domains)
       this.results = this.domains[0];
       console.log( this.results)

      
      }
   else{
    this.router.navigate(['home']);
       }
       
      }
  }
  onSubmit()
  {
    if(this.addDomainForm.value!=='')
   {
    this.domainsData=[];
   
    for(var i=0;i<this.results.length;i++)
       {
         var domainName= this.results[i].domainName;
         var price = this.results[i].price;
          var fullname = this.addDomainForm.value.fullname;
          var address = this.addDomainForm.value.address;
          var zipcode = this.addDomainForm.value.zipcode;
          
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = today.getFullYear();

         this.domainsData.push(new domainData(domainName,price,fullname,address,zipcode,today));
       }
        
        console.log("userlogin data",this.addDomainForm.value);
      

        this.http.post('http://localhost:8080/godaddy/addDomain',this.domainsData)
          .subscribe((res: any) => {
             console.log(res);
            if(res.status==='success')
            {
              localStorage.removeItem("domain");
              this.router.navigate(["thank"]);
            }
            //this.service.sendToken(this.userLogin.value.username);
          
          });
  }
  else{
    this.router.navigate(["domain"]);
  }
}
}

