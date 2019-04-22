import 'reflect-metadata';

export const CLASS_PERMISSION_METADATA_KEY = Symbol('dynamicFormMetadata:permissions');

export const TOP_LEVEL_ACCESS_KEY = 'admin';
export const ANY_ROLE_ACCESS_KEY = '*';

function getValueOrDefault (permissions: string|string[]) {
    if (!permissions) {
        return [ TOP_LEVEL_ACCESS_KEY ];
    }

    if (Array.isArray(permissions) && permissions.length === 0) {
        return [ TOP_LEVEL_ACCESS_KEY ];
    }

    if (permissions === '*') {
        return [ ANY_ROLE_ACCESS_KEY ];
    }

    return permissions;
}

export function Permissions(options: {
    create?: string|string[],
    read?: string|string[],
    update?: string|string[],
    delete?: string|string[]
}): Function {

    // '*' -> users with any roles can do the operation
    // [], undefined, null -> only admins can do the operation

    options.create = getValueOrDefault(options.create);
    options.read = getValueOrDefault(options.read);
    options.update = getValueOrDefault(options.update);
    options.delete = getValueOrDefault(options.delete);

    return function (constructor: Function) {
        Reflect.defineMetadata(CLASS_PERMISSION_METADATA_KEY, options, constructor);
        return constructor;
    };
}
