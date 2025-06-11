import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersUrl = `${environment.apiUrl}/admin/orders`;

  constructor(private _http: HttpClient) {}

  getAllOrders(page: number = 0, size: number = 10, search: string = ''): Observable<any> {
    const params = { page: page.toString(), size: size.toString()};
    return this._http.get<any>(this.ordersUrl, { params });
  }

  updateOrder(orderId: number, orderData: any) {
    return this._http.put(`${environment.apiUrl}/admin/orders/${orderId}`, orderData);
  }

}

