import { getRepository } from 'typeorm';
import { Initializer } from './initializer';
import { TimeShift } from '../entities/timeshift';

export default class TimeShiftInitializer extends Initializer {
    repository = getRepository(TimeShift);

    async initialize () {
        let timeShift = new TimeShift('Shift 1: 00:00 - 08:00', 0, 60 * 8);
        this.entities.push(timeShift);
        timeShift = new TimeShift('Shift 2: 08:00 - 16:00', 60 * 8, 60 * 16);
        this.entities.push(timeShift);
        timeShift = new TimeShift('Shift 3: 16:00 - 00:00', 60 * 16, 60 * 23);
        this.entities.push(timeShift);
        await super.initialize();
    }
}
