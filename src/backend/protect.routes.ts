import * as jwt from 'express-jwt';
import { environment } from '../environments/environment';
import errorCodes from '../utils/error.codes';

export function protectRoutes (app) {
    app.use(jwt({
        secret: environment.jwt_secret,
        credentialsRequired: true
    })
    .unless({ path: ['/backend/login'] }));

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                success: false,
                errcode: errorCodes.invalidAccessToken,
                message: 'Authorization is failed.'
            });
        }
    });
}
