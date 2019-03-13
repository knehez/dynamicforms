import BaseCtrl from './base.controller';
import { getRepository } from 'typeorm';
import { Role } from '../entities/role';

export default class RoleCtrl extends BaseCtrl {
    model = getRepository(Role);
}
