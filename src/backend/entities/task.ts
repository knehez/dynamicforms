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
        header: 'Due Date',
        required: true,
        type: 'string',
        order: 3
    })
    @Column('date')
    taskName: string;

    @FormField({
        className: 'TextboxInput',
        header: 'Task Name',
        required: true,
        type: 'string',
        order: 2
    })
    @Column()
    dueDate: string;
}
