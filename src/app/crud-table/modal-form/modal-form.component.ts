import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicFormComponent } from 'src/app/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  @Input() formElements = [];
  @Input() isNewModel: boolean;
  @Input() entityName: string;

  @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;

  constructor(public activeModal: NgbActiveModal) { }

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
}
