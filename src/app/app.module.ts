import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NgZorroAntdModule } from './antd/antd.module';
import { QuizRegistartionComponent } from './quiz/quiz-registartion/quiz-registartion.component';
import { QuizExamComponent } from './quiz/quiz-exam/quiz-exam.component';
import { QuizReportComponent } from './quiz/quiz-report/quiz-report.component';
import { NgChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    QuizRegistartionComponent,
    QuizExamComponent,
    QuizReportComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NzInputModule,
    NzModalModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NzLayoutModule,
    NgChartsModule,
    // ChartsModule
  ],
  providers: [{provide:NZ_I18N,useValue:en_US}],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
