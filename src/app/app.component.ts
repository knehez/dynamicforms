import { Component } from '@angular/core';
import { InputService } from './dynamic-form/input.service';
import { User } from 'src/backend/entities/user';
import { Task } from 'src/backend/entities/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InputService],
})
export class AppComponent {
  title = 'crud';
  userFormElements: any[];
  taskFormElements: any[];
  private _opened = false;
  cols: any[];

  constructor(service: InputService) {
    this.userFormElements = service.getFormElements(new User);
    this.taskFormElements = service.getFormElements(new Task);
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
