import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'course-management';
  constructor(private authService:AuthService) { }

  
  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.refreshLocalStorage()
     }
    // this.startTokenCheckTimer();
  }
  refreshLocalStorage() {
      window.localStorage.clear();
      window.location.reload()
  }
}
