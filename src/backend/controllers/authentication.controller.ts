import { getRepository } from 'typeorm';
import { User } from '../entities/user';
import BaseCtrl from './base.controller';
import { environment } from '../../environments/environment';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export default class AuthenticationCtrl extends BaseCtrl {

    model = getRepository(User);

    login = async (req, res) => {
        const credentials = req.body;

        if (!credentials.hasOwnProperty('username') || !credentials.hasOwnProperty('password')) {
            return this.handleError(res, 'No credentials given.');
        }

        const user = await this.model.findOne({
            select: [ 'id', 'password', 'email' ],
            where: {
                email: credentials.username
            }
        });

        const passwordMatches = await bcrypt.compare(credentials.password, user.password);

        if (!user || !passwordMatches) {
            return this.handleError(res, 'Bad credentials given.');
        }

        let payload = { id: user.id };
        let jwtSecret = environment.jwt_secret;
        let options = { expiresIn: environment.jwt_expires_in };

        jwt.sign(payload, jwtSecret, options, (err, token) => {
            if (err) {
                console.error(err);
                return this.handleError(res, 'Unable to create access token.');
            }

            res.json({
                success: true,
                accessToken: token
            });
        });
    };

    handleError (res, message) {
        res.status(401).json({
            success: false,
            message: message
        });
    }
}