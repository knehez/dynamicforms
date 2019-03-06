import { InputBase } from './inputBase';

export class TextareaInput extends InputBase<string> {
    controlType = 'textarea';

    constructor(options: {} = {}) {
        super(options);
    }
}
