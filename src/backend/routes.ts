import * as express from 'express';
import UserCtrl from './controllers/user.controller';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();

  // Users
  const user = 'users';
  router.route('/' + `${user}`).get(userCtrl.getAll);
  router.route('/' + `${user}` + '/:id').get(userCtrl.get);
  router.route('/' + `${user}`).post(userCtrl.insert);
  router.route('/' + `${user}` + '/:id').put(userCtrl.update);
  router.route('/' + `${user}` + '/:id').delete(userCtrl.delete);

  app.use('/backend', router);
}
