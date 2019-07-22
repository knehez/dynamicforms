import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Machine } from '../entities/machine';

export default class MachineCtrl extends BaseCtrl {
    model = getRepository(Machine);
}
