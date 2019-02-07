import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormInputComponent } from './dynamic-form-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalFormComponent } from '../modal-form/modal-form.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, CalendarModule, NgbPaginationModule, NgSelectModule],
    exports: [DynamicFormComponent],
    declarations: [DynamicFormComponent, DynamicFormInputComponent],
    providers: [],
    entryComponents: [
        ModalFormComponent
    ]
})
export class DynamicFormModule { }
