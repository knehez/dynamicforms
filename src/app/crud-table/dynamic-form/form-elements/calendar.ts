import { InputBase } from './inputBase';

export class CalendarInput extends InputBase<Date> {
    controlType = 'calendar';
    type: 'date';

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
