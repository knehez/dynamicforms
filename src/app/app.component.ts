import { Component } from '@angular/core';
import { InputService } from './dynamic-form/input.service';
import { User } from 'src/backend/entities/user';
import { Task } from 'src/backend/entities/task';
import { TaskItem } from 'src/backend/entities/taskItem';

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
  taskItemFormElements: any[];
  private _opened = false;
  cols: any[];
  isNavbarCollapsed = true;
  currentSelection = 'user';

  constructor(service: InputService) {
    this.userFormElements = service.getFormElements(new User);
    this.taskFormElements = service.getFormElements(new Task);
    this.taskItemFormElements = service.getFormElements(new TaskItem);
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
