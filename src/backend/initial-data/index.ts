import UserInitializer from './userInitializer';
import RoleInitializer from './roleInitializer';
import { Initializer } from './initializer';

export default function initializeDatabase () {
    const initializers: Initializer[] = [
        new RoleInitializer,
        new UserInitializer
    ];

    for (const initializer of initializers) {
        initializer.initialize();
    }
}
