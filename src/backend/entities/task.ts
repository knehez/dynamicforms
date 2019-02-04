import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormField } from './decorator';

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
        required: true,
        type: 'date',
        dateFormat: 'YYYY-MM-DD',
        order: 3
    })
    @Column('datetime')
    dueDate: Date;
}
