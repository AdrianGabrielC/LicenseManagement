import { Component, OnDestroy, OnInit } from '@angular/core';
import { License } from 'src/app/models/license.model';
import { LicensesService } from 'src/app/services/licenses.service';

@Component({
  selector: 'app-license-table',
  templateUrl: './license-table.component.html',
  styleUrls: ['./license-table.component.css']
})
export class LicenseTableComponent implements OnInit {
  licenses: License[] = []
  constructor(private licenseService: LicensesService) { }

  ngOnInit(): void {
    this.licenseService.getAllLicenses()
    .subscribe({
      next: (licenses) => {
        this.licenses = licenses
      },
      error: (response) => {
        console.log(response)
      }
    })
  }
  readDB() {
    setTimeout(() => { 
      this.refresh()
      }, 1000); 
  }

  deleteLicense(id:string) {
    for (let i = 0; i < this.licenses.length; i++) {
      if (this.licenses[i].id == id) this.licenses.splice(i, 1)
    }
    this.licenseService.deleteLicense(id)
    .subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }
  refresh() {
    this.licenseService.getAllLicenses()
    .subscribe({
      next: (licenses) => {
        this.licenses = licenses
      },
      error: (response) => {
        console.log(response)
      }
    })
  }
}
