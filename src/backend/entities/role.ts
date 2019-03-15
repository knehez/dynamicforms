import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from './decorator';

export enum RoleName {
    Admin = 'admin',
    Manager = 'manager',
    Viewer = 'viewer'
}

@Permissions({
    create: [ RoleName.Admin ],
    read: [ RoleName.Admin, RoleName.Manager, RoleName.Viewer ],
    update: [ RoleName.Admin, RoleName.Manager ],
    delete: [ RoleName.Admin ]
})
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName: RoleName;
}
