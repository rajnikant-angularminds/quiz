import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import{ HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { flatten } from '@angular/router/src/utils/collection';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';
import { ToastrService } from 'ngx-toastr';

export class addcart{
  public domainName:string;
  public price:Number;
  constructor(domainName: string, price: number) {
         this.domainName = domainName;
        this.price = price;
       
    
       }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder,private toastr: ToastrService,private http:HttpClient,private service:UserService,private router:Router) { 
    
  }
  sold:boolean= false;
  soldcheck:boolean= false;
  addcart:boolean= false;
  cartItem:boolean =false;
  loggedIn:boolean =false;
  domains;
  flag=0;
  results = [];
  results1 = []
  cart:Array<addcart>=[];
  homeurl = "http://localhost:8080/godaddy/search";
  home: FormGroup;
  price =500;
  ngOnInit() {
    
    this.home = this.fb.group({
      search :  ['',Validators.required]
    
    });

    if(this.service.loggedIn()){
    this.loggedIn=true;
  }
  else{
    this.loggedIn=false;
  }

  }
  search()
  {
    this.addcart=false;
    this.cartItem= false;
    this.domains;
    
    //topic/getOne/${topicId}`
    console.group(this.home.value)
    this.domains = this.home.value.search;
    this.http.get(`http://localhost:8080/godaddy/search/${this.home.value.search}`)
    .subscribe(res => {
     
       if(res['status'] === "success")
      {
        this.sold = true;
        this.soldcheck = false;
        this.toastr.success('Your Domain is already sold!', 'Cart');
        console.log(this.sold);
      }
      else
      {
        this.toastr.success('Your Domain is Available!', 'Cart');
        this.soldcheck = true;
      }
    },
    err => {
      this.router.navigate(['/home']);
    })
     
  }
  addDomain()
  {
    const data={
      domainName:this.domains,
      price:this.price
    }
   console.log(this.domains,this.price)
   this.results=JSON.parse(localStorage.getItem("domain"));
   if(this.results)
    {
      for(var i=0;i<this.results.length;i++)
        {     
          if(this.domains===this.results[i].domainName)
          {
            this.flag=1
            this.toastr.error('This Item Already Added to cart!', 'Cart');
            this.cart=[];
            this.cartItem=true;
            break;
          }
        }
        if(this.flag===0)
        { this.cart=[];
          console.log("added to existing storage",this.domains)
          this.cart.push(new addcart(this.domains,this.price));
        }
    }
    else
    {
      this.cart=[];
        this.cart.push(new addcart(this.domains,this.price));
    }
  // this.cart.push(data)
     
     this.addcart=true;
    console.log(data)
    console.log(this.cart)
 
    console.log( typeof this.results)
    if(this.cart.length>0)
    {
        if(this.results)
        {
          console.log(this.results)
        
          this.results1= this.results.concat(this.cart);
          localStorage.setItem("domain", JSON.stringify(this.results1))
         // this.toastr.success('Item Added to cart!', 'Cart');
          this.cart=[];
        }
        else{
          console.log("else")
          
        localStorage.setItem("domain", JSON.stringify(this.cart))
       // this.toastr.success('Item Added to cart!', 'Cart');
        this.cart=[];
      }
  }
  // this.router.navigate(["/home"]);
  }
  checkout()
  {
    localStorage.setItem("domain", JSON.stringify(this.cart))
   
      this.router.navigate(["checkout"]);
  }
  logout()
  {
    
    this.service.logout();
  }
}
  