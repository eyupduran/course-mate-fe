import { Component, OnInit } from '@angular/core';
import { TeacherModel } from 'src/app/core/models/teacherModel';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent  implements OnInit{
  
  teachers:TeacherModel[] = []
  constructor( private toastrService:ToastrService,
    private router:Router,
    private userService:UserService)
    {
    }

    ngOnInit(): void {
      this.getAllTeachers();
    }
    
    getAllTeachers(){
      this.userService.getAllTeachers().subscribe((response)=>{
        this.teachers = response.data
      })
    }

    deleteItem(user:TeacherModel){
      this.userService.deleteTeacher(user.userId).subscribe((response)=>{
        this.toastrService.success("Successfully deleted")
        this.getAllTeachers()
      })
    }

}

