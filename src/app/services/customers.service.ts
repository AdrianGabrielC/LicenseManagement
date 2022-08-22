import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  baseApiUrl:string=environment.baseApiUrl

  constructor(private http: HttpClient) { }
  getAllCustomers():Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseApiUrl + '/api/Customers')
  }
  addCustomer(customer: Customer):Observable<Customer> {
    customer.id = '00000000-0000-0000-0000-000000000000'
    return this.http.post<Customer>(this.baseApiUrl + '/api/Customers', customer) 
  }

  deleteCustomer(id: string):Observable<Customer> {
    return this.http.delete<Customer>(this.baseApiUrl + '/api/Customers/' + id)
  }
}
