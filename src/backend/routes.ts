import * as express from 'express';
import UserCtrl from './controllers/user.controller';
import BaseCtrl from './controllers/base.controller';
import TaskCtrl from './controllers/task.controller';
import TaskItemCtrl from './controllers/taskItem.controller';

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

  app.use('/backend', router);
}

function getGeneralRoutes(router, entityName: string, ctrl: BaseCtrl) {
  router.route('/' + `${entityName}`).get(ctrl.getAll);
  router.route('/' + `${entityName}` + '/:id').get(ctrl.get);
  router.route('/' + `${entityName}`).post(ctrl.insert);
  router.route('/' + `${entityName}` + '/:id').put(ctrl.update);
  router.route('/' + `${entityName}` + '/:id').delete(ctrl.delete);
}
