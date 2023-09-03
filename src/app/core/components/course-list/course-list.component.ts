import { Component, OnInit } from '@angular/core';
import { CourseDetailModel } from 'src/app/core/models/courseDetailModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  
  courses:CourseDetailModel[] = []
  loaded: Promise<boolean> | undefined;

  constructor(private courseService:CourseService,
    public authService:AuthService,
    private toastrService:ToastrService,
    private router:Router) { }


  ngOnInit(): void {
    this.getAllCourseDetails()
  }

  getAllCourseDetails(){
    this.courseService.getAllCourseDetails().subscribe((response)=>{
      this.courses = response.data
      if (response.data) {
        this.loaded = Promise.resolve(true);
      }
      else{
        this.loaded = Promise.resolve(false);
      }
    })
  }

 getCourse(courseId:number){
   let course = {courseId:courseId,studentId:this.authService.studentModel.userId}
    this.courseService.addStudentCourse(course).subscribe((response)=>{
      this.toastrService.success("Kursa kayıt başarılı")
    this.getAllCourseDetails()

    },error=>{
      this.toastrService.error(error.error.message)
    })
 }

deleteCourse(courseId:number){
  this.courseService.deleteCourse(courseId).subscribe((response)=>{
    this.toastrService.success("Kurs silindi")
    this.getAllCourseDetails()
  },error=>{
    this.toastrService.error(error.error.message)
  })
}
}
