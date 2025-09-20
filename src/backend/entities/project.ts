import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FormField, Permissions } from '../utils/ngx-crud-forms-decorators';
import { RoleName } from './shared/roleName';

@Permissions({
    read:   '*',
    update: [ RoleName.Admin, RoleName.Manager ]
})
@Entity()
export class Project {
    @FormField({
        className: 'TextboxInput',
        header: 'Id',
        required: true,
        type: 'number',
        order: 2,
        hidden: true
    })
    @PrimaryGeneratedColumn()
    id: number;

    @FormField({
        className: 'TextboxInput',
        header: 'Project Name',
        required: true,
        type: 'string',
        order: 3
    })
    @Column()
    projectName: string;

    @FormField({
        className: 'FileInput',
        header: '',
        required: false,
        type: 'file',
        order: 1
      })
    @Column({ nullable: true })
        fileData: string;

    @OneToMany('Product', (product: import('./product').Product) => product.project)
    products!: Array<import('./product').Product>;
}
