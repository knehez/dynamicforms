import { Component } from '@angular/core';
import { InputService } from './dynamic-form/input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InputService],
})
export class AppComponent {
  title = 'crud';
  inputs: any[];
  private _opened = false;
  cols: any[];

  constructor(service: InputService) {
    this.inputs = service.getFormElements();
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
