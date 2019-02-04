import { Component, OnInit, Input } from '@angular/core';
import { GeneralRestService } from './general-rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './modal-form/modal-form.component';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
  providers: [GeneralRestService]
})
export class CrudTableComponent implements OnInit {

  @Input() formElements = [];
  @Input() entity: string;

  columns = [];
  models = [];

  page = 1;
  pageSize = 4;

  isNewModel: boolean;

  oneModel: any = [];

  constructor(private service: GeneralRestService, private modalService: NgbModal) { }

  ngOnInit() {
    this.columns = this.formElements.map(input => ({ field: input.key, header: input.header }));

    this.service.objectName = this.entity;
    this.service.getAll().then(
      (res) => { this.models = res; console.dir(this.models); },
      (err) => {
        console.log(err);
      });
  }

  get tableData(): any[] {
    const begin = ((this.page - 1) * this.pageSize);
    const end = begin + this.pageSize;
    return this.models.slice(begin, end);
  }


  add() {
    this.oneModel = {};
    this.isNewModel = true;
    this.openModalForm();
  }

  rowSelect(rowData) {
    this.isNewModel = false;
    this.oneModel = rowData;

    // fill in form with dynamic elements
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

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          this.edit(result['data']);
          break;
        case 'delete':
          this.delete();
          break;
      }
    });
  }

  edit(payLoad) {
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
    this.oneModel = null;
  }

  delete() {
    const index = this.models.indexOf(this.oneModel);
    this.models = this.models.filter((val, i) => i !== index);
    this.service.delete(this.oneModel);
    this.oneModel = null;
  }

  isDate(obj) {
    return obj instanceof Date;
  }
}
