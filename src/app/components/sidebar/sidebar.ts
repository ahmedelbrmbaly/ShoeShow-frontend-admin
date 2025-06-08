import { Component } from '@angular/core';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone:false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  
  constructor(
    // private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }
}