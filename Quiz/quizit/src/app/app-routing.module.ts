import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { DemoComponent } from './demo/demo.component';
import { DeleteQuizComponent } from './delete-quiz/delete-quiz.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterationComponent },
  { path: 'quiz/:id/:id2', component: QuizComponent },
  { path: 'result/:id/:id2', component: ResultComponent },
  { path: 'dashboard', pathMatch:'full',component: DashboardComponent,canActivate:[AuthGuardGuard] },
  { path: 'admin', component: AdminComponent,canActivate:[AuthGuardGuard]},
  { path: 'create', component: CreateQuizComponent },
  { path: 'demo', component: DemoComponent }, 
  { path: 'delete/:id', component: DeleteQuizComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     RouterModule.forRoot(routes)
  ],
 
  exports: [ RouterModule ],
  
})
export class AppRoutingModule {
  canActivate()
  {
    return;
  }
 }
