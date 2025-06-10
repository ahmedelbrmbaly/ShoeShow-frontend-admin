import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AppComponent } from './app';
import { SidebarComponent } from './components/sidebar/sidebar';
import { HeaderComponent } from './components/header/header';
import { CustomerComponent } from './components/customer/customer';
import { OrderComponent } from './components/order/order';
import { ProductComponent } from './components/product/product';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import { LoginComponent } from './components/shared/login/login-component';
import { ChartComponent } from './chart/chart-component/chart-component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatCheckbox} from '@angular/material/checkbox';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AddProductComponent } from './components/add-product-component/add-product-component';
import {EditProductComponent } from './components/edit-product-component/edit-product-component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerComponent,
    SidebarComponent,
    DashboardComponent,
    OrderComponent,
    ProductComponent,
    LoginComponent,
    ChartComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // Angular Material Modules
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIcon,
    MatToolbar,
    MatMenuTrigger,
    MatCheckbox,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }