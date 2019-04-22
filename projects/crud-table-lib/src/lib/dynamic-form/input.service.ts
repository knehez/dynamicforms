import { Injectable } from '@angular/core';
import { DropdownInput } from './form-elements/dropdown';
import { TextboxInput } from './form-elements/textBox';
import { TextareaInput } from './form-elements/textArea';
import { RadioInput } from './form-elements/radio';
import 'reflect-metadata';
import { PROPERTY_METADATA_KEY, CLASS_PERMISSION_METADATA_KEY, TOP_LEVEL_ACCESS_KEY } from '../decorator';
import { CalendarInput } from './form-elements/calendar';
import { CheckBoxInput } from './form-elements/checkbox';
import { FileInput } from './form-elements/fileinput';

@Injectable({
    providedIn: 'root'
})
export class InputService {
    getFormElements(entity) {
        const userInputs = [];

        if (!entity) {
            return userInputs;
        }

        const metadata = Reflect.getMetadata(PROPERTY_METADATA_KEY, entity);

        for (const key in metadata) {
            if (metadata.hasOwnProperty(key)) {
                const params = metadata[key];
                // copy element name as key
                params['key'] = key;
                const className = params['className'];
                let controlObject: any;
                switch (className) {
                    case 'TextboxInput':
                        controlObject = new TextboxInput(params);
                        break;
                    case 'TextareaInput':
                        controlObject = new TextareaInput(params);
                        break;
                    case 'DropdownInput':
                        controlObject = new DropdownInput(params);
                        break;
                    case 'RadioInput':
                        controlObject = new RadioInput(params);
                        break;
                    case 'CheckBoxInput':
                        controlObject = new CheckBoxInput(params);
                        break;
                    case 'CalendarInput':
                        controlObject = new CalendarInput(params);
                        break;
                    case 'FileInput':
                        controlObject = new FileInput(params);
                        break;
                    default:
                        throw new Error('dynamicForm: className not found:' + className);
                }

                userInputs.push(controlObject);
            }
        }

        return userInputs.sort((a, b) => a.order - b.order);
    }

    getPermissions (entity) {
        const onlyAdminPermissions = {
            create: [TOP_LEVEL_ACCESS_KEY],
            read:   [TOP_LEVEL_ACCESS_KEY],
            update: [TOP_LEVEL_ACCESS_KEY],
            delete: [TOP_LEVEL_ACCESS_KEY]
        };

        if (!entity || !entity.constructor) {
            return onlyAdminPermissions;
        }

        return Reflect.getMetadata(CLASS_PERMISSION_METADATA_KEY, entity.constructor) || onlyAdminPermissions;
    }
}
