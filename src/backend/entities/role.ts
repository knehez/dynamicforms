import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleName {
    Admin = 'admin',
    Manager = 'manager',
    Viewer = 'viewer'
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName: RoleName;
}
