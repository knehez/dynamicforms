import { InputBase } from './inputBase';

export class CalendarInput extends InputBase<string> {
    controlType = 'calendar';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
