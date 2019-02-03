export class InputBase<T> {
    value: T;
    key: string;
    header: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    hidden: boolean;
    constructor(options: {
        value?: T,
        key?: string,
        header?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        type?: string,
        hidden?: boolean;
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.header = options.header || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.controlType || 'text';
        this.hidden = options.hidden || false;
    }
}