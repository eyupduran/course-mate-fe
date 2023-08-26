import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { TeacherRegisterComponent } from './components/teacher-register/teacher-register.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { EnrolledCoursesComponent } from './components/enrolled-courses/enrolled-courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentRegisterComponent,
    TeacherRegisterComponent,
    CourseListComponent,
    NavbarComponent,
    CourseAddComponent,
    EnrolledCoursesComponent,
    MyCoursesComponent,
    CourseDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
