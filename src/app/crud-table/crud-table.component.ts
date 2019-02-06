import { Component, OnInit, Input } from '@angular/core';
import { GeneralRestService } from './general-rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './modal-form/modal-form.component';
import * as moment from 'moment';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
  providers: [GeneralRestService]
})
export class CrudTableComponent implements OnInit {

  @Input() formElements = [];
  @Input() entityName: string;

  columns = [];
  models = [];

  page = 1;
  pageSize = 4;

  isNewModel: boolean;

  oneModel: any = [];

  constructor(private service: GeneralRestService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.columns = this.formElements.map(input => ({ field: input.key, header: input.header }));

    this.service.objectName = this.entityName;
    this.service.getAll().then(
      (res) => { this.models = res; this.convertDates(); },
      (err) => {
        console.log(err);
      });

    // get all linked object data
    for (const elem of this.formElements) {
      // if array the we must query all possible values
      if (elem.linkedObject) {
        elem.allValues = await this.service.getAllSync(elem.linkedObject);
      }
    }

  }

  get tableData(): any[] {
    const begin = ((this.page - 1) * this.pageSize);
    const end = begin + this.pageSize;
    return this.models.slice(begin, end);
  }

  add() {
    this.oneModel = {};
    this.isNewModel = true;
    // fill in form with current elements (if any)
    for (const elem of this.formElements) {
      elem.value = elem.defaultValue;
    }
    this.openModalForm();
  }

  rowSelect(rowData) {
    this.isNewModel = false;
    this.oneModel = rowData;

    // fill in form with current elements (if any)
    for (const key in this.oneModel) {
      if (this.oneModel.hasOwnProperty(key)) {
        const element = this.oneModel[key];
        const found = this.formElements.find(item => item.key === key);
        if (found) {
          found.value = element;
        }
      }
    }
    this.openModalForm();
  }


  openModalForm() {
    const modalRef = this.modalService.open(ModalFormComponent);

    // @Input manually added this way
    modalRef.componentInstance.formElements = this.formElements;
    modalRef.componentInstance.isNewModel = this.isNewModel;
    modalRef.componentInstance.entityName = this.entityName;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          this.save(result['data']);
          break;
        case 'delete':
          this.delete();
          break;
      }
    });
  }

  save(payLoad) {
    if (payLoad == null) {
      return;
    }

    const models = [...this.models];

    if (this.isNewModel) {
      models.push(payLoad);
      this.service.save(payLoad).then(res => { payLoad.id = res['id']; }, err => { });
    } else {
      models[this.models.indexOf(this.oneModel)] = payLoad;
      this.service.update(payLoad).then(res => { payLoad.id = res['id']; }, err => { });
    }

    this.models = models;
    this.convertDates();
    this.oneModel = null;
  }

  delete() {
    const index = this.models.indexOf(this.oneModel);
    this.models = this.models.filter((val, i) => i !== index);

    this.service.delete(this.oneModel);
    this.oneModel = null;
  }

  //
  // converts Date objects to string or vica versa
  //
  convertDates() {
    for (const key in this.formElements) {
      if (this.formElements.hasOwnProperty(key)) {
        const element = this.formElements[key];
        if (element.type === 'date') {
          this.convertDate(element.key, element.dateFormat);
        }
      }
    }
  }

  convertDate(key, dateFormat) {
    for (const iterator of this.models) {
      if (iterator[key]) {
        iterator[key] = moment(iterator[key]).format(dateFormat);
      }
    }
  }

  debug(obj) {
    console.dir(obj);
    return obj;
  }
}
