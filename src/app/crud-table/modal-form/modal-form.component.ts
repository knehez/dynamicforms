import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { haveIntersection } from 'src/utils/array';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  @Input() formElements = [];
  @Input() isNewModel: boolean;
  @Input() entityName: string;
  @Input() formPermissions: any;

  @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;

  constructor(public activeModal: NgbActiveModal, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close({ action: 'close' });
  }

  delete() {
    this.activeModal.close({ action: 'delete', data: this.formComponent.getPayload() });
  }

  save() {
    this.activeModal.close({ action: 'save', data: this.formComponent.getPayload() });
  }

  canCreateEntity () {
    return haveIntersection(this.formPermissions['create'], this.authService.getRoles());
  }

  canUpdateEntity () {
    return haveIntersection(this.formPermissions['update'], this.authService.getRoles());
  }

  canDeleteEntity () {
    return haveIntersection(this.formPermissions['delete'], this.authService.getRoles());
  }
}
