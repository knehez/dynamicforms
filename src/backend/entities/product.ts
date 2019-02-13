import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FormField } from './decorator';
import { Task } from './task';
import { Project } from './project';

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
        linkedData: { key: 'id', value: 'projectName' },
        required: true,
        order: 3
    })
    @ManyToOne(type => Project, project => project.products, { eager: true })
    project: Project;
}
