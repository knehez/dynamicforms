import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FormField } from './decorator';
import { Task } from './task';

@Entity()
export class TaskItem {
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
        header: 'Item Name',
        required: true,
        type: 'string',
        order: 2
    })
    @Column()
    itemName: string;

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

    @ManyToOne(type => Task, task => task.taskItems)
    task: Task;
}
