import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

export interface InfoDialogAction {
  text: string;
  icon?: string;
  action?: () => void;
}

export interface InfoDialogData {
  message: string;
  title?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  primaryAction?: InfoDialogAction;
  secondaryAction?: InfoDialogAction;
}

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
  standalone: false
})
export class InfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData
  ) {}

  onPrimary(): void {
    if (this.data.primaryAction && this.data.primaryAction.action) {
      this.data.primaryAction.action();
    }
    this.dialogRef.close('primary');
  }

  onSecondary(): void {
    if (this.data.secondaryAction && this.data.secondaryAction.action) {
      this.data.secondaryAction.action();
    }
    this.dialogRef.close('secondary');
  }

  getIconClass(): string {
    switch(this.data.type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-times-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      default:
        return 'fas fa-info-circle';
    }
  }

  getIconContainerClass(): string {
    switch(this.data.type) {
      case 'success':
        return 'icon-success';
      case 'error':
        return 'icon-error';
      case 'warning':
        return 'icon-warning';
      default:
        return 'icon-info';
    }
  }

  getDefaultTitle(): string {
    switch(this.data.type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      default:
        return 'Information';
    }
  }
}
