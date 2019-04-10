export enum RoleName {
    Admin = 'admin',
    Manager = 'manager',
    Viewer = 'viewer'
}

export function getAllRoleNames (): RoleName[] {
    const roleNames = [];

    for (const key in RoleName) {
        if (isNaN(Number(key))) {
            roleNames.push(RoleName[key]);
        }
    }

    return roleNames;
}
