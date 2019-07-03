import UserInitializer from './userInitializer';
import RoleInitializer from './roleInitializer';
import { Initializer } from './initializer';

export default async function initializeDatabase () {
    const initializers: Initializer[] = [
        new RoleInitializer,
        new UserInitializer
    ];

    for (const initializer of initializers) {
        await initializer.initialize();
    }
}
