import 'reflect-metadata';

export const PROPERTY_METADATA_KEY = Symbol('dynamicFormMetadata');

export function FormField(updates: any) {
    return (target: any, propertyKey: string | symbol) => {
        // Pull the existing metadata or create an empty object
        const allMetadata = Reflect.getMetadata(PROPERTY_METADATA_KEY, target) || {};

        // Ensure allMetadata has propertyKey
        allMetadata[propertyKey] = allMetadata[propertyKey] || {};

        // Update the metadata with anything from updates
        for (const key of Reflect.ownKeys(updates)) {
            allMetadata[propertyKey][key] = updates[key];
        }
        // Update the metadata
        Reflect.defineMetadata(
            PROPERTY_METADATA_KEY,
            allMetadata,
            target,
        );
    };
}
