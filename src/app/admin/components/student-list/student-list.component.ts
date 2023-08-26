import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/core/models/userModel';
import { StudentModel } from 'src/app/core/models/studentModel';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit{
  
  students:StudentModel[] = []
  constructor( private toastrService:ToastrService,
    private router:Router,
    private userService:UserService)
    {
    }

    ngOnInit(): void {
      this.getAllStudents();
    }
    
    getAllStudents(){
      this.userService.getAllStudents().subscribe((response)=>{
        this.students = response.data
      })
    }

    deleteItem(user:StudentModel){
      this.userService.deleteStudent(user.userId).subscribe((response)=>{
        this.toastrService.success("Successfully deleted")
        this.getAllStudents()
      })
    }

}
