import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  customers: Customer[] = []
  intervalId: any;
  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.customersService.getAllCustomers()
    .subscribe({
      next: (customers) => {
        this.customers = customers
      },
      error: (response) => {
        console.log(response)
      }
    })
  }

  deleteCustomer(id:string) {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].id == id) this.customers.splice(i, 1)
    }
    this.customersService.deleteCustomer(id)
    .subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }
}
