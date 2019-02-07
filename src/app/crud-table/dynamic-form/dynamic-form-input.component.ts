import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from './form-elements/inputBase';

@Component({
    selector: 'app-input',
    templateUrl: './dynamic-form-input.component.html',
    styleUrls: ['./dynamic-form-input.component.css'],
})
export class DynamicFormInputComponent {
    @Input() input: InputBase<any>;
    @Input() form: FormGroup;
    get isValid() {
        return this.form.controls[this.input.key].valid;
    }

    debug(obj) {
        console.dir(obj);
        return obj;
    }
}

