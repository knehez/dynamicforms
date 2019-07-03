import { User } from '../entities/user';
import { Role } from '../entities/role';
import { getRepository } from 'typeorm';
import { Initializer } from './initializer';

export default class UserInitializer extends Initializer {
    repository = getRepository(User);

    async initialize () {

        const user = new User();

        this.getAllRoles()
            .then(roles => {
                user.email = 'user@example.com';
                user.firstName = 'Example';
                user.lastName = 'User';
                user.gender = 'Male';
                // bcrypt hash of 'password':
                user.password = '$2b$10$I3S/NG6EBe4qhU8Mb5e4HunoCvdCHTQuPtxNtQdCduFn93z5Bzh5G';
                user.roles = roles;

                this.entities.push(user);
                super.initialize();
            })
            .catch(err => {
                throw err;
            });
    }

    private getAllRoles () {
        return getRepository(Role).find();
    }
}
