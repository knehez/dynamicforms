import { Injectable } from '@angular/core';
import { InputBase } from './inputBase';
import { DropdownInput } from './form-elements/dropdown';
import { TextboxInput } from './form-elements/textBox';

@Injectable()
export class InputService {

    getInputs() {

        const inputs: InputBase<any>[] = [

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
                order: 3
            }),

            new TextboxInput({
                key: 'firstName',
                label: 'First name',
                value: '',
                required: true,
                order: 1
            }),

            new TextboxInput({
                key: 'lastName',
                label: 'Last name',
                value: '',
                required: true,
                order: 1
            }),

            new TextboxInput({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                order: 2
            })
        ];

        return inputs.sort((a, b) => a.order - b.order);
    }
}
