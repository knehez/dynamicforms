import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormField, Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { RoleName } from './shared/roleName';

@Permissions({
    read: '*',
    update: [RoleName.Admin, RoleName.Manager]
})
@Entity()
export class Schedule {
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
        header: 'Description',
        required: true,
        type: 'string',
        style: {
            'width': '350px'
        },
        order: 2
    })
    @Column()
    description: string;

    @FormField({
        className: 'CalendarInput',
        header: 'Start Date',
        required: true,
        type: 'date',
        dateFormat: 'YYYY-MM-DD HH:mm',
        order: 3
    })
    @Column({ type: 'datetime', precision: 0 })
    date: Date;

    @FormField({
        className: 'TextareaInput',
        header: 'Schedule Log',
        cols: 60,
        rows: 10,
        order: 4
    })
    @Column('mediumtext')
    log: string;

    @FormField({
        className: 'TextboxInput',
        header: 'Result',
        type: 'string',
        editable: false,
        order: 5
    })
    @Column()
    result: string;
}
