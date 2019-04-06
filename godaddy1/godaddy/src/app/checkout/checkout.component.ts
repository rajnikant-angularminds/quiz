import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private service: UserService, private router: Router) {

  }
  domains = [];
  results = []
  results1 = []
  total = 0;
  netTotal = 0;
  taxes = 100;
  items:boolean=false;
  loggedIn:boolean=false;
  ngOnInit() {
  //  if (this.service.loggedIn()) {
      //this.userId = this.route.snapshot.params.id;
     if(localStorage.getItem("domain"))
     {
            this.domains.push(JSON.parse(localStorage.getItem("domain")))
            
           console.log(this.domains)
            this.results = this.domains[0];
            console.log(this.results)
          for (var i = 0; i < this.results.length; i++) {
                   this.total += this.results[i].price;
             }
                console.log("totals:", this.total)
               this.netTotal = this.total + this.taxes;
       }
       else{
        this.items=true;
       }
       
       if(this.service.loggedIn()){
        this.loggedIn=true;
      }
      else{
        this.loggedIn=false;
      }
    // }
    // else {
     
    //   this.router.navigateByUrl('/checkout');


    // }
  }
  delete(index) 
  {
    this.total = 0;
    this.netTotal = 0;
    this.taxes = 100;
    console.log("delete index is", index);
    console.log(this.results)
    console.log(this.results[index])
    
     this.results.splice(index, 1);
    console.log(this.results1)
    for (var i = 0; i < this. results.length; i++) {
      this.total += this. results[i].price;
    }
    console.log("totals:", this.total)
    this.netTotal = this.total + this.taxes;
    console.log(this.results)
    localStorage.setItem("domain", JSON.stringify(this. results))
    //this.results=this.results1;
  }
  save() {
    if(this.total!==0)
    {
      this.router.navigate(["domain"]);
    }
    else{
      this.router.navigate(["checkout"]);
    }
    
  }
  logout()
  {
    
    this.service.logout();
  }
}
