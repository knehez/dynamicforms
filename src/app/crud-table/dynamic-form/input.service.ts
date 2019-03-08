import { Injectable } from '@angular/core';
import { DropdownInput } from './form-elements/dropdown';
import { TextboxInput } from './form-elements/textBox';
import { TextareaInput } from './form-elements/textarea';
import { RadioInput } from './form-elements/radio';
import 'reflect-metadata';
import { PROPERTY_METADATA_KEY } from 'src/backend/entities/decorator';
import { CalendarInput } from './form-elements/calendar';
import { CheckBoxInput } from './form-elements/checkbox';

export function FormField(updates: any) {
    return (target: any, propertyKey: string | symbol) => {
        // Pull the existing metadata or create an empty object
        const allMetadata = Reflect.getMetadata(PROPERTY_METADATA_KEY, target) || {};

        // Ensure allMetadata has propertyKey
        allMetadata[propertyKey] = allMetadata[propertyKey] || {};

        // Update the metadata with anything from updates
        for (const key of Reflect.ownKeys(updates)) {
            allMetadata[propertyKey][key] = updates[key];
        }
        // Update the metadata
        Reflect.defineMetadata(
            PROPERTY_METADATA_KEY,
            allMetadata,
            target,
        );
    };
}

@Injectable()
export class InputService {

    getFormElements(entity) {
        const metadata = Reflect.getMetadata(PROPERTY_METADATA_KEY, entity);
        const userInputs = [];
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
                    default:
                        throw new Error('dynamicForm: className not found:' + className);
                }

                userInputs.push(controlObject);
            }
        }
        return userInputs.sort((a, b) => a.order - b.order);
    }
}
