import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { TeacherRegisterComponent } from './components/teacher-register/teacher-register.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { EnrolledCoursesComponent } from './components/enrolled-courses/enrolled-courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { LoginGuard } from './guards/login.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { AdminGuard } from './guards/admin.guard';
import { StudentGuard } from './guards/student.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',canActivate:[RefreshGuard] ,component: LoginComponent },
  { path: 'register-student', component: StudentRegisterComponent },
  { path: 'register-teacher', component: TeacherRegisterComponent },
  { path: 'course-list', canActivate:[LoginGuard],component: CourseListComponent },
  { path: 'course-add', canActivate:[LoginGuard,TeacherGuard],component: CourseAddComponent },
  { path: 'enrolled-courses',canActivate:[LoginGuard,StudentGuard], component: EnrolledCoursesComponent },
  { path: 'my-courses', canActivate:[LoginGuard,TeacherGuard],component: MyCoursesComponent },
  { path: 'course-detail/:userId/:courseId',canActivate:[LoginGuard,TeacherGuard], component: CourseDetailComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },


  { path: 'admin',canActivate:[AdminGuard], loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
