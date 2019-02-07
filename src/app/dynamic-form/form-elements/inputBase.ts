export interface ILinkedData {
    key: string;
    value: string;
}

export class InputBase<T> {
    value: T;
    defaultValue: T;
    key: string;
    header: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    hidden: boolean;
    dateFormat: string;
    linkedObject: string;
    linkedData: {};
    constructor(options: {
        value?: T,
        defaultValue?: T;
        key?: string,
        header?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        type?: string,
        hidden?: boolean,
        dateFormat?: string;
        linkedObject?: string,
        linkedData?: ILinkedData;
    } = {}) {
        this.value = options.value;
        this.defaultValue = options.defaultValue;
        this.key = options.key || '';
        this.header = options.header || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.type = options.type || 'text';
        this.hidden = options.hidden || false;
        this.dateFormat = options.dateFormat || '';
        this.linkedObject = options.linkedObject || null;
        this.linkedData = options.linkedData || null;
    }
}
