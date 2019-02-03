import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Task } from '../entities/task';

export default class TaskCtrl extends BaseCtrl {
    model = getRepository(Task);
}
