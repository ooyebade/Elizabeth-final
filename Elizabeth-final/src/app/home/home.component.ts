import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'study-score';

  info: any = {
    courseName: 'Advanced E-Business Technologies',
    studentName: ' ',
    courseNameErr: '',
    scoreErr: '',
    studentNameErr: '',

  };
  drpstudentName = ['Adelaide Adomako', 'Wanyi Dong', 'Shannon McDowell', 'Justin Nugyen', 'Elizabeth Oyebade', 'Ryan Williams'];
  gradeInfo: any = {};

  // tslint:disable-next-line: no-inferrable-types
  result: string = '';

  scoreArray: Array<any> = [
    { begin: 0, end: 60, grade: 'F' },
    { begin: 61, end: 70, grade: 'D' },
    { begin: 71, end: 80, grade: 'C' },
    { begin: 81, end: 90, grade: 'B' },
    { begin: 91, end: 100, grade: 'A' },
  ];

  handlerKeyup(event): void {
    console.log(event);
    const { score } = this.info;
    if (score > 100) {
      this.info.score = 100;
    } else if (score < 0) {
      this.info.score = 0;
    }
    console.log('score', score);
  }

  check(): boolean {
    const { studentName, score, courseName } = this.info;

    if (!studentName) {
      this.info.studentNameErr = 'please select student name';
      return true;
    }
    this.info.studentNameErr = '';

    if (!courseName || courseName.length < 10 || courseName.length > 50) {
      this.info.courseNameErr = 'course name length 10 ~ 50 characters';
      return false;
    }
    this.info.courseNameErr = '';

    if (!score || score > 100 || score < 0) {
      this.info.scoreErr = 'please enter score,score range 0 ~ 100 ';
      return false;
    }
    this.info.studentNameErr = '';
    this.info.scoreErr = '';
    this.info.courseNameErr = '';
    return true;
  }

  onSubmit(): void {
    console.log('submit');
    if (!this.check()) {
      console.log(this.info);
      return;
    }
    const { score, courseName, studentName } = this.info;
    const gradeArr = this.scoreArray.filter((f) => score >= f.begin && score <= f.end);
    if (gradeArr.length === 0) {
      return;
    }
    const { grade } = gradeArr[0];
    console.log('grade:', grade);
    this.gradeInfo =  gradeArr[0];


    this.result = `Student ${this.drpstudentName} takes the course ${courseName} has the grade ${grade}.
      Course name in uppercase: ${courseName.toUpperCase()}, course name in lower case: ${courseName.toLowerCase()}`;
  }

  clear(): void {
    console.log('clear');
    this.info = {};
    this.gradeInfo = {};
    this.result = '';
  }

  constructor() { }

  ngOnInit(): void {
  }
}
