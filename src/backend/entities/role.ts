import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from '../utils/ngx-crud-forms-decorators';
import { RoleName } from './shared/roleName';

@Permissions({
    read:   '*',
    update: [ RoleName.Admin, RoleName.Manager ]
})
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName: RoleName;
}
