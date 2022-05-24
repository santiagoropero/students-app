import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Student } from './models/student';
import { catchError, map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

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

  getStudent(idStudent: number): Observable<Student> {
    return this.httpCliente.get<Student>(`${this.urlEnpoint}/${idStudent}`).pipe(
      catchError(e => {
        this.router.navigate(['/create']);
        console.log('Error', e.error.mensaje);
        swal.fire({
          title: 'Error al buscar el estudiante',
          text: e.error.mensaje,
          icon: 'error'
        });
        return throwError(e);
      })
    );
  }

  update(student: Student): Observable<Student> {
    return this.httpCliente.put(`${this.urlEnpoint}/${student.idEstudiante}`, student, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.student as Student),
      catchError(e => {
        swal.fire({
          title: 'Error al actualizar el estudiante',
          text: e.error.mensaje,
          icon: 'error'
        });
        return throwError(e);
      })
    );
  }


  create(student: Student): Observable<Student> {
    console.log('DATOS ' , student );
    return this.httpCliente.post(this.urlEnpoint, student, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.student as Student),
      catchError(e => {
        swal.fire({
          title: 'Error al crear el estudiante',
          text: e.error.mensaje,
          icon: 'error'
        });
        return throwError(e);
      })
    );
  }

  delete(idStudent: number): Observable<Student> {
    return this.httpCliente.delete<Student>(`${this.urlEnpoint}/${idStudent}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire({
          title: 'Error al eliminar el estudiante',
          text: e.error.mensaje,
          icon: 'error'
        });
        return throwError(e);
      })
    );
  }

}
