import { getRepository } from 'typeorm';
import { User } from '../entities/user';
import BaseCtrl from './base.controller';
import { environment } from '../../environments/environment';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Role } from '../entities/role';

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

        if (!user) {
            return this.handleError(res, 'Bad credentials given.');
        }

        const roles = await getRepository(Role)
            .createQueryBuilder()
            .innerJoin('user_roles_role', 'user_roles_role')
            .where('user_roles_role.userId = :userId', { userId: user.id })
            .andWhere('user_roles_role.roleId = role.id')
            .getMany();

        const passwordMatches = await bcrypt.compare(credentials.password, user.password);

        if (!user || !roles || !passwordMatches) {
            return this.handleError(res, 'Bad credentials given.');
        }

        const payload = {
            id: user.id,
            roles: this.getRoleNames(roles)
        };
        const jwtSecret = environment.jwt_secret;
        const options = { expiresIn: environment.jwt_expires_in };

        jwt.sign(payload, jwtSecret, options, (err, token) => {
            if (err) {
                console.error(err);
                return this.handleError(res, 'Unable to create access token.');
            }

            res.json({
                success: true,
                accessToken: token,
                roles: this.getRoleNames(roles)
            });
        });
    }

    handleError (res, message) {
        res.status(401).json({
            success: false,
            message: message
        });
    }

    getRoleNames (roles: {}[]): string[] {
        return roles.map(role => role['roleName']);
    }
}
