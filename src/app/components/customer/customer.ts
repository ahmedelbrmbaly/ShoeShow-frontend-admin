import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class CustomerComponent implements OnInit {

  users: any[] = [];
  currentPage: number = 0;
  pageSize: number = 7;
  totalPages: number = 0;

  searchKeyword: string = '';
  searchSubject: Subject<string> = new Subject();


  constructor(private _UserService: UserService ) {}

  // ngOnInit(): void {
  //   this._UserService.getAllUsers().subscribe(data => {
  //     this.users = data;
  //   });
  // }

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(300)) 
      .subscribe((keyword) => {
        this.searchKeyword = keyword;
        this.loadUsers(); 
      });
      this.loadUsers()
}

loadUsers(): void {
    this._UserService.getAllUsers(this.currentPage, this.pageSize, this.searchKeyword).subscribe({
      next: (response) => {
        this.users = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
        console.log('Products loaded:', this.users);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      }
    });
  }

  goToPage(page: number): void {
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    this.loadUsers();
  }
}


handleSearchBlur() {
  if (!this.searchKeyword || this.searchKeyword.trim() === '') {
    this.loadUsers();
  }
}

onSearchChange(keyword: string): void {
  this.searchSubject.next(keyword);
}

}