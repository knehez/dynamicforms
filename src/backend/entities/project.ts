import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FormField, Permissions } from './decorator';
import { Product } from './product';
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

    @FormField({
        className: 'FileInput',
        header: 'File',
        required: false,
        type: 'file',
        order: 3
      })
      @Column('longtext', { nullable: true })
      fileData: any;

    @OneToMany(type => Product, product => product.project)
    products: Product[];
}
