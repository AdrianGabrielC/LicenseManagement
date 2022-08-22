import { Component, ViewChild } from '@angular/core';
import { ContentComponent } from 'src/app/components/content/content.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ContentComponent)
  contentChild!: ContentComponent;
  title = 'LicenseManagementUI';
  currentSelection = 'Dashboard'
  brightness = "100%"
  addLicenseFlag = false
  addProductFlag = false
  changeSelection(selection:string) {
    this.currentSelection = selection
  }
  changeBrightness(brightness: string) {
    this.brightness = brightness
  }
  crudOperation(operation:string) {
    this.contentChild.crudOperation(operation)
  }
}
