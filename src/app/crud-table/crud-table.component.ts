import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GeneralRestService } from './general-rest.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
  providers: [GeneralRestService],
})
export class CrudTableComponent implements OnInit {
  @Input() inputs = [];
  @Input() name: string;

  @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;

  cols: any[];
  models: any[];

  displayDialog: boolean;
  selectedModel: any;
  newModel: boolean;

  model: any;

  constructor(private service: GeneralRestService) { }

  ngOnInit() {
    this.cols = this.inputs.map(input => ({ field: input.key, header: input.header }));

    this.service.objectName = this.name;
    this.service.getAll().then(
      (res) => { this.models = res; },
      (err) => {
        console.log(err);
      });
  }

  showDialogToAdd() {
    this.newModel = true;
    this.model = {};
    this.displayDialog = true;
  }

  edit() {
    const payLoad = this.formComponent.getPayload();

    if (payLoad == null) {
      return;
    }

    const models = [...this.models];
    if (this.newModel) {
      models.push(payLoad);
      this.service.save(payLoad).then(res => { payLoad.id = res['id']; }, err => { });
    } else {
      models[this.models.indexOf(this.selectedModel)] = payLoad;
      this.service.update(payLoad).then(res => { payLoad.id = res['id']; }, err => { });
    }

    this.models = models;
    this.model = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.models.indexOf(this.selectedModel);
    this.models = this.models.filter((val, i) => i !== index);
    this.service.delete(this.model);
    this.model = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newModel = false;
    this.model = this.cloneModel(event.data);

    // fill in form with dynamic elements
    for (const key in this.model) {
      if (this.model.hasOwnProperty(key)) {
        const element = this.model[key];
        const found = this.inputs.find(item => item.key === key);
        if (found) {
          found.value = element;
        }
      }
    }
    this.displayDialog = true;
  }

  cloneModel(c: any): any {
    const model = {};

    for (const prop in c) {
      if (c.hasOwnProperty(prop)) {
        model[prop] = c[prop];
      }
    }
    return model;
  }
}
