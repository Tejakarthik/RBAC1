// src/utils/rbacUtils.js
import { mockRoles, mockPermissions } from '../data/mockData';

export const findUserRole = (user) => {
  return mockRoles.find(role => role.id === user.roleId);
};

export const checkPermission = (user, requiredPermission) => {
  const userRole = findUserRole(user);
  return userRole && userRole.permissions.includes(requiredPermission);
};

export const getRoleById = (roleId) => {
  return mockRoles.find(role => role.id === roleId);
};

export const getAllRoles = () => {
  return mockRoles;
};