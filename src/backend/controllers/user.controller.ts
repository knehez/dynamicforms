import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { User } from '../entities/user';

export default class UserCtrl extends BaseCtrl {
    model = getRepository(User);
}

