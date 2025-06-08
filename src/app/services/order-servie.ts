import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServie {

  private ordersUrl = 'http://localhost:8080/api/admin/orders';

  constructor(private _http: HttpClient) {}

    getAllOrders(): Observable<any[]> {
    return this._http.get<any[]>(this.ordersUrl);
  }

    updateOrder(orderId: number, orderData: any) {
    return this._http.put(`http://localhost:8080/api/admin/orders/${orderId}`, orderData);
  }

}

