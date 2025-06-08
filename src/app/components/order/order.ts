import { Component, OnInit } from '@angular/core';
import { OrderServie } from '../../services/order-servie';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class OrderComponent implements OnInit{
  
  orders: any[] = [];
  statuses: string[] = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];

   constructor(private orderService: OrderServie) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
  }

     onStatusChange(event: Event, order: any): void {
  const selectElement = event.target as HTMLSelectElement;
  order.orderStatus = selectElement.value;
}


  updateOrderStatus(order: any) {
    this.orderService.updateOrder(order.orderId, order).subscribe(() => {
      alert(`Order ${order.orderId} updated successfully.`);
    });
  }

}
