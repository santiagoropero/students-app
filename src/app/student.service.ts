import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from './models/student';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private urlEnpoint = 'http://localhost:8080/api/students';
  private httpHeaders = new HttpHeaders({'Content-Type': 'Application/json'});
  constructor(private httpCliente: HttpClient,
              private router: Router) { }

  getStudents(): Observable<any> {
    return this.httpCliente.get<Student[]>(this.urlEnpoint).pipe(
      map((response: any) => {
        (response as Student[]).map(student => {
          student.nombre = student.nombre.toUpperCase();
          student.apellido = student.apellido.toUpperCase();
          return student;
        });
        return response;
      }),
      tap((response: any) => {
        (response as Student[]).forEach(student => {
          console.log(student.idEstudiante);
          console.log(student.nombre);
        });
      })
    );
  }
}
