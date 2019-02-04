import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormField } from './decorator';
import * as moment from 'moment';

@Entity()
export class Task {
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
        header: 'Task Name',
        required: true,
        type: 'string',
        order: 2
    })
    @Column()
    taskName: string;

    @FormField({
        className: 'CalendarInput',
        header: 'Due Date',
        value: { date: moment().format('YYYY-MM-DD') },
        toString: (o) => { 'hello'; },
        required: true,
        type: 'string',
        order: 3
    })
    @Column('datetime')
    dueDate: Date;
}
