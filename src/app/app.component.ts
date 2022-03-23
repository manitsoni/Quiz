import { Component, OnInit } from '@angular/core';
import { CommanService } from './comman.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QuizApp';
  loggedUser:any="";
  constructor(public _cs : CommanService) { }

  ngOnInit(): void {
    this._cs.loggedUser = JSON.parse(localStorage.getItem("user") || '{}');
  }
}
