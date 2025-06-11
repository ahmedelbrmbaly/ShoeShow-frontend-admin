import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = `${environment.apiUrl}/admin/users`;

  constructor(private _http: HttpClient) { }

  getAllUsers(page: number = 0, size: number = 10, search: string = ''): Observable<any> {
    const params = { page: page.toString(), size: size.toString(), searchKeyword: search };
    return this._http.get<any>(this.usersUrl, { params });
  }
}
