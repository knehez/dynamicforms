import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Route } from '../entities/route';

export default class RouteCtrl extends BaseCtrl {
    model = getRepository(Route);
}
