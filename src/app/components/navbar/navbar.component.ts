import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor() { }
  @Output() notifySelection: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyCRUD: EventEmitter<string> = new EventEmitter<string>();
  @Input() brightness = "100%";
  @Input() currentSelection = "Dashboard"
  changeSelection(selection: string) {
    if (this.brightness == "100%") {
      this.currentSelection = selection
      this.notifySelection.emit(selection);
    }
  }
  crudOperation(operation:string) {
    this.notifyCRUD.emit(operation)
  }
}
