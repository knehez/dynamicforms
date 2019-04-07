import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CrudTableLibComponent } from './crud-table-lib.component';
import { ModalImgComponent } from './modal-img/modal-img.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

@NgModule({
  declarations: [
    CrudTableLibComponent,
    ModalImgComponent,
    ModalFormComponent,
    ClickStopPropagationDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [CrudTableLibComponent]
})
export class CrudTableLibModule { }
