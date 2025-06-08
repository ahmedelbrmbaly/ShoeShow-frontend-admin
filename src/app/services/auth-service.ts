import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8081/api/auth/login';
  
  constructor(private _http: HttpClient , private router:Router) { }


    checkAuth(email:string , password:string): void {
    // const authPayload = { username: email, password: password };
    // const headers = new HttpHeaders({
    //   'Referrer-Policy': 'no-referrer'
    // });
    // this._http.post(this.authUrl, authPayload , {headers}).subscribe(response =>{
    //   console.log(response);

    //   if(response)
    //   {
    //     this.router.navigate(['/dashboard']);
    //   }
    //   else
    //   {
    //     alert("Invalid");
    //   }
      
    // });
      if(email=="nada@example.com" && password=="nada")
      {
          // save jwt token 
          localStorage.setItem('username', 'admin');
          console.log(email + " " + password);
          window.location.reload();
      }
      else
      {
          alert("Invalid");
      }

  }


  isAuthenticated():boolean
  {
    const username = localStorage.getItem('username');
    console.log("I 'm in isAuthintacated func username= "+ username);
    if(username != null && username=="admin")
    {
      console.log("true");
      return true;
    }
    else
    {
       console.log("false");
      return false;
    }
  }
}
