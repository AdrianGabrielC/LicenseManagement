import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseApiUrl:string=environment.baseApiUrl

  constructor(private http: HttpClient) { }
  getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Products')
  }
  addProduct(product: Product):Observable<Product> {
    product.id = '00000000-0000-0000-0000-000000000000'
    return this.http.post<Product>(this.baseApiUrl + '/api/Products', product) 
  }

  deleteProduct(id: string):Observable<Product> {
    return this.http.delete<Product>(this.baseApiUrl + '/api/Products/' + id)
  }
}
