// src/components/RoleManagement.jsx
import React, { useState } from 'react';
import Table from './common/Table';
import Modal from './common/Modal';
import { mockRoles, mockPermissions } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { checkPermission } from '../utils/rbacUtils';

const RoleManagement = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState(mockRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);//



  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure user has permission to manage roles
  if (!checkPermission(user, mockPermissions.MANAGE_ROLES)) {
    return <div>You do not have permission to manage roles.</div>;
  }

  const permissionsList = Object.values(mockPermissions);

  // const roleColumns = [
  //   { 
  //     header: 'Role Name', 
  //     accessor: 'name' 
  //   },
  //   { 
  //     header: 'Permissions', 
  //     accessor: 'permissions',
  //     render: (permissions) => permissions.join(', ')
  //   }
  // ];
  const roleColumns = isMobileView //
    ? [
        { 
          header: 'Role', 
          accessor: 'name',
          render: (name, role) => (
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-xs text-gray-500">
                Permissions: {role.permissions.join(', ')}
              </p>
            </div>
          )
        }
      ]
    : [
        { 
          header: 'Role Name', 
          accessor: 'name' 
        },
        { 
          header: 'Permissions', 
          accessor: 'permissions',
          render: (permissions) => permissions.join(', ')
        }
      ];//


  const handleEdit = (role) => {
    setCurrentRole({...role});
    setIsModalOpen(true);
  };

  const handleDelete = (role) => {
    setRoles(roles.filter(r => r.id !== role.id));
  };

  const handleSaveRole = () => {
    if (currentRole) {
      if (currentRole.id) {
        // Editing existing role
        setRoles(roles.map(role => 
          role.id === currentRole.id ? currentRole : role
        ));
      } else {
        // Adding new role
        const newRole = {
          ...currentRole,
          id: roles.length + 1
        };
        setRoles([...roles, newRole]);
      }
      setIsModalOpen(false);
      setCurrentRole(null);
    }
  };

  const handlePermissionToggle = (permission) => {
    if (!currentRole) return;

    const permissions = currentRole.permissions || [];
    const updatedPermissions = permissions.includes(permission)
      ? permissions.filter(p => p !== permission)
      : [...permissions, permission];

    setCurrentRole({
      ...currentRole,
      permissions: updatedPermissions
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          setCurrentRole({ name: '', permissions: [] });
          setIsModalOpen(true);
        }}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New Role
      </button>

      <Table
        columns={roleColumns}
        data={roles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentRole(null);
          }}
          title={currentRole?.id ? 'Edit Role' : 'Add New Role'}
          onSubmit={handleSaveRole}
        >
          <div>
            <label className="block mb-2">
              Role Name
              <input
                type="text"
                value={currentRole?.name || ''}
                onChange={(e) => setCurrentRole({
                  ...currentRole,
                  name: e.target.value
                })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter role name"
                required
              />
            </label>

            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Permissions</h3>
              {permissionsList.map(permission => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission}
                    checked={currentRole?.permissions?.includes(permission) || false}
                    onChange={() => handlePermissionToggle(permission)}
                    className="mr-2"
                  />
                  <label htmlFor={permission}>{permission}</label>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoleManagement;