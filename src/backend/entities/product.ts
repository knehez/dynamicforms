import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FormField, Permissions } from 'ngx-crud-forms/src/decorator';
import { RoleName } from './shared/roleName';

@Permissions({
    read:   '*',
    update: [ RoleName.Admin, RoleName.Manager ]
})
@Entity()
export class Product {
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
        header: 'Product Name',
        required: true,
        type: 'string',
        order: 2
    })
    @Column()
    productName: string;

    @FormField({
        className: 'DropdownInput',
        header: 'Project',
        linkedObject: 'projects',
        linkedData: { entity: 'project', value: 'projectName' },
        required: true,
        order: 3
    })
    @ManyToOne('Project', (project: import('./project').Project) => project.products, { eager: true })
    project!: import('./project').Project;
}
