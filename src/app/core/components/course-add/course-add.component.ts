
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseModel } from 'src/app/core/models/courseModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit{
  courseAddForm:FormGroup;

  constructor(public courseService:CourseService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private authService:AuthService) {
    }

    ngOnInit(): void {
    this.authService.getCurrentUserFullInfo()
      this.createForm()
    }


  createForm(){
    this.courseAddForm = this.formBuilder.group({
      courseName: ["",Validators.required],
      courseDetail: ["",Validators.required],
      fees:["",Validators.required],
      startDate: ["",Validators.required],
      endDate: ["",Validators.required],
      quota: ["",Validators.required],
    })
  }

addCourse(){
  if(this.courseAddForm.valid){
    let studentModel:CourseModel = Object.assign({},this.courseAddForm.value)

    this.courseService.addCourse(studentModel).subscribe((response)=>{

      let courseTeacherModel = {courseId:response.data.id,teacherId:this.authService.teacherModel.userId}
      this.courseService.addTeacherCourse(courseTeacherModel).subscribe((response)=>{
      this.toastrService.success("Kayıt başarılı")
        this.courseAddForm.reset()
      })

    },(responseError:any)=>{
        this.toastrService.error(responseError.error.message
          ,"Doğrulama hatası")     
    })
  }else{
    this.toastrService.error("Formunuz eksik","Dikkat")
  }
}
}
