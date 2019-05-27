import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralRestService } from './general-rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ModalImgComponent } from './modal-img/modal-img.component';

import * as moment_ from 'moment';
const moment = moment_;

import { ConfirmationService, MessageService } from 'primeng/api';
import { haveIntersection } from './utils/array';
import { InputService } from './dynamic-form/input.service';
import { ANY_ROLE_ACCESS_KEY } from './decorator';

@Component({
  selector: 'lib-crud-table-lib',
  templateUrl: './crud-table-lib.component.html',
  styleUrls: ['./crud-table-lib.component.css'],
  providers: [GeneralRestService, MessageService, InputService]
})
export class CrudTableLibComponent implements OnInit {

  @Input() entity: any;
  formElements = [];
  formPermissions = {};
  @Input() permissions = [];
  @Input() entityName: string;
  @Input() itemsPerPage: number;
  @Input() filter: any;
  @Output() rowSelect = new EventEmitter();
  @Output() cellSelect = new EventEmitter();
  @Output() backClicked = new EventEmitter();
  @Output() operationResult = new EventEmitter();

  models = [];

  page = 1;
  firstEntity: number;
  lastEntity: number;
  isNewModel: boolean;
  allEntities: number;
  searchFilter: string;
  currentEntities: number;

  oneModel: any = [];
  selectedRows: any = [];

  constructor(
    public service: GeneralRestService,
    private inputService: InputService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.formElements = this.inputService.getFormElements(this.entity);
    this.formPermissions = this.inputService.getPermissions(this.entity);

    this.service.objectName = this.entityName;
    this.loadData();
  }

  selectRow(row) {
    if (this.selectedRows.includes(row)) {
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
    } else {
      this.selectedRows.push(row);
    }
  }

  async loadData() {
    this.service.getAll(this.filter).then(
      (res) => { this.models = res; this.allEntities = this.models.length; this.convertDates(); },
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
    this.firstEntity = ((this.page - 1) * this.itemsPerPage);
    this.lastEntity = this.firstEntity + this.itemsPerPage;

    if (!this.searchFilter) {
      this.lastEntity = this.lastEntity > this.allEntities ? this.allEntities : this.lastEntity;
      this.currentEntities = this.models.length;
      return this.models.slice(this.firstEntity, this.lastEntity);
    } else {
      const filtered = this.models.filter(item =>
        Object.keys(item).some(k => ('' + item[k]).toLowerCase().includes(this.searchFilter.toLowerCase())));
      this.currentEntities = filtered.length;
      this.lastEntity = this.lastEntity > this.currentEntities ? filtered.length : this.lastEntity;
      return filtered.slice(this.firstEntity, this.lastEntity);
    }
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

  editRow(rowData) {
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

  async deleteRow(rowData) {
    try {
      await this.service.delete(rowData);
      this.operationResult.emit({
        success: true,
        title: 'Successful delete',
        message: 'Record is deleted successfully.'
      });
      this.loadData();
    } catch (err) {
      this.operationResult.emit({
        success: false,
        title: 'Failed delete',
        message: `Failed to delete record: ${err.error.message || err.message}`
      });
    }
  }

  async confirmThenDelete(rowData) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete this record?',
      accept: () => this.deleteRow(rowData)
    });
  }

  async openModalImg(imgDataB64) {
    const fullData = await this.getFileData(imgDataB64, 'original');
    const modalRef = this.modalService.open(ModalImgComponent, { size: 'lg' });
    modalRef.componentInstance.imgDataB64 = fullData;
  }

  openModalForm() {
    const modalRef = this.modalService.open(ModalFormComponent);

    // @Input manually added this way
    modalRef.componentInstance.formElements = this.formElements;
    modalRef.componentInstance.isNewModel = this.isNewModel;
    modalRef.componentInstance.entityName = this.entityName;
    modalRef.componentInstance.formPermissions = this.formPermissions;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          this.save(result['data']);
          break;
        case 'delete':
          this.delete();

          break;
      }
    }, (err) => ('dismissed'));
  }

  async save(payLoad) {
    if (payLoad == null) {
      return;
    }

    const models = [...this.models];
    let response = {};

    if (this.isNewModel) {

      try {
        models.push(payLoad);
        response = await this.service.save(payLoad);
        payLoad.id = response['id'];
        this.operationResult.emit({
          success: true,
          title: 'Successful save',
          message: 'Record saved successfully.'
        });
      } catch (err) {
        this.operationResult.emit({
          success: false,
          title: 'Failed save',
          message: `Failed to save record: ${err.error.message || err.message}`
        });
      }

    } else {

      try {
        models[this.models.indexOf(this.oneModel)] = payLoad;
        response = await this.service.update(payLoad);
        payLoad.id = response['id'];
        this.operationResult.emit({
          success: true,
          title: 'Successful edit',
          message: 'Record edited successfully.'
        });
      } catch (err) {
        this.operationResult.emit({
          success: false,
          title: 'Failed edit',
          message: `Failed to edit record: ${err.error.message || err.message}`
        });
      }

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

  singleName(str) {
    return str.substring(0, str.length - 1);
  }

  showAll() {
    this.filter = '';
    this.loadData();
  }

  truncate(string, length = 50) {
    if (string.length > length) {
      return string.substring(0, length) + '...';
    } else {
      return string;
    }
  }

  canUser(operation: 'create' | 'update' | 'delete') {
    if (this.formPermissions[operation].includes(ANY_ROLE_ACCESS_KEY)) {
      return true;
    }

    return haveIntersection(this.permissions, this.formPermissions[operation]);
  }

  canCreateEntity() {
    return this.canUser('create');
  }

  canUpdateEntity() {
    return this.canUser('update');
  }

  canDeleteEntity() {
    return this.canUser('delete');
  }

  base64MimeType(encoded) {
    let result = null;
    if (encoded === '' || encoded === undefined) {
      return result;
    }
    if (typeof encoded !== 'string') {
      return result;
    }
    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
    const mimeType = {};
    if (result !== null) {
      mimeType['type'] = result.split('/')[0];
      mimeType['ext'] = result.split('/')[1];
    }
    return mimeType;
  }

  // get base64 endcoded string from backend
  async getFileData(id, size): Promise<any> {
    const obj = {'id' : id, 'size' : size};
    return await this.service.file(obj);
  }

  debug(obj) {
    console.dir(obj);
    return obj;
  }
}
