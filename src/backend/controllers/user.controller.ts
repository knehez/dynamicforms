import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import BaseCtrl from './base.controller';
import { User } from '../entities/user';
import { environment } from '../../environments/environment';

export default class UserCtrl extends BaseCtrl {

    model = getRepository(User);

    insert = async (req, res) => {
        const user = req.body;

        this.hashPassword(user.password)
            .then(hashedPassword => {
                user.password = hashedPassword;
                return user;
            })
            .then(async (userToCreate) => {
                const entity = this.model.create(userToCreate);
                await this.model.save(entity);
                res.json({ id: entity['id'] });
            })
            .catch(err => this.handleError(err, res));
    }

    update = async (req, res) => {
        const user = req.body;

        if (!user.password) {
            delete user.password; // avoid overwrite to empty string

            const entity = await this.model.save(user);
            return res.json({ id: entity['id'] });
        }

        this.hashPassword(user.password)
            .then(hashedPassword => {
                user.password = hashedPassword;
                return user;
            })
            .then(async (userToUpdate) => {
                const entity = await this.model.save(userToUpdate);
                return res.json({ id: entity['id'] });
            })
            .catch(err => this.handleError(err, res));
    }

    handleError (err, res) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: 'Unable to save user.'
        });
    }

    hashPassword (password: string) {
        return bcrypt.hash(password, environment.bcrypt_salt_rounds);
    }
}
