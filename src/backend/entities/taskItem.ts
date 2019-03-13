import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FormField, Permissions } from './decorator';
import { Task } from './task';
import { RoleName } from './role';

@Permissions({
    create: [ RoleName.Admin ],
    read:   [ RoleName.Admin, RoleName.Manager, RoleName.Viewer ],
    update: [ RoleName.Admin ],
    delete: [ RoleName.Admin ]
})
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
    @Column({ type: 'datetime', precision: 0 })
    dueDate: Date;

    @ManyToOne(type => Task, task => task.taskItems)
    task: Task;
}
