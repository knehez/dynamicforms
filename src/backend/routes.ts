import * as express from 'express';
import UserCtrl from './controllers/user.controller';
import BaseCtrl from './controllers/base.controller';
import TaskCtrl from './controllers/task.controller';
import TaskItemCtrl from './controllers/taskItem.controller';
import ProductCtrl from './controllers/product.controller';
import ProjectCtrl from './controllers/project.controller';
import AuthenticationCtrl from './controllers/authentication.controller';
import ScheduleCtrl from './controllers/schedule.controller';
import RoleCtrl from './controllers/role.controller';
import { CLASS_PERMISSION_METADATA_KEY, ANY_ROLE_ACCESS_KEY } from '../../projects/crud-table-lib/src/public_api';
import { User } from './entities/user';
import { Task } from './entities/task';
import { TaskItem } from './entities/taskItem';
import { Product } from './entities/product';
import { Project } from './entities/project';
import { Schedule } from './entities/schedule';
import { Role } from './entities/role';
import errorCodes from '../utils/error.codes';
import { haveIntersection } from '../utils/array';

export default function setRoutes(app) {

  const router = express.Router();

  // Users
  getGeneralRoutes({
    router,
    entityName: 'users',
    entity: new User,
    ctrl: new UserCtrl
  });

  // Tasks
  getGeneralRoutes({
    router,
    entityName: 'tasks',
    entity: new Task,
    ctrl: new TaskCtrl
  });

  // Task Items
  getGeneralRoutes({
    router,
    entityName: 'taskitems',
    entity: new TaskItem,
    ctrl: new TaskItemCtrl
  });

  // Products
  getGeneralRoutes({
    router,
    entityName: 'products',
    entity: new Product,
    ctrl: new ProductCtrl
  });

  // Projects
  getGeneralRoutes({
    router,
    entityName: 'projects',
    entity: new Project,
    ctrl: new ProjectCtrl
  });

  // Schedules
  getGeneralRoutes({
    router,
    entityName: 'schedules',
    entity: new Schedule,
    ctrl: new ScheduleCtrl
  });

  // Roles
  getGeneralRoutes({
    router,
    entityName: 'roles',
    entity: new Role,
    ctrl: new RoleCtrl
  });

  // Authentication
  const authenticationCtrl = new AuthenticationCtrl();
  router.post('/login', authenticationCtrl.login);

  app.use('/backend', router);
}

function getGeneralRoutes(routingInfo: {
    router: any,
    entity: any,
    entityName: string,
    ctrl: BaseCtrl
  }) {

  const router = routingInfo.router;
  const entity = routingInfo.entity;
  const entityName = routingInfo.entityName;
  const ctrl = routingInfo.ctrl;
  const permissions = Reflect.getMetadata(CLASS_PERMISSION_METADATA_KEY, entity.constructor) || {};

  router.get   (`/${entityName}`,     getRoleChecker(permissions.read),   ctrl.getAll);
  router.get   (`/${entityName}/:id`, getRoleChecker(permissions.read),   ctrl.get);
  router.post  (`/${entityName}`,     getRoleChecker(permissions.create), ctrl.insert);
  router.put   (`/${entityName}/:id`, getRoleChecker(permissions.update), ctrl.update);
  router.delete(`/${entityName}/:id`, getRoleChecker(permissions.delete), ctrl.delete);
  router.post  (`/${entityName}/file`, getRoleChecker(permissions.read), ctrl.file);

}

function getRoleChecker (allowedRoles) {
  return (req, res, next) => {
    const userRoles = req.user.roles || [];
    allowedRoles = allowedRoles || [];

    if (!haveIntersection(userRoles, allowedRoles) &&
          !allowedRoles.includes(ANY_ROLE_ACCESS_KEY)) {
      return res.status(401).json({
        success: false,
        errcode: errorCodes.noAppropriateRoles,
        message: 'Client has not own the appropriate roles.'
      });
    }

    next();
  };
}
