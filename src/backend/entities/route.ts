import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FormField, Permissions } from '../utils/ngx-crud-forms-decorators';
import { RoleName } from './shared/roleName';

@Permissions({
    read:   '*',
    update: [ RoleName.Admin, RoleName.Manager ]
})
@Entity()
export class Route {
    constructor(name?, operations?) {
        // simple but dirty solution of simulate multiple constructors
        if (!name) { return; }
        this.name = name;
        this.operations = JSON.stringify(operations);
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
        header: 'Route Name',
        required: true,
        type: 'string',
        order: 2
    })
    @Column()
    name: string;

    @FormField({
        className: 'TextareaInput',
        header: 'Operations',
        cols: 60,
        rows: 10,
        order: 3,
        style: {
            'width': '350px'
        },
    })
    @Column('mediumtext')
    operations: string;
}
