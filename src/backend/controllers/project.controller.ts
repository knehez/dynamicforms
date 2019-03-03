import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Project } from '../entities/project';

export default class ProjectCtrl extends BaseCtrl {
    model = getRepository(Project);
}
