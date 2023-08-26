import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseDetailModel } from 'src/app/core/models/courseDetailModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';


@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.scss']
})
export class EnrolledCoursesComponent implements OnInit {

  enrolledCourses:CourseDetailModel[] = []

  constructor(private courseService:CourseService,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router) { }
    
    ngOnInit(): void {
    this.authService.getCurrentUserFullInfo()
     this.getAllEnrolledCourses()
    }
    
    getAllEnrolledCourses(){
      this.courseService.getAllEnrolledCourses(this.authService.studentModel.userId).subscribe((response)=>{
        this.enrolledCourses = response.data
      })
    }
}
