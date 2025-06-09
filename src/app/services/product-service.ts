import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8081/api/admin/products';
  private addUrl = '/api/admin/products';

  constructor(private http: HttpClient) {}


  getAllProducts(page: number = 0, size: number = 10, search: string = ''): Observable<any> {
  const params = { page: page.toString(), size: size.toString(), searchKeyword: search };
  return this.http.get<any>(this.baseUrl, { params });
}


  deleteProduct(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }



 


}
