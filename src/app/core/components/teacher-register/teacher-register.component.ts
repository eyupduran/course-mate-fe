import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeacherModel } from '../../models/teacherModel';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.scss']
})
export class TeacherRegisterComponent implements OnInit {

  teacherRegisterForm:FormGroup;

  constructor(public authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router) {
    }

    ngOnInit(): void {
      this.createForm()
    }


  createForm(){
    this.teacherRegisterForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email: ["",Validators.required],
      password:["",Validators.required],
      education:["",Validators.required],
      profession:["",Validators.required],
      phoneNumber:["",Validators.required],
    })
  }

register(){
  if(this.teacherRegisterForm.valid){
    let teacherModel:TeacherModel = Object.assign({},this.teacherRegisterForm.value)
    this.authService.teacherRegister(teacherModel).subscribe((response:any)=>{
      this.toastrService.success("Kayıt başarılı")
      this.router.navigate(["/login"])
    },(responseError:any)=>{
        this.toastrService.error(responseError.error.message
          ,"Doğrulama hatası")     
    })
  }else{
    this.toastrService.error("Formunuz eksik","Dikkat")
  }
}
  
}

