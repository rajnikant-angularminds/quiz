import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { ReactiveFormsModule,FormsModule} from'@angular/forms';
import { QuizServiceService } from '../app/quiz-service.service';
import { HttpClientModule} from'@angular/common/http';
import { ResultComponent } from './result/result.component';
import { AdminComponent } from './admin/admin.component';
import { DeleteQuizComponent } from './delete-quiz/delete-quiz.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { CountdownModule } from 'ngx-countdown';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateQuizComponent,
    DashboardComponent,
    QuizComponent,
       ResultComponent,
    AdminComponent,
    DeleteQuizComponent,
    LoginComponent,
    RegisterationComponent,
   DemoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,FormsModule,
    CountdownModule
  ],
  providers: [QuizServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
