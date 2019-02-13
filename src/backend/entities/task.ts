import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FormField } from './decorator';
import { TaskItem } from './taskItem';

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
    @Column({ type: 'datetime', precision: 0 })
    dueDate: Date;

    @FormField({
        className: 'DropdownInput',
        header: 'Task Items',
        linkedObject: 'taskItems',
        linkedData: { key: 'id', value: 'itemName' },
        multipleSelect: true,
        required: true,
        order: 4
    })
    @OneToMany(type => TaskItem, taskItem => taskItem.task, {
        eager: true, cascade: true,
    })
    taskItems: TaskItem[];

    @FormField({
        className: 'CheckBoxInput',
        header: 'Done?',
        type: 'checkbox',
        order: 5
    })
    @Column()
    isDone: boolean;
}
