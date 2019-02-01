import { Component } from '@angular/core';
import { InputService } from './dynamic-form/input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InputService],
})
export class AppComponent {
  title = 'dynamic-forms';
  inputs: any[];
  private _opened = false;

  constructor(service: InputService) {
    this.inputs = service.getInputs();
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
