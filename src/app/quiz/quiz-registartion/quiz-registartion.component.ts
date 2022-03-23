import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { CommanService } from 'src/app/comman.service';


interface userProfile {
  Id: string,
  Name: string,
  Gender: string,
  Language: string
}
@Component({
  selector: 'app-quiz-registartion',
  templateUrl: './quiz-registartion.component.html',
  styleUrls: ['./quiz-registartion.component.css']
})
export class QuizRegistartionComponent implements OnInit {
  userForm: FormGroup = this.fb.group({
    Id: [null],
    Name: [null, Validators.required],
    Gender: [null, Validators.required],
    Language: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private _cs : CommanService) { }

  ngOnInit(): void {
    localStorage.clear();
    this._cs.loggedUser=[];
    console.log(this.userForm);
  }
  resetForm() {
    this.userForm = this.fb.group({
      Id: ['1'],
      Name: [null, Validators.required],
      Gender: [null, Validators.required],
      Language: [null, Validators.required]
    })
  }
  saveUser() {
    Object.values(this.userForm.controls).forEach(control =>{
      control.markAsDirty();
      control.updateValueAndValidity();
    })
    if (this.userForm.valid) {
      var saveData: userProfile = {
        Id: '1',
        Name: this.userForm.value.Name,
        Language: this.userForm.value.Language,
        Gender: this.userForm.value.Gender
      }
      localStorage.setItem("user", JSON.stringify(saveData));
      this.message.success("Registration success");
      this.router.navigateByUrl("/quiz")
    }
  }
}
