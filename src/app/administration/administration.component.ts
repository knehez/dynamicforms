import { Component } from '@angular/core';

import { User } from 'src/backend/entities/user';
import { Task } from 'src/backend/entities/task';
import { TaskItem } from 'src/backend/entities/taskItem';
import { InputService } from 'src/app/crud-table/dynamic-form/input.service';
import { Project } from 'src/backend/entities/project';
import { Product } from 'src/backend/entities/product';
import { Schedule } from 'src/backend/entities/schedule';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
  providers: [InputService]
})
export class AdministrationComponent {
  title = 'crud';
  userFormElements: any[];
  taskFormElements: any[];
  taskItemFormElements: any[];
  productFormElements: any[];
  projectFormElements: any[];
  scheduleFormElements: any[];
  private _opened = false;
  cols: any[];
  isNavbarCollapsed = true;
  currentSelection: 'user' | 'taskitem' | 'task' | 'product' | 'project' | 'schedule' | 'erdiagram' | 'gantt' = 'user';
  allEntities: any[] = [];

  productFilter = {};
  userFilter = {};
  taskFilter = {};
  projectFilter = {};
  taskItemFilter = {};
  ganttEntities;

  backList = [];

  constructor(service: InputService) {
    this.userFormElements = service.getFormElements(new User);
    this.taskFormElements = service.getFormElements(new Task);
    this.taskItemFormElements = service.getFormElements(new TaskItem);
    this.productFormElements = service.getFormElements(new Product);
    this.projectFormElements = service.getFormElements(new Project);
    this.scheduleFormElements = service.getFormElements(new Schedule);

    this.allEntities.push({ name: 'User', entity: this.userFormElements });
    this.allEntities.push({ name: 'Task', entity: this.taskFormElements });
    this.allEntities.push({ name: 'TaskItem', entity: this.taskItemFormElements });
    this.allEntities.push({ name: 'Product', entity: this.productFormElements });
    this.allEntities.push({ name: 'Project', entity: this.projectFormElements });
    this.allEntities.push({ name: 'Schedule', entity: this.scheduleFormElements });
  }

  projectSelected(project: Project) {
    this.productFilter = { where: { project: project.id } };
    this.backList.push(this.currentSelection);
    this.currentSelection = 'product';
  }

  userCellSelected(obj: any) {
    const colName = obj['col']['value'];
    this.taskFilter = { where: { [colName]: obj['data'] } };
    this.backList.push(this.currentSelection);
    this.currentSelection = 'task';
  }

  productCellSelected(obj) {
    const colName = obj['col']['value'];
    this.projectFilter = { where: { [colName]: obj['data'] } };
    this.backList.push(this.currentSelection);
    this.currentSelection = 'project';
  }

  taskCellSelected(obj) {
    const colName = obj['col']['value'];
    this.taskItemFilter = { where: { [colName]: obj['data'] } };
    this.backList.push(this.currentSelection);
    this.currentSelection = 'taskitem';
  }

  showScheudule(obj) {
    this.currentSelection = 'gantt';
    this.ganttEntities = JSON.parse(obj.log);
  }

  goBack() {
    if (this.backList.length !== 0) {
      this.currentSelection = this.backList.pop();
    }
  }
}

