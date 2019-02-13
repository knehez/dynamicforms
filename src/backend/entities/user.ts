import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { FormField } from './decorator';
import { Task } from './task';

@Entity()
export class User {

    @FormField({
        className: 'TextboxInput',
        header: 'Id',
        required: true,
        type: 'number',
        order: 1,
        hidden: true
    })
    @PrimaryGeneratedColumn()
    id: number;

    @FormField({
        className: 'TextboxInput',
        header: 'First name',
        required: true,
        order: 2
    })
    @Column()
    firstName: string;

    @FormField({
        className: 'TextboxInput',
        header: 'Last name',
        required: true,
        order: 3
    })
    @Column()
    lastName: string;

    @FormField({
        className: 'TextboxInput',
        header: 'Email',
        type: 'email',
        order: 4
    })
    @Column()
    email: string;

    @FormField({
        className: 'RadioInput',
        header: 'Gender',
        options: [
            { key: 'Male', value: 'Male' },
            { key: 'Female', value: 'Female' }
        ],
        value: 'Male',
        required: true,
        order: 5
    })
    @Column()
    gender: string;

    @FormField({
        className: 'DropdownInput',
        header: 'Tasks',
        linkedObject: 'tasks',
        linkedData: { key: 'id', value: 'taskName' },
        multipleSelect: true,
        required: true,
        order: 4
    })
    @ManyToMany(type => Task, {
        eager: true, cascade: true,
    })
    @JoinTable()
    tasks: Task[];
}
