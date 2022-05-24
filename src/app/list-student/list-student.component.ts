import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {map, tap} from 'rxjs/operators';
import {Student} from '../models/student';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  listStudents: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().pipe(
      tap(response => {
        this.listStudents = response;
        console.log('lista' , this.listStudents[0]);
      })
    ).subscribe();
  }

}
