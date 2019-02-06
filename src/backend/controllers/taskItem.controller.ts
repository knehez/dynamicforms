import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { TaskItem } from '../entities/taskItem';

export default class TaskItemCtrl extends BaseCtrl {
    model = getRepository(TaskItem);
}
