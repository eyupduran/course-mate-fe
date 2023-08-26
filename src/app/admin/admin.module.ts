import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { StudentListComponent } from './components/student-list/student-list.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdminComponent,
    StudentListComponent,
    TeacherListComponent  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
