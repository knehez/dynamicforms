import UserInitializer from './userInitializer';
import { Initializer } from './initializer';

export default function initializeDatabase () {
    const initializers: Initializer[] = [
        new UserInitializer
    ];

    for (const initializer of initializers) {
        initializer.initialize();
    }
}