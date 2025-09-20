import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from 'ngx-crud-forms/src/decorator';
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
