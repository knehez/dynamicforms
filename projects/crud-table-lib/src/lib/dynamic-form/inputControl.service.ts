import { Injectable } from '@angular/core';
import { InputBase } from './form-elements/inputBase';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable()
export class InputControlService {
  constructor() { }

  toFormGroup(inputs: InputBase<any>[]) {
    const group: any = {};

    inputs.forEach(input => {
      if (!input.hidden) {
        let value;
        // check the value is undefined or null but not 0
        if (!input.value && input.value !== 0) {
          value = '';
        } else {
          value = input.value;
        }
        group[input.key] = input.required
          ? new FormControl({ value: value, disabled: !input.editable }, Validators.required)
          : new FormControl({ value: value, disabled: !input.editable });
      }
    });
    return new FormGroup(group);
  }
}
