import { Component } from '@angular/core';

import { User } from '../backend/entities/user';
import { Task } from '../backend/entities/task';
import { TaskItem } from '../backend/entities/taskItem';
import { InputService } from './crud-table/dynamic-form/input.service';

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
  allEntities: any[] = [];

  constructor(service: InputService) {
    this.userFormElements = service.getFormElements(new User);
    this.taskFormElements = service.getFormElements(new Task);
    this.taskItemFormElements = service.getFormElements(new TaskItem);

    this.allEntities.push({name: 'User', entity: this.userFormElements});
    this.allEntities.push({name: 'Task', entity: this.taskFormElements});
    this.allEntities.push({name: 'TaskItem', entity: this.taskItemFormElements});
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
