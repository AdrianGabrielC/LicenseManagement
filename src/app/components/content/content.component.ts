import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductTableComponent } from 'src/app/components/product-table/product-table.component'
import { LicenseTableComponent } from 'src/app/components/license-table/license-table.component'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() currentSelection = 'Dashboard'
  @Input() brightness = "100%"
  @Output() notifyBrightness: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifySelection: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(ProductTableComponent)
  productChildComponent!: ProductTableComponent;
  @ViewChild(LicenseTableComponent)
  licenseChildComponent!: LicenseTableComponent;
  addLicenseFlag = false
  addProductFlag = false
  constructor() { }

  ngOnInit(): void {
  }
  crudOperation(operation:string) {
    this.brightness = "50%"
    this.notifyBrightness.emit("50%")
    if (operation=='addLicense') this.addLicenseFlag = true
    else if (operation=='addProduct') this.addProductFlag = true
  }
  cancel() {
    this.addLicenseFlag = false
    this.addProductFlag = false
    this.brightness = "100%"
    this.notifyBrightness.emit("100%")
  }
  addProduct() {
    this.productChildComponent.readDB()
  }
  addLicense() {
    this.licenseChildComponent.readDB()
  }
  changeSelection(selection:string){
    this.notifySelection.emit(selection)
  }
}
