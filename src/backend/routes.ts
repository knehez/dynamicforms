import * as express from 'express';
import UserCtrl from './controllers/user.controller';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();

  // Users
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/:id').get(userCtrl.get);
  router.route('/users').post(userCtrl.insert);
  router.route('/users/:id').put(userCtrl.update);
  router.route('/users/:id').delete(userCtrl.delete);
  app.use('/backend', router);
}
