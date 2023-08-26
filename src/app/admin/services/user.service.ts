import { ListResponseModel } from './../../core/models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/core/models/userModel';
import { environment } from 'src/environments/environment';
import { StudentModel } from 'src/app/core/models/studentModel';
import { TeacherModel } from 'src/app/core/models/teacherModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.apiUrl}User/`
  constructor(private httpClient:HttpClient) { }

  getAllStudents(){
    let apiUrl = this.apiUrl+ "getAllStudents"
    return this.httpClient.get<ListResponseModel<StudentModel>>(apiUrl)
  }

  getAllTeachers(){
    let apiUrl = this.apiUrl+ "getAllTeachers"
    return this.httpClient.get<ListResponseModel<TeacherModel>>(apiUrl)
  }

  deleteStudent(id:number){

    let apiUrl = `${environment.apiUrl}Student/deletebyid?userId=${id}`
    return this.httpClient.post(apiUrl,{})
  }

  deleteTeacher(id:number){
    let apiUrl = `${environment.apiUrl}Teacher/deletebyid?id=${id}`
    return this.httpClient.post(apiUrl,{})
  }
}
