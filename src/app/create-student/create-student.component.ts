import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../student.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();
  constructor(private studentService: StudentService,
              private router: Router) { }

  ngOnInit(): void {
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

}
