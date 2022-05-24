import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../student.service';
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();
  constructor(private studentService: StudentService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadStudent();
  }

  // tslint:disable-next-line:typedef
  loadStudent() {
    this.activeRoute.params.subscribe(params => {
      const idStudent = params.idStudent;
      if (idStudent) {
        this.studentService.getStudent(idStudent).subscribe(student => this.student = student);
      }
    });
  }

  create(): void {
    this.studentService.create(this.student).subscribe(
      cliente => {
        this.router.navigate(['/students']);
        swal.fire(
          'Estudiante registrado',
          `Se ha creado el estudiante ${cliente.nombre + ' ' + cliente.apellido} satisfactoriamente`,
          'success'
        );
      }
    );
  }

  update(): void {
    this.studentService.update(this.student).subscribe(
      cliente => {
        this.router.navigate(['/students']);
        swal.fire(
          'Estudiante Actualizado',
          `Se ha actualizado el estudiante ${cliente.nombre + ' ' + cliente.apellido} satisfactoriamente`,
          'success'
        );
      }
    );
  }

}
