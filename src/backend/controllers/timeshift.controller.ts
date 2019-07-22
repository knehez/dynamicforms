import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { TimeShift } from '../entities/timeshift';

export default class TimeShiftCtrl extends BaseCtrl {
    model = getRepository(TimeShift);
}
