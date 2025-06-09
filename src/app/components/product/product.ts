import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';


import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent implements OnInit{

products: any[] = [];
currentPage: number = 0;
pageSize: number = 7;
totalPages: number = 0;


searchKeyword: string = '';
searchSubject: Subject<string> = new Subject();


  constructor(private productService: ProductService) {}


//   ngOnInit(): void {
//   this.loadProducts();
// }
ngOnInit(): void {
  this.searchSubject
    .pipe(debounceTime(300)) 
    .subscribe((keyword) => {
      this.searchKeyword = keyword;
      this.loadProducts(); 
    });

  this.loadProducts(); 
}


loadProducts(): void {
  this.productService.getAllProducts(this.currentPage, this.pageSize, this.searchKeyword).subscribe({
    next: (response) => {
      this.products = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
      console.log('Products loaded:', this.products);
    },
    error: (err) => {
      console.error('Failed to load products:', err);
    }
  });
}

goToPage(page: number): void {
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    this.loadProducts();
  }
}


handleSearchBlur() {
  if (!this.searchKeyword || this.searchKeyword.trim() === '') {
    this.loadProducts();
  }
}

onSearchChange(keyword: string): void {
  this.searchSubject.next(keyword);
}





  // ******************DELETE******************

  selectedProductId: number | null = null;
  showConfirmDialog: boolean = false;

  confirmDelete(id: number): void {
    this.selectedProductId = id;
    this.showConfirmDialog = true;
  }

  cancelDelete(): void {
    this.selectedProductId = null;
    this.showConfirmDialog = false;
  }

  // deleteConfirmed(): void {
  //   if (this.selectedProductId !== null) {
  //     this.productService.deleteProduct(this.selectedProductId).subscribe({
  //       next: () => {
  //         this.products = this.products.filter(p => p.productId !== this.selectedProductId);
  //         this.showConfirmDialog = false;
  //         this.selectedProductId = null;
  //       },
  //       error: (err) => {
  //         console.error('Failed to delete product:', err);
  //       }
  //     });
  //   }
  // }

  deleteConfirmed(): void {
  if (this.selectedProductId !== null) {
    this.productService.deleteProduct(this.selectedProductId).subscribe({
      next: () => {
        this.showConfirmDialog = false;
        this.selectedProductId = null;
        this.loadProducts(); // ✨ إعادة تحميل الصفحة
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
      }
    });
  }
}


}
