import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralRestService } from './general-rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ModalImgComponent} from './modal-img/modal-img.component';
import * as moment from 'moment';
import { AuthenticationService } from '../_services/authentication.service';
import { haveIntersection } from 'src/utils/array';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
  providers: [GeneralRestService]
})
export class CrudTableComponent implements OnInit {

  @Input() formElements = [];
  @Input() formPermissions = {};
  @Input() entityName: string;
  @Input() itemsPerPage: number;
  @Input() filter: any;
  @Output() rowSelect = new EventEmitter();
  @Output() cellSelect = new EventEmitter();
  @Output() backClicked = new EventEmitter();

  models = [];

  page = 1;
  firstEntity: number;
  lastEntity: number;
  isNewModel: boolean;
  allEntities: number;
  searchFilter: string;
  currentEntities: number;

  oneModel: any = [];

  constructor(
    private service: GeneralRestService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.service.objectName = this.entityName;
    this.loadData();
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
    await this.service.delete(rowData);
    this.loadData();
  }

  openModalImg(imgDataB64) {
    const modalRef = this.modalService.open(ModalImgComponent, { size: 'lg' });
    modalRef.componentInstance.imgDataB64 = imgDataB64;
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

  singleName(str) {
    return str.substring(0, str.length - 1);
  }

  showAll() {
    this.filter = '';
    this.loadData();
  }

  truncate(string, length = 100) {
    if (string.length > length) {
      return string.substring(0, length) + '...';
    } else {
      return string;
    }
  }

  canCreateEntity () {
    const userRoles = this.authenticationService.getRoles() || [];
    const allowedRoles = this.formPermissions['create'] || [];

    return haveIntersection(userRoles, allowedRoles);
  }

  debug(obj) {
    console.dir(obj);
    return obj;
  }

}
