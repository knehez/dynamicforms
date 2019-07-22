import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FormField, Permissions } from '../../../projects/crud-table-lib/src/public_api';
import { Machine } from './machine';
import { RoleName } from './shared/roleName';

@Permissions({
    read:   '*',
    update: [ RoleName.Admin, RoleName.Manager ]
})
@Entity()
export class TimeShift {
    constructor(name?, startTime?, endTime?) {
        // simple but dirty solution of simulate multiple constructors
        if (!name) { return; }
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
    }
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
        header: 'Name',
        required: true,
        type: 'string',
        order: 2
    })
    @Column()
    name: string;

    @FormField({
        className: 'TextboxInput',
        header: 'Start Time [min]',
        required: true,
        editable: true,
        type: 'number',
        order: 3
    })
    @Column()
    startTime: number;

    @FormField({
        className: 'TextboxInput',
        header: 'End Time [min]',
        required: true,
        editable: true,
        type: 'number',
        order: 4
    })
    @Column()
    endTime: number;
}
