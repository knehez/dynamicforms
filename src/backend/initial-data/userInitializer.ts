import { User } from '../entities/user';
import { getRepository } from 'typeorm';
import { Initializer } from './initializer';

export default class UserInitializer extends Initializer {
    repository = getRepository(User);

    constructor () {
        super();

        let user = new User();
        user.email = 'user@example.com';
        user.firstName = 'Example';
        user.lastName = 'User';
        user.gender = 'Male';
        user.password = '$2b$10$I3S/NG6EBe4qhU8Mb5e4HunoCvdCHTQuPtxNtQdCduFn93z5Bzh5G'; //bcrypt hash of 'password'
        this.entities.push(user);
    }
}