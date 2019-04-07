import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from './form-elements/inputBase';
import { InputControlService } from './inputControl.service';

@Component({
    selector: 'lib-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers: [InputControlService],
})
export class DynamicFormComponent implements OnInit {

    @Input() inputs: InputBase<any>[] = [];
    @Output() saved = new EventEmitter<boolean>();
    form: FormGroup;

    constructor(private qcs: InputControlService) { }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.inputs);
    }

    getPayload(): any {
        if (!this.form.valid) {
            return null;
        }

        // add hidden, non modified data, because these were hidden on the form
        this.inputs.forEach(element => {
            if (element.hidden) {
                this.form.value[element.key] = element.value;
            }
        });

        return this.form.value;
    }
}
