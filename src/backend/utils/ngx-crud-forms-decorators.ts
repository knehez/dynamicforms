import 'reflect-metadata';

export const PROPERTY_METADATA_KEY = Symbol.for('ngx-crud-forms:dynamicFormMetadata');

export function FormField(updates: any) {
  return (target: any, propertyKey: string | symbol) => {
    const allMetadata = Reflect.getMetadata(PROPERTY_METADATA_KEY, target) || {};
    allMetadata[propertyKey] = allMetadata[propertyKey] || {};
    for (const key of Reflect.ownKeys(updates)) {
      allMetadata[propertyKey][key] = (updates as any)[key];
    }
    Reflect.defineMetadata(PROPERTY_METADATA_KEY, allMetadata, target);
  };
}

export const CLASS_PERMISSION_METADATA_KEY = Symbol.for('ngx-crud-forms:dynamicFormMetadata:permissions');
export const TOP_LEVEL_ACCESS_KEY = 'admin';
export const ANY_ROLE_ACCESS_KEY = '*';

function getValueOrDefault(permissions: string | string[]) {
  if (!permissions) {
    return [TOP_LEVEL_ACCESS_KEY];
  }
  if (Array.isArray(permissions) && permissions.length === 0) {
    return [TOP_LEVEL_ACCESS_KEY];
  }
  if (permissions === '*') {
    return [ANY_ROLE_ACCESS_KEY];
  }
  return permissions;
}

export function Permissions(options: {
  create?: string | string[];
  read?: string | string[];
  update?: string | string[];
  delete?: string | string[];
}): ClassDecorator {
  options.create = getValueOrDefault(options.create);
  options.read = getValueOrDefault(options.read);
  options.update = getValueOrDefault(options.update);
  options.delete = getValueOrDefault(options.delete);

  return (constructor: Function) => {
    Reflect.defineMetadata(CLASS_PERMISSION_METADATA_KEY, options, constructor);
  };
}

