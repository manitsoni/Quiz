import { Component, OnInit } from '@angular/core';
import { CommanService } from 'src/app/comman.service';
import { HttpClient } from '@angular/common/http';
import QuestionList from '../../../assets/questionJson.json';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

enum AnswerType {
  Correct = 1,
  Incorrect,
  Notanswered
}
interface ExamQuestions {
  Id: string;
  Name: string
  Type: string;
  Questions: Array<Questions>;
}
interface Questions {
  Id: number,
  Question: string;
  Answers: Array<string>;
  CorrectAnswer: string,
  SubmitAnswer: string;
  Status: string;
}
interface UsersAnswer {
  Id: string;
  QuestionId: string,
  SubmitedAnswer: string
}
@Component({
  selector: 'app-quiz-exam',
  templateUrl: './quiz-exam.component.html',
  styleUrls: ['./quiz-exam.component.css']
})
export class QuizExamComponent implements OnInit {

  questionList: any[] = []
  current = 0;
  status: Array<string> = [];
  questionAnsArray: Array<string> = [];
  checkedQuestion: Array<string> = [];
  verifiedQuestionList: Array<any> = [];
  totalQuestions: any;
  constructor(private _cs: CommanService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this._cs.loggedUser = JSON.parse(localStorage.getItem("user") || '{}');
    this.totalQuestions = QuestionList.filter(x => x.Type.toLocaleLowerCase() === this._cs.loggedUser.Language.toLocaleLowerCase())[0]['TotalQuestions'];
    this.questionList = QuestionList.filter(x => x.Type.toLocaleLowerCase() === this._cs.loggedUser.Language.toLocaleLowerCase())[0]['Questions'];
    for (let i = 0; i < this.totalQuestions; i++) {
      this.status.push("process")
    }
    this.current = 0
    this.questionList.map(x => x.isHidden = true)
    this.questionList[this.current].isHidden = false;
  }

  nextQuestion() {
    this.current == 4 ? this.current == 4 : this.current += 1;
    this.questionList[this.current - 1]['isHidden'] = true;
    this.questionList[this.current]['isHidden'] = false;
    if (this.checkedQuestion) {
      this.questionAnsArray[1] = this.checkedQuestion.toString();
    }
    this.questionAnsArray[this.current - 1] ? this.status[this.current - 1] = 'finish' : this.status[this.current - 1] = 'process'
  }
  backQuestion() {
    this.current == 0 ? this.current == 0 : this.current -= 1;
    this.questionList[this.current].isHidden = false;
    this.questionList[this.current + 1]['isHidden'] = true;
  }
  selectQuestion(index: any) {
    this.current = index - 1;
    this.questionList.map(x => x.isHidden = true)
    this.questionList[this.current].isHidden = false;
  }
  submitQuiz() {
    this.verifiedQuestionList = []
    this._cs.submitedAnswer = [];
    this.questionAnsArray[this.current - 1] ? this.status[this.current] = 'finish' : this.status[this.current] = 'process'
    var correctAns = 0;
    var inCorrectAns = 0;
    var notAnswer = 0;
    for (let i = 0; i < this.totalQuestions; i++) {
      let question = this.questionList[i];
      var verifyQuestion: any = {
        Id: question.Id,
        Question: question.Question,
        Answers: question.Answers,
        CorrectAnswer: question.CorrectAnswer,
        SubmitAnswer: this.questionAnsArray[i] == undefined || this.questionAnsArray[i] == "" ? "" : this.questionAnsArray[i],
        Status: question.Type === 'MultiSelect' ? AnswerType.Incorrect : this.questionAnsArray[i] == undefined || this.questionAnsArray[i] == "" ? AnswerType.Notanswered : this.questionAnsArray[i] === question.CorrectAnswer ? AnswerType.Correct : AnswerType.Incorrect
      }
      if (question.Type === 'MultiSelect') {
        if (verifyQuestion.SubmitAnswer === "") {
          verifyQuestion.Status = AnswerType.Notanswered
        } else {
          let correctAns: Array<string> = question.CorrectAnswer.toString().split(",");
          let submitAns: Array<string> = verifyQuestion.SubmitAnswer.split(",");
          let matchAns = 0;
          if(submitAns.length === correctAns.length){
            for (let i = 0; i < correctAns.length; i++) {
              const element = correctAns[i];
              if (submitAns.includes(element)) {
                matchAns += 1;
              }
            }
            if (matchAns === correctAns.length) {
              verifyQuestion.Status = AnswerType.Correct
            } else {
              verifyQuestion.Status = AnswerType.Incorrect
            }
          }else{
            verifyQuestion.Status = AnswerType.Incorrect
          }  
        }
      }
      if (verifyQuestion.Status === AnswerType.Correct) {
        correctAns += 1
      }
      if (verifyQuestion.Status === AnswerType.Incorrect) {
        inCorrectAns += 1;
      }
      if (verifyQuestion.Status === AnswerType.Notanswered) {
        notAnswer += 1;
      }
      this.verifiedQuestionList.push(verifyQuestion);
    }
    var finalAnswer: any = {
      Type: this._cs.loggedUser.Language,
      CorrectAnswer: correctAns,
      IncorrectAnswer: inCorrectAns,
      NotAnswer: notAnswer,
      TotalAnswer: this.totalQuestions,
      Question: this.verifiedQuestionList
    }
    console.log(finalAnswer);
    this._cs.submitedAnswer.push(finalAnswer);
    localStorage.setItem("ans", JSON.stringify(this._cs.submitedAnswer))
    this.message.success("Quiz has been submited!")
    this.router.navigateByUrl("report")
  }
  updateCheckedOptions(option: any) {
    this.checkedQuestion.includes(option) ? this.checkedQuestion.splice(this.checkedQuestion.indexOf(option), 1) : this.checkedQuestion.push(option);
  }
}
