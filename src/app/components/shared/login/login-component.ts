import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  email:string="";
  password:string="";

  constructor(private authService:AuthService){}

  login(email:string , password:string)
  {
    this.authService.checkAuth(email, password);
  }


}
