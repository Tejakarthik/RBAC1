// src/data/mockData.js
export const mockPermissions = {
    VIEW_DASHBOARD: 'view_dashboard',
    MANAGE_ROLES: 'manage_roles',
    MANAGE_USERS: 'manage_users',
    ASSIGN_ROLES: 'assign_roles',
    VIEW_TASKS: 'view_tasks'
  };
  
  export const mockRoles = [
    {
      id: 1,
      name: 'Admin',
      permissions: [
        mockPermissions.VIEW_DASHBOARD,
        mockPermissions.MANAGE_ROLES,
        mockPermissions.MANAGE_USERS,
        mockPermissions.ASSIGN_ROLES
      ]
    },
    {
      id: 2,
      name: 'Manager',
      permissions: [
        mockPermissions.VIEW_DASHBOARD,
        mockPermissions.ASSIGN_ROLES
      ]
    },
    {
      id: 3,
      name: 'User',
      permissions: [
        mockPermissions.VIEW_DASHBOARD
      ]
    }
  ];
  
  export const mockUsers = [
    {
      id: 1,
      username: 'admin_user',
      password: 'admin123',
      email: 'admin@example.com',
      roleId: 1 // Admin role
    },
    {
      id: 2,
      username: 'manager_user',
      password: 'manager123',
      email: 'manager@example.com',
      roleId: 2 // Manager role
    },
    {
      id: 3,
      username: 'regular_user',
      password: 'user123',
      email: 'user@example.com',
      roleId: 3 // User role
    }
  ];