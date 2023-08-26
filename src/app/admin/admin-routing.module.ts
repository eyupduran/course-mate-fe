import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { StudentListComponent } from "./components/student-list/student-list.component";
import { TeacherListComponent } from "./components/teacher-list/teacher-list.component";

const routes: Routes = [
    {
      path: '', component: AdminComponent,
      children: [
          { path: 'student-list', component: StudentListComponent },
          { path: 'teacher-list', component: TeacherListComponent },

      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }
  