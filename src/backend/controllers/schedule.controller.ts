import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Schedule } from '../entities/schedule';

export default class ScheduleCtrl extends BaseCtrl {
    model = getRepository(Schedule);
}
