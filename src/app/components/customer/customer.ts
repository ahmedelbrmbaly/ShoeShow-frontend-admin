import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class CustomerComponent implements OnInit {

  users: any[] = [];

  constructor(private _UserService: UserService ) {}

  ngOnInit(): void {
    this._UserService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  
  }


}
