import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersUrl = 'http://localhost:8081/api/admin/orders';

  constructor(private _http: HttpClient) {}

  //   getAllOrders(): Observable<any[]> {
  //   return this._http.get<any[]>(this.ordersUrl);
  // }

  getAllOrders(page: number = 0, size: number = 10, search: string = ''): Observable<any> {
    const params = { page: page.toString(), size: size.toString()};
    return this._http.get<any>(this.ordersUrl, { params });
  }

    updateOrder(orderId: number, orderData: any) {
    return this._http.put(`http://localhost:8081/api/admin/orders/${orderId}`, orderData);
  }

}

