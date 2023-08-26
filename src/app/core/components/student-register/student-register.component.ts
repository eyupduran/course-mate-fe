import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentModel } from '../../models/studentModel';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {

  studentRegisterForm:FormGroup;

  constructor(public authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router) {
    }

    ngOnInit(): void {
      this.createForm()
    }


  createForm(){
    this.studentRegisterForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email: ["",Validators.required],
      password:["",Validators.required],
      studentDetail:["",Validators.required],
      phoneNumber:["",Validators.required],
      graduationStatus:["",Validators.required],
    })
  }

register(){
  if(this.studentRegisterForm.valid){
    let studentModel:StudentModel = Object.assign({},this.studentRegisterForm.value)
    this.authService.studentRegister(studentModel).subscribe((response:any)=>{
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
