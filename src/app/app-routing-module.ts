import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CustomerComponent } from './components/customer/customer';
import { OrderComponent } from './components/order/order';
import { ProductComponent } from './components/product/product';
import {LoginComponent} from './components/shared/login/login-component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'products', component: ProductComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
