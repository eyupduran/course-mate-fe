import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private authService:AuthService,
    private toastrService:ToastrService,
     private router:Router){
 }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (!this.authService.isTeacher()) {
        return true
    }
    else{
      this.router.navigate(["/course-list"])
      this.toastrService.info("Not authorized to access this page")
      return false;
    }
  }
  
}
