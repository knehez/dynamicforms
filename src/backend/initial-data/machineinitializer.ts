import { User } from '../entities/user';
import { Role } from '../entities/role';
import { getRepository } from 'typeorm';
import { Initializer } from './initializer';
import { TimeShift } from '../entities/timeshift';
import { Machine } from '../entities/machine';

export default class MachineInitializer extends Initializer {
    repository = getRepository(Machine);

    async initialize() {
        const timeShifts = await this.getAllTimeShifts();

        this.entities.push(new Machine('STAR_SV32J_2', 'Hosszeszterga', 100, timeShifts));
        this.entities.push(new Machine('STAR_SV32J_3', 'Hosszeszterga', 100, timeShifts));
        this.entities.push(new Machine('STAR_SR38', 'Hosszeszterga', 100, timeShifts));
        this.entities.push(new Machine('STAR_SV32J_4', 'Hosszeszterga', 100, timeShifts));

        this.entities.push(new Machine('GT 200', 'Eszterga', 10, timeShifts));
        this.entities.push(new Machine('EEN320_2', 'Eszterga', 10, timeShifts));

        this.entities.push(new Machine('TBT', 'Hosszlyukfúró', 10, timeShifts));
        this.entities.push(new Machine('AUERBACH', 'Hosszlyukfúró', 10, timeShifts));
        this.entities.push(new Machine('IXION-1', 'Hosszlyukfúró', 10, timeShifts));

        this.entities.push(new Machine('Hajlítás 1', 'Kézi', 0, timeShifts));
        this.entities.push(new Machine('Hajlítás 2', 'Kézi', 0, timeShifts));

        this.entities.push(new Machine('NXV560A1', 'Megmunkáló központ', 10, timeShifts));
        this.entities.push(new Machine('NXV560A2', 'Megmunkáló központ', 10, timeShifts));
        this.entities.push(new Machine('MV66A_10', 'Megmunkáló központ', 10, timeShifts));
        this.entities.push(new Machine('MV66A_5', 'Megmunkáló központ', 10, timeShifts));
        this.entities.push(new Machine('MV66A4T1', 'Megmunkáló központ', 10, timeShifts));
        this.entities.push(new Machine('MV66A4T2', 'Megmunkáló központ', 10, timeShifts));

        this.entities.push(new Machine('Sorjázás', 'Kézi', 0, timeShifts));

        this.entities.push(new Machine('Csiszolás 1', 'Csiszolás 1', 0, timeShifts));
        this.entities.push(new Machine('Csiszolás 2', 'Csiszolás 2', 0, timeShifts));

        await super.initialize();
    }

    async getAllTimeShifts() {
        return await getRepository(TimeShift).find();
    }
}
