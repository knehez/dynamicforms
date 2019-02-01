import { Injectable } from '@angular/core';
import { InputBase } from './form-elements/inputBase';
import { DropdownInput } from './form-elements/dropdown';
import { TextboxInput } from './form-elements/textBox';
import { RadioInput } from './form-elements/radio';

@Injectable()
export class InputService {

    getInputs() {

        const inputs: InputBase<any>[] = [

            new RadioInput({
                key: 'gender',
                label: 'Gender',
                options: [
                    { key: 'Male', value: 'Male' },
                    { key: 'Female', value: 'Female' }
                ],
                value: 'Male',
                required: true,
                order: 5
            }),

            new DropdownInput({
                key: 'education',
                label: 'Rating',
                options: [
                    { key: '0', value: 'Poor' },
                    { key: '1', value: 'Average' },
                    { key: '2', value: 'Good' },
                    { key: '3', value: 'Excellent' }
                ],
                required: true,
                order: 4
            }),

            new TextboxInput({
                key: 'firstName',
                label: 'First name',
                required: true,
                order: 1
            }),

            new TextboxInput({
                key: 'lastName',
                label: 'Last name',
                required: true,
                order: 2
            }),

            new TextboxInput({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                order: 3
            })
        ];

        return inputs.sort((a, b) => a.order - b.order);
    }
}
