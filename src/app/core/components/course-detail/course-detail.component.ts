import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseStudentModel } from 'src/app/core/models/courseStudentModel';
import { StudentsOfCourseModel } from 'src/app/core/models/studentsOfCourseModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  studentsOfCourseModel:StudentsOfCourseModel[] = []
  userıd:number
  courseId:number
  constructor(
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private route:Router,
    public authService:AuthService,
    public studentService:StudentService){}

  ngOnInit(): void {
    this.authService.getCurrentUserFullInfo()
    this.userıd = this.activatedRoute.snapshot.params['userId'];
    this.courseId = this.activatedRoute.snapshot.params['courseId'];

    this.activatedRoute.params.subscribe(params=>{
      this.courseDetail(this.userıd,this.courseId)
      })
  }

  courseDetail(userId:number,courseId:number){
    this.studentService.getAllStudentsOfCourseDetailByTeacherId(userId,courseId).subscribe((response)=>{
      this.studentsOfCourseModel = response.data
    })
  }

  deleteCourse(course:StudentsOfCourseModel){
   let courseToDelete :CourseStudentModel= {id:course.studentOfCourseId, courseId:course.courseId,studentId:course.studentId}
    this.studentService.deleteStudentFromCourse(courseToDelete).subscribe((response)=>{
      this.toastrService.success("Öğrenci başarıyla silindi.")
      this.courseDetail(this.userıd,this.courseId)
    })
  }
  }

