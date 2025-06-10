import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth-service';
import { LogoutDialogComponent } from '../shared/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  standalone: false
})
export class SidebarComponent implements OnInit {
  isCollapsed = false; // Changed to false so sidebar is expanded by default
  isMobileView = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 768;
    // On desktop, sidebar should always be visible
    if (!this.isMobileView) {
      this.isCollapsed = false;
    } else {
      // On mobile, default to collapsed
      this.isCollapsed = true;
    }
    // Emit the current state
    this.sidebarToggled.emit(this.isCollapsed);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }

  closeMenuOnMobile() {
    if (this.isMobileView) {
      this.isCollapsed = true;
      this.sidebarToggled.emit(this.isCollapsed);
    }
  }

  logout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '400px',
      panelClass: 'custom-logout-dialog',
      data: { message: 'Are you sure you want to logout from your account?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
