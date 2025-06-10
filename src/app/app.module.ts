import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LogoutDialogComponent } from './components/shared/logout-dialog/logout-dialog.component';
import { InfoDialogComponent } from './components/shared/info-dialog/info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    LogoutDialogComponent
  ],
  providers: [],
  bootstrap: [/* Your bootstrap component */]
})
export class AppModule { }
