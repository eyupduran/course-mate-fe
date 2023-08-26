import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseDetailModel } from 'src/app/core/models/courseDetailModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { StudentService } from 'src/app/core/services/student.service';


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit{
  
  myCourses:CourseDetailModel[] = []
  hasData:boolean = false
  constructor(private courseService:CourseService,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    public studentService:StudentService) { }

  ngOnInit(): void {
    this.authService.getCurrentUserFullInfo()
    this.getMyCourses()
  }

  getMyCourses(){
    this.courseService.getTeachersCourses(this.authService.teacherModel.userId).subscribe((response)=>{
      this.myCourses = response.data
      this.hasData = true
      this.myCourses.forEach((course)=>{
        this.studentService.getAllStudentsOfCourseDetailByTeacherId(this.authService.teacherModel.userId,course.courseId).subscribe((response)=>{
          course.studentCount = response.data.length
        })
      })
     
    })
  }

  goCourseDetail(course:CourseDetailModel){
    this.router.navigate(['/course-detail', this.authService.teacherModel.userId,course.courseId]);
  }


}
