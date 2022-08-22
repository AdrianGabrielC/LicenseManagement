import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { License } from 'src/app/models/license.model';
import { Product } from 'src/app/models/product.model';
import { CustomersService } from 'src/app/services/customers.service';
import { LicensesService } from 'src/app/services/licenses.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.css']
})
export class AddLicenseComponent implements OnInit {
  @Output() notifyCancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyAddLicense: EventEmitter<string> = new EventEmitter<string>();

  products: Product[] = []
  customers: Customer[] = []
  phase = 1;
  selectedCustomer: string = 'New customer'
  newLicense: License = {
    id: '',
    key: '',
    type: '',
    duration: '',
    product: '',
    owner: '',
    status: ''
  }
  loadingBarWidth = "20%"
  newCustomerStyle = "display:flex; flex-direction:row;"
  constructor(private licensesService: LicensesService, private productsService: ProductsService, private customersService: CustomersService, private router:Router) { }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe({
      next: (products) => {
        this.products = products
      },
      error: (response) => {
        console.log(response)
      }
    })
    this.customersService.getAllCustomers()
    .subscribe({
      next: (customers) => {
        this.customers = customers
      },
      error: (response) => {
        console.log(response)
      }
    })
    setTimeout(() => { 
      this.addLicenseForm = new FormGroup({
        licenseTypeControl: new FormControl('Perpetual'),
        timeLimitedDurationControl: new FormControl(30, [Validators.required, this.expirationDateValidator]),
        trialDurationControl: new FormControl(30, [Validators.required, this.trialDurationValidator]),
        productTypeControl: new FormControl(this.products[0].name),
        customerControl: new FormControl('New customer'),
        nameControl: new FormControl('', [Validators.required]),
        emailControl: new FormControl('', [Validators.required, Validators.email]),
        existingCustomerControl: new FormControl(this.customers[0].email, [Validators.required])
      })
      }, 100);

  }
  


  addLicenseForm = new FormGroup({
    licenseTypeControl: new FormControl('Perpetual'),
    timeLimitedDurationControl: new FormControl(30, [Validators.required, this.expirationDateValidator]),
    trialDurationControl: new FormControl(30, [Validators.required, this.trialDurationValidator]),
    productTypeControl: new FormControl('Office'),
    customerControl: new FormControl('New customer'),
    nameControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    existingCustomerControl: new FormControl('', [Validators.required])
  })
  trialDurationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value >= 1 && control.value <= 90) return null
      else return { 'message': "error" }
    }
  }

  expirationDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value >= 1) return null
      else return { 'message': "error" }
    }
  }

  changeCustomerType(e: any) {
    this.selectedCustomer = e.target.value
  }

  cancel() {
    this.notifyCancel.emit()
  }

  next() {
    switch(this.phase) {
      case 1: {
        if (
          (this.addLicenseForm.controls.licenseTypeControl.value == 'Time limited' && this.addLicenseForm.controls.timeLimitedDurationControl.valid)
          ||
          (this.addLicenseForm.controls.licenseTypeControl.value == 'Trial' && this.addLicenseForm.controls.trialDurationControl.valid)
          ||
          (this.addLicenseForm.controls.licenseTypeControl.value == 'Perpetual')
          ) 
          {
            this.phase += 1
            this.animateLoadingBar()
          }
          break
      }
      case 2: {
        this.phase += 1
        this.animateLoadingBar()
        break
      }
      case 3: {
        if (
          (this.selectedCustomer == 'New customer' && this.addLicenseForm.controls.nameControl.valid && this.addLicenseForm.controls.emailControl.valid)
          ||
          (this.selectedCustomer == 'Existing customer')
        )
        {
          this.phase += 1
          this.animateLoadingBar()
        }
        break
      }
    }
  }
  back() {
    this.phase -= 1
    this.animateLoadingBar()
  }
  animateLoadingBar() {
    if (this.phase == 1) this.loadingBarWidth = "20%"
    else if (this.phase == 2) this.loadingBarWidth = "40%"
    else if (this.phase == 3) this.loadingBarWidth = "60%"
    else if (this.phase == 4) this.loadingBarWidth = "100%"
  }
  submitLicenseForm() {
    this.newLicense.type = this.addLicenseForm.controls.licenseTypeControl.value!
    if (this.newLicense.type == 'Time limited') this.newLicense.duration = this.addLicenseForm.controls.timeLimitedDurationControl.value!.toString()
    else if (this.newLicense.type == 'Trial') this.newLicense.duration = this.addLicenseForm.controls.trialDurationControl.value!.toString()
    else this.newLicense.duration = 'Perpetual'
    this.newLicense.product = this.addLicenseForm.controls.productTypeControl.value!
    if (this.addLicenseForm.controls.customerControl.value == 'New customer') this.newLicense.owner = this.addLicenseForm.controls.emailControl.value!
    else this.newLicense.owner = this.addLicenseForm.controls.existingCustomerControl.value!
    this.newLicense.status = 'Active'
    this.licensesService.addLicense(this.newLicense)
    .subscribe({
      next: (licenses) => {
      }
    })
    if (this.addLicenseForm.controls.customerControl.value == 'New customer') {
      var newCust: Customer = {
        id: '',
        name: this.addLicenseForm.controls.nameControl.value!,
        email: this.addLicenseForm.controls.emailControl.value!
      }
      this.customersService.addCustomer(newCust)
      .subscribe({
        next: (customer) => {
        }
      })
    }
    this.cancel()
    this.notifyAddLicense.emit()
  }
}
