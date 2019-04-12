import 'reflect-metadata';
import { RoleName, getAllRoleNames } from './shared/roleName';

export const CLASS_PERMISSION_METADATA_KEY = Symbol('dynamicFormMetadata:permissions');

function getValueOrDefault (permissions: RoleName[] | '*') {
    if (!permissions) {
        return [ RoleName.Admin ];
    }

    if (Array.isArray(permissions) && permissions.length === 0) {
        return [ RoleName.Admin ];
    }

    if (permissions === '*') {
        return getAllRoleNames();
    }

    return permissions;
}

export function Permissions(info: {
    create?: RoleName[] | '*',
    read?: RoleName[] | '*',
    update?: RoleName[] | '*',
    delete?: RoleName[] | '*'
}): Function {

    // '*' -> users with any roles can do the operation
    // [], undefined, null -> only admins can do the operation

    info.create = getValueOrDefault(info.create);
    info.read = getValueOrDefault(info.read);
    info.update = getValueOrDefault(info.update);
    info.delete = getValueOrDefault(info.delete);

    return function (constructor: Function) {
        Reflect.defineMetadata(CLASS_PERMISSION_METADATA_KEY, info, constructor);
        return constructor;
    };
}