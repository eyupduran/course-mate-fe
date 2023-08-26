import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StudentsOfCourseModel } from '../models/studentsOfCourseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { CourseStudentModel } from '../models/courseStudentModel';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public apiUrl = `${environment.apiUrl}Student/`

  constructor(private httpClient:HttpClient
    ) { 
  }

  getAllStudentsOfCourseDetailByTeacherId(teacherId:number,courseId:number){
    let newUrl = this.apiUrl+`getAllStudentsOfCourseDetailByTeacherId?userId=${teacherId}&courseId=${courseId}`
    return this.httpClient.get<ListResponseModel<StudentsOfCourseModel>>(newUrl)
  }

  deleteStudentFromCourse(courseStudentModel:CourseStudentModel){
    let newUrl = `${environment.apiUrl}CourseStudent/delete`
    return this.httpClient.post(newUrl,courseStudentModel)
  }
}
