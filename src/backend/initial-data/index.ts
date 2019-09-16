import UserInitializer from './userInitializer';
import RoleInitializer from './roleInitializer';
import { Initializer } from './initializer';
import TimeShiftInitializer from './timeshiftinitializer';
import MachineInitializer from './machineinitializer';
import RouterInitializer from './routeinitializer';

export default async function initializeDatabase () {
    const initializers: Initializer[] = [
        new RoleInitializer,
        new UserInitializer,
        new TimeShiftInitializer,
        new MachineInitializer,
        new RouterInitializer,
    ];

    for (const initializer of initializers) {
        await initializer.initialize();
    }
}
