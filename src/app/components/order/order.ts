import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-servie';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class OrderComponent implements OnInit{

  orders: any[] = [];
  statuses: string[] = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];

  currentPage: number = 0;
  pageSize: number = 7;
  totalPages: number = 0;


  searchKeyword: string = '';
  searchSubject: Subject<string> = new Subject();

   constructor(private orderService: OrderService) {}


ngOnInit(): void {
  this.searchSubject
    .pipe(debounceTime(300))
    .subscribe((keyword) => {
      this.searchKeyword = keyword;
      this.loadOrders();
    });

  this.loadOrders();
}

loadOrders(): void {
  this.orderService.getAllOrders(this.currentPage, this.pageSize, this.searchKeyword).subscribe({
    next: (response) => {
      this.orders = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
      console.log('Products loaded:', this.orders);
    },
    error: (err) => {
      console.error('Failed to load products:', err);
    }
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

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadOrders();
    }
}

handleSearchBlur() {
  if (!this.searchKeyword || this.searchKeyword.trim() === '') {
    this.loadOrders();
  }
}

onSearchChange(keyword: string): void {
  this.searchSubject.next(keyword);
}

}
