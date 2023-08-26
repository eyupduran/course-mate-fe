
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseModel } from '../models/courseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CourseTeacherModel } from '../models/courseTeacherModel';
import { CourseStudentModel } from '../models/courseStudentModel';
import { ListResponseModel } from '../models/listResponseModel';
import { CourseDetailModel } from '../models/courseDetailModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  apiUrl = `${environment.apiUrl}Course/`

  constructor(private httpClient:HttpClient) { }

  addCourse(course:CourseModel){
    return this.httpClient.post<SingleResponseModel<CourseModel>>(this.apiUrl+"add",course)
  }

  addTeacherCourse(course:CourseTeacherModel){
    let apiUrl = `${environment.apiUrl}CourseTeacher/add`
    return this.httpClient.post<SingleResponseModel<CourseTeacherModel>>(apiUrl,course)
  }

  getAllCourseDetails(){
    let apiUrl = `${environment.apiUrl}Course/getAllCoursesDetails`
    return this.httpClient.get<ListResponseModel<CourseDetailModel>>(apiUrl)
  }

  addStudentCourse(course:CourseStudentModel){
    let apiUrl = `${environment.apiUrl}CourseStudent/add`
    return this.httpClient.post<ResponseModel>(apiUrl,course)
  }
  //getAllEnrolledCoursesDetailsByStudentId?userId=2019

  getAllEnrolledCourses(studentId:number){
    let apiUrl = `${environment.apiUrl}Course/getAllEnrolledCoursesDetailsByStudentId?userId=${studentId}`
    return this.httpClient.get<ListResponseModel<CourseDetailModel>>(apiUrl)
  }
///getAllCoursesDetailsByTeacherId?userId=3018
  getTeachersCourses(teacherId:number){
    let apiUrl = `${environment.apiUrl}Course/getAllCoursesDetailsByTeacherId?userId=${teacherId}`
    return this.httpClient.get<ListResponseModel<CourseDetailModel>>(apiUrl)
  }
deleteCourse(courseId:number){
  let apiUrl = `${environment.apiUrl}Course/delete?id=${courseId}`
  return this.httpClient.post<ResponseModel>(apiUrl,{})
}
  
}
