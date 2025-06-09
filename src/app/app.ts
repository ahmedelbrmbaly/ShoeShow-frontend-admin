import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check if user is already authenticated
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log("I 'm on OInit func isAuth = "+ this.isAuthenticated);

    // Subscribe to auth state changes
    this.authSubscription = this.authService.authState$.subscribe(isAuthenticated => {
      console.log('Auth state changed:', isAuthenticated);
      this.isAuthenticated = isAuthenticated;
    });
  }

  onLoginSuccess() {
      this.isAuthenticated = true;
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
