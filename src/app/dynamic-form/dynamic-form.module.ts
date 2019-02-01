import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormInputComponent } from './dynamic-form-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    exports: [DynamicFormComponent],
    declarations: [DynamicFormComponent, DynamicFormInputComponent],
    providers: [],
})
export class DynamicFormModule { }
