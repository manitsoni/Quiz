import { Component, OnInit } from '@angular/core';
import { CommanService } from 'src/app/comman.service';
import { ChartType, ChartOptions, ChartData } from 'chart.js';

// import { Label } from 'ng2-charts';
@Component({
  selector: 'app-quiz-report',
  templateUrl: './quiz-report.component.html',
  styleUrls: ['./quiz-report.component.css']
})
export class QuizReportComponent implements OnInit {
  TotalAnswer: any;
  constructor(public _cs: CommanService) { }
  ngOnInit(): void {
    var ans = this._cs.loggedUser = JSON.parse(localStorage.getItem("ans") || '{}');
    this.TotalAnswer = ans[0]["Question"]
  }
}
