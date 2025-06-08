import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check if user is already authenticated
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log("I 'm on OInit func isAuth = "+ this.isAuthenticated);
  }

  onLoginSuccess() {
      this.isAuthenticated = true; 
  }
}