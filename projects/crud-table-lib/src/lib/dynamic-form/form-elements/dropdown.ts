import { InputBase } from './inputBase';


export class DropdownInput extends InputBase<string> {
    controlType = 'dropdown';
    multipleSelect;
    options: { key: string, value: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
        this.multipleSelect = options['multipleSelect'] || false;
    }
}
