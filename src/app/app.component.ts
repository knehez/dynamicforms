import { Component } from '@angular/core';
import { InputService } from './dynamic-form/input.service';

export interface User {

  id: number;

  firstName: string;

  lastName: string;

  email: string;
}

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
  user: User;
  cols: any[];

  constructor(service: InputService) {
    this.inputs = service.getInputs();
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
