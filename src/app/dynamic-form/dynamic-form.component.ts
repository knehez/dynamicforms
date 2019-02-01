import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from './inputBase';
import { InputControlService } from './inputControl.service';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers: [InputControlService],
})
export class DynamicFormComponent implements OnInit {

    @Input() inputs: InputBase<any>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor(private qcs: InputControlService) { }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.inputs);
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }
}
