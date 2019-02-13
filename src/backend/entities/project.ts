import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FormField } from './decorator';
import { Product } from './product';

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
