import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {map, tap} from 'rxjs/operators';
import {Student} from '../models/student';
import Swal from 'sweetalert2';

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

  delete(student: Student): void {
    Swal.fire({
      title: 'Eliminar Estudiante',
      text: `¿Está seguro de eliminar el estudiante ${student.nombre + ' ' + student.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.delete(student.idEstudiante).subscribe(
          response => {
            this.listStudents = this.listStudents.filter(cli => cli !== student);
            Swal.fire(
              `Estudiante Eliminado`,
              `El estudiante ${student.nombre + ' ' + student.apellido} ha sido eliminado correctamente`,
              'success'
            );
          }
        );
      }
    });
  }

}
