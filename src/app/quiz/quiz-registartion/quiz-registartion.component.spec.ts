import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRegistartionComponent } from './quiz-registartion.component';

describe('QuizRegistartionComponent', () => {
  let component: QuizRegistartionComponent;
  let fixture: ComponentFixture<QuizRegistartionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizRegistartionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRegistartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
