import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './student.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateStudentComponent,
    ListStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
