import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { ThankComponent } from './thank/thank.component';

const routes:  Routes =[
  
  { path: 'home', component: HomeComponent},
  { path: 'login',component: LoginComponent},  
  { path: 'register', component: RegisterComponent},
  { path: 'checkout', component: CheckoutComponent},//,  canActivate: [AuthGuard]},
   { path: 'thank', component: ThankComponent},
  { path: '', component: LoginComponent},
  {path: 'domain', component: AddDomainComponent},
  
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [LoginComponent,RegisterComponent];

/*
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    component: LoginComponent,
    pathMatch: 'full',
},
{
  path: '',
  redirectTo: 'register',
  component: RegisterComponent,
  pathMatch: 'full',
},
{
  path: '',
  redirectTo: 'cart',
  component: CartComponent,
  pathMatch: 'full',
},
{
  path: '',
  redirectTo: 'cart',
  component: CheckoutComponent,
  pathMatch: 'full',
},
{
  path: '',
  redirectTo: 'cart',
  component: HomeComponent,
  pathMatch: 'full',
}
];
*/