import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import BaseCtrl from './base.controller';
import { User } from '../entities/user';
import { environment } from '../../environments/environment';

export default class UserCtrl extends BaseCtrl {

    model = getRepository(User);

    insert = async (req, res) => {
        let user = req.body;

        this.hashPassword(user.password)
            .then(hashedPassword => {
                user.password = hashedPassword;
                return user;
            })
            .then(async (user) => {
                const entity = this.model.create(user);
                await this.model.save(entity);
                res.json({ id: entity['id'] });
            })
            .catch(err => this.handleError(err, res));
    };

    update = async (req, res) => {
        let user = req.body;

        if (!user.password) {
            delete user.password; //avoid overwrite to empty string
            
            const entity = await this.model.save(user);
            return res.json({ id: entity['id'] });
        }

        this.hashPassword(req.body.password)
            .then(hashedPassword => {
                user.password = hashedPassword;
                return user;
            })
            .then(async (user) => {
                const entity = await this.model.save(user);
                return res.json({ id: entity['id'] });
            })
            .catch(err => this.handleError(err, res));
    };

    handleError (err, res) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to save user."
        });
    }

    hashPassword (password: string) {
        return bcrypt.hash(password, environment.bcrypt_salt_rounds);
    }
}
