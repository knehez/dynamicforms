import { Injectable } from '@angular/core';
import { InputBase } from './form-elements/inputBase';
import { DropdownInput } from './form-elements/dropdown';
import { TextboxInput } from './form-elements/textBox';
import { RadioInput } from './form-elements/radio';
import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const PROPERTY_METADATA_KEY = Symbol('propertyMetadata');

export function FormField(updates: InputBase<any>) {
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

@Entity()
export class User {

    @FormField(new TextboxInput({
        header: 'Id',
        required: true,
        type: 'number',
        order: 1,
        hidden: true
    }))
    @PrimaryGeneratedColumn()
    id: number;

    @FormField(new TextboxInput({
        header: 'First name',
        required: true,
        order: 2
    }))
    @Column()
    firstName: string;

    @FormField(new TextboxInput({
        header: 'Last name',
        required: true,
        order: 3
    }))
    @Column()
    lastName: string;

    @FormField(new TextboxInput({
        header: 'Email',
        type: 'email',
        order: 4
    }))
    @Column()
    email: string;

    @FormField(new RadioInput({
        header: 'Gender',
        options: [
            { key: 'Male', value: 'Male' },
            { key: 'Female', value: 'Female' }
        ],
        value: 'Male',
        required: true,
        order: 5
    }))
    @Column()
    gender: string;
}

@Injectable()
export class InputService {

    getInputs() {
        const user = new User();
        const inputs = Reflect.getMetadata(PROPERTY_METADATA_KEY, user);
        const userInputs = [];
        for (const key in inputs) {
            if (inputs.hasOwnProperty(key)) {
                const element = inputs[key];
                // copy element name as key
                element['key'] = key;
                userInputs.push(element);
            }
        }
        return userInputs.sort((a, b) => a.order - b.order);
        /* const inputs: InputBase<any>[] = [
/*
        new RadioInput({
            header: 'Gender',
            options: [
                { key: 'Male', value: 'Male' },
                { key: 'Female', value: 'Female' }
            ],
            value: 'Male',
            required: true,
            order: 5
        }),

        new DropdownInput({
            header: 'Rating',
            options: [
                { key: '0', value: 'Poor' },
                { key: '1', value: 'Average' },
                { key: '2', value: 'Good' },
                { key: '3', value: 'Excellent' }
            ],
            required: true,
            order: 4
        }),
*/
    }
}
