import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CustomerComponent } from './components/customer/customer';
import { OrderComponent } from './components/order/order';
import { ProductComponent } from './components/product/product';
import {LoginComponent} from './components/shared/login/login-component';
import { AddProductComponent } from './components/add-product-component/add-product-component';
import { EditProductComponent } from './components/edit-product-component/edit-product-component';



const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'products', component: ProductComponent },
  { path: 'add-product', component: AddProductComponent },
 { path: 'edit-product/:productId', component: EditProductComponent },  
 { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard'},
  

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