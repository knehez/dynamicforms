import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InputBase } from './form-elements/inputBase';
import { FileHandlerService } from './fileHandler.service';
import { TextboxInput } from './form-elements/textBox';

@Component({
    selector: 'lib-input',
    templateUrl: './dynamic-form-input.component.html',
    styleUrls: ['./dynamic-form-input.component.css'],
})
export class DynamicFormInputComponent {
    @Input() input: InputBase<any> = new TextboxInput({ key: 'default' });
    @Input() form: FormGroup = new FormGroup({ default: new FormControl() });

    get isValid() {
        return this.form.controls[this.input.key].valid;
    }

    constructor(private fileHandlerService: FileHandlerService) { }

    debug(obj) {
        console.dir(obj);
        return obj;
    }

    public onFileChange(event): void {
        this.fileHandlerService.onFileChange(event, this.form);
    }
}

