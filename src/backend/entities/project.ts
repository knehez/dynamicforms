import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FormField, Permissions } from './decorator';
import { Product } from './product';
import { RoleName } from './role';

@Permissions({
    create: [ RoleName.Admin ],
    read:   [ RoleName.Admin, RoleName.Manager, RoleName.Viewer ],
    update: [ RoleName.Admin ],
    delete: [ RoleName.Admin ]
})
@Entity()
export class Project {
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
        header: 'Project Name',
        required: true,
        type: 'string',
        order: 2
    })
    @Column()
    projectName: string;

    @OneToMany(type => Product, product => product.project)
    products: Product[];
}
