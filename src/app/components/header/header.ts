import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  pageTitle = 'Dashboard';
  searchQuery = '';
  showUserMenu = false;
  notificationCount = 3;
  userName = 'Jessica Jones';
  userAvatar = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face';

  private pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/customers': 'Customers',
    // '/icons': 'Icons',
    // '/profile': 'User Profile',
    // '/tables': 'Tables',
    // '/getting-started': 'Getting Started',
    // '/foundation': 'Foundation',
    // '/components': 'Components'
  };

  constructor(
    // private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Update page title based on route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updatePageTitle(event.url);
      });

    // Set initial page title
    this.updatePageTitle(this.router.url);

    // Get user info from auth service
    // const user = this.authService.getCurrentUser();
    // if (user) {
    //   this.userName = user.name;
    //   this.userAvatar = user.avatar || this.userAvatar;
    // }

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target || !(event.target as Element).closest('.user-profile')) {
        this.showUserMenu = false;
      }
    });
  }

  private updatePageTitle(url: string) {
    this.pageTitle = this.pageTitles[url] || 'Dashboard';
  }



  onSearch() {
    if (this.searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  viewProfile() {
    this.showUserMenu = false;
    this.router.navigate(['/profile']);
  }

  viewSettings() {
    this.showUserMenu = false;
    // Navigate to settings page or open settings modal
    console.log('Opening settings...');
  }

  logout() {
    this.showUserMenu = false;
    // this.authService.logout();
    this.router.navigate(['/login']);
  }
}