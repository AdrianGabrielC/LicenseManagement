import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LicenseTableComponent } from './components/license-table/license-table.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddLicenseComponent } from './components/add-license/add-license.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ContentComponent } from './components/content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LicenseTableComponent,
    ProductTableComponent,
    CustomerTableComponent,
    DashboardComponent,
    AddLicenseComponent,
    AddProductComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
