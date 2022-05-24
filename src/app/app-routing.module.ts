import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import {ListStudentComponent} from './list-student/list-student.component';


const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full'},
  {path: 'students', component: ListStudentComponent},
  {path: 'create', component: CreateStudentComponent},
  {path: 'create/:idStudent', component: CreateStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
