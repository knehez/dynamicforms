import * as express from 'express';
import UserCtrl from './controllers/user.controller';
import BaseCtrl from './controllers/base.controller';
import TaskCtrl from './controllers/task.controller';
import TaskItemCtrl from './controllers/taskItem.controller';
import ProductCtrl from './controllers/product-controller';
import ProjectCtrl from './controllers/project-controller';
import AuthenticationCtrl from './controllers/authentication.controller';

export default function setRoutes(app) {

  const router = express.Router();

  // Users
  const userCtrl = new UserCtrl();
  const user = 'users';
  getGeneralRoutes(router, user, userCtrl);

  // Tasks
  const tasks = 'tasks';
  const taskCtrl = new TaskCtrl();

  getGeneralRoutes(router, tasks, taskCtrl);

  // Task Items
  const tasksItems = 'taskitems';
  const taskItemCtrl = new TaskItemCtrl();

  getGeneralRoutes(router, tasksItems, taskItemCtrl);

  // Products
  const products = 'products';
  const productCtrl = new ProductCtrl();

  getGeneralRoutes(router, products, productCtrl);

  // Projects
  const projets = 'projects';
  const projectCtrl = new ProjectCtrl();

  getGeneralRoutes(router, projets, projectCtrl);

  // Authentication
  const authenticationCtrl = new AuthenticationCtrl();
  router.post('/login', authenticationCtrl.login);

  app.use('/backend', router);
}

function getGeneralRoutes(router, entityName: string, ctrl: BaseCtrl) {
  router.route('/' + `${entityName}`).get(ctrl.getAll);
  router.route('/' + `${entityName}` + '/:id').get(ctrl.get);
  router.route('/' + `${entityName}`).post(ctrl.insert);
  router.route('/' + `${entityName}` + '/:id').put(ctrl.update);
  router.route('/' + `${entityName}` + '/:id').delete(ctrl.delete);
}
