import { Initializer } from './initializer';
import { Role } from '../entities/role';
import { getRepository } from 'typeorm';
import { RoleName } from '../entities/shared/roleName';

export default class RoleInitializer extends Initializer {
    repository = getRepository(Role);

    constructor () {
        super();

        for (const roleName in RoleName) {
            if (isNaN(Number(roleName))) {
                const role = new Role();
                role.roleName = RoleName[String(roleName)];
                this.entities.push(role);
            }
        }
    }

    async initialize () {
        for (const role of this.entities) {
            const isRoleInTable = await this.repository
                .createQueryBuilder()
                .where({ roleName: role.roleName })
                .getCount();

            if (!isRoleInTable) {
                await this.repository.save(role);
            }
        }
    }
}
