import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule} from'@angular/common/http';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { ThankComponent } from './thank/thank.component';
import { ToastrModule } from 'ngx-toastr';
import {NgxMaskModule} from 'ngx-mask'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    AddDomainComponent,
    ThankComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot()
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
