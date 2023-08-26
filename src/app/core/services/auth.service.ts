import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { StudentModel } from '../models/studentModel';
import { TeacherModel } from '../models/teacherModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService: JwtHelperService = new JwtHelperService();

  studentModel:StudentModel
  teacherModel:TeacherModel

  public apiUrl = `${environment.apiUrl}Auth/`

  constructor(private httpClient:HttpClient,
    private router:Router) { 
      if (this.isAuthenticated()) {
        this.getCurrentUserFullInfo()
      }
  }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>
    (this.apiUrl+"login",loginModel)
  }

  studentRegister(studentModel:StudentModel){
    return this.httpClient.post<TokenModel>
    (this.apiUrl+"registerStudent",studentModel)
  }

  teacherRegister(teacher:TeacherModel){
    return this.httpClient.post<TokenModel>
    (this.apiUrl+"registerTeacher",teacher)
  }

  getCurrentUserFullInfo(){
    let id = this.getCurrentUserId()
    if (this.isTeacher()) {
      const path1 = this.apiUrl + 'getteacherdetailbyuserıd?userId=' + id;
      return this.httpClient.get<SingleResponseModel<TeacherModel>>(path1).subscribe((response) => {
        this.teacherModel = response.data;
      })
    }
    else{
      const path2 = this.apiUrl + 'getstudentdetailbyuserıd?userId=' + id;
      return this.httpClient.get<SingleResponseModel<StudentModel>>(path2).subscribe((response) => {
        this.studentModel = response.data;
      })
    }
  }


  logout(){
      localStorage.removeItem("token")
      this.router.navigate(["/login"])
      setTimeout(()=>{
        window.location.reload();
      },100)
    }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  
  loggedIn() {
    let token = localStorage.getItem("token");
    if (this.jwtHelperService.isTokenExpired(token)) {
      localStorage.removeItem('token');
    }
    return !this.jwtHelperService.isTokenExpired(token);
  }
  
  isTokenExpired(){
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      return this.jwtHelperService.isTokenExpired(token)
    }
    else{
      return false
    }
  }

  getCurrentUserId() {
    let token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    let decodedToken = this.jwtHelperService.decodeToken(token);
    if (!decodedToken) {
      return null; 
    }
    let nameidentifierString = Object.keys(decodedToken).find((t) =>
      t.endsWith('/nameidentifier')
    );
  
    if (!nameidentifierString) {
  
      return null; 
    }
  
    let userId = decodedToken[nameidentifierString];
    return userId;
  }
  
  isStudent() {
    if (!this.loggedIn()) return false;

    let decodedToken = this.getDecodedToken;

    let roleString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/role')
    )[0];

    if (roleString)
      if (typeof decodedToken[roleString] !== typeof '') {
        for (let i = 0; i < decodedToken[roleString].length; i++)
          if (decodedToken[roleString][i] === 'student') return true;
      } else {
        if (decodedToken[roleString] === 'student') return true;
      }

    return false;
  } 

  isTeacher() {
    if (!this.loggedIn()) return false;

    let decodedToken = this.getDecodedToken;

    let roleString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/role')
    )[0];

    if (roleString)
      if (typeof decodedToken[roleString] !== typeof '') {
        for (let i = 0; i < decodedToken[roleString].length; i++)
          if (decodedToken[roleString][i] === 'teacher') return true;
      } else {
        if (decodedToken[roleString] === 'teacher') return true;
      }

    return false;
  }

  isAdmin() {
    if (!this.loggedIn()) return false;

    let decodedToken = this.getDecodedToken;

    let roleString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/role')
    )[0];

    if (roleString)
      if (typeof decodedToken[roleString] !== typeof '') {
        for (let i = 0; i < decodedToken[roleString].length; i++)
          if (decodedToken[roleString][i] === 'admin') return true;
      } else {
        if (decodedToken[roleString] === 'admin') return true;
      }

    return false;
  }

  get getDecodedToken() {
    let token = this.getToken;
    return this.jwtHelperService.decodeToken(token);
  }
  get getToken() {
    return localStorage.getItem('token');
  }
}
