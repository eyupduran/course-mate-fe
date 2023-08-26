import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/loginModel';
import { TokenModel } from 'src/app/core/models/tokenModel';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;

  constructor(public authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router) {
  }


  ngOnInit(): void {
  this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe((response:any)=>{
        this.toastrService.success("Giriş başarılı")
        localStorage.setItem("token",response.data.token)
        this.router.navigate(["/course-list"])
        setTimeout(()=>{
          window.location.reload();
      },100)
      },(responseError:any)=>{
          this.toastrService.error(responseError.error.message
            ,"Doğrulama hatası")     
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
}


