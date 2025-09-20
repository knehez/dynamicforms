import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { FormField, Permissions } from 'ngx-crud-forms/src/decorator';
import { TimeShift } from './timeshift';
import { RoleName } from './shared/roleName';

@Permissions({
    read: '*',
    update: [RoleName.Admin, RoleName.Manager]
})
@Entity()
export class Machine {

    constructor(name?, description?, setupTime?, timeShifts?: TimeShift[]) {
        // simple but dirty solution of simulate multiple constructors
        if (!name) { return; }
        this.name = name;
        this.description = description;
        this.setupTime = setupTime;
        this.timeShifts = timeShifts;
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
        header: 'Machine Name',
        required: true,
        type: 'string',
        order: 2
    })
    @Column()
    name: string;

    @FormField({
        className: 'TextboxInput',
        header: 'Description',
        required: true,
        type: 'string',
        order: 3
    })
    @Column()
    description: string;

    @FormField({
        className: 'TextboxInput',
        header: 'Setup Time',
        required: true,
        type: 'number',
        order: 4
    })
    @Column()
    setupTime: number;

    @FormField({
        className: 'DropdownInput',
        header: 'Time Shifts',
        linkedObject: 'timeShifts',
        linkedData: { key: 'id', value: 'name' },
        multipleSelect: true,
        required: true,
        order: 5
    })
    @ManyToMany(type => TimeShift, {
        eager: true, cascade: true,
    })
    @JoinTable()
    timeShifts: TimeShift[];
}
