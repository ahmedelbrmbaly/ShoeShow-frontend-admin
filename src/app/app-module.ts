import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AppComponent } from './app';
import { SidebarComponent } from './components/sidebar/sidebar';
import { HeaderComponent } from './components/header/header';
import { CustomerComponent } from './components/customer/customer';
import { OrderComponent } from './components/order/order';
import { ProductComponent } from './components/product/product';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './components/shared/login/login-component';
import { ChartComponent } from './chart/chart-component/chart-component';

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
    ChartComponent   
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(), provideHttpClient()
  ],
  bootstrap: [AppComponent , ChartComponent]
})
export class AppModule { }
