import { InputBase } from './inputBase';

export class CheckBoxInput extends InputBase<boolean> {
    controlType = 'checkbox';

    constructor(options: {} = {}) {
        super(options);
    }
}
