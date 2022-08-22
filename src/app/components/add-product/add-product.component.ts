import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { License } from 'src/app/models/license.model';
import { Product } from 'src/app/models/product.model';
import { LicensesService } from 'src/app/services/licenses.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newProduct: Product = {
    id: '',
    name: '',
    shortCode: '',
    licenseType: ''
  }
  addProductFormGroup = new FormGroup({
    productNameControl: new FormControl('', [Validators.required]),
    shortCodeControl: new FormControl('', [Validators.required]),
    licenseTypeControl: new FormControl('Perpetual', [Validators.required])
  })
  brightness = "100%";
  constructor(private productsService: ProductsService, private router:Router) { }
  ngOnInit(): void {
  }
  @Output() notifyCancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyAddProduct: EventEmitter<string> = new EventEmitter<string>();


  cancel() {
    this.notifyCancel.emit()
  }
 
  addProduct() {
    this.newProduct.name = this.addProductFormGroup.controls.productNameControl.value!
    this.newProduct.shortCode = this.addProductFormGroup.controls.shortCodeControl.value!
    this.newProduct.licenseType = this.addProductFormGroup.controls.licenseTypeControl.value!
    this.productsService.addProduct(this.newProduct)
    .subscribe({
      next: (customers) => {
      }
    })
    this.cancel()
    this.notifyAddProduct.emit()
  }

}
