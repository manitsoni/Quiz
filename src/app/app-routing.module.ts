import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizRegistartionComponent } from './quiz/quiz-registartion/quiz-registartion.component';
import { QuizExamComponent } from './quiz/quiz-exam/quiz-exam.component';
import { QuizReportComponent } from './quiz/quiz-report/quiz-report.component';

const routes: Routes = [{ path: 'register', component: QuizRegistartionComponent },
{ path: 'quiz', component: QuizExamComponent },
{ path: 'report', component: QuizReportComponent },
{ path: '**', redirectTo: 'register', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
