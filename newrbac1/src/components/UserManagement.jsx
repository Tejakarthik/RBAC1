// src/components/UserManagement.jsx
import React, { useState } from 'react';
import Table from './common/Table';
import Modal from './common/Modal';
import { mockUsers, mockRoles } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { checkPermission } from '../utils/rbacUtils';
import { mockPermissions } from '../data/mockData';

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Ensure user has permission to manage users
  if (!checkPermission(user, mockPermissions.MANAGE_USERS)) {
    return <div>You do not have permission to manage users.</div>;
  }

  const userColumns = [
    { 
      header: 'Username', 
      accessor: 'username' 
    },
    { 
      header: 'Email', 
      accessor: 'email' 
    },
    { 
      header: 'Role', 
      accessor: 'roleId',
      render: (roleId) => {
        const role = mockRoles.find(r => r.id === roleId);
        return role ? role.name : 'No Role'
      }
    }
  ];

  const handleEdit = (userData) => {
    setCurrentUser({...userData});
    setIsModalOpen(true);
  };

  const handleDelete = (userData) => {
    setUsers(users.filter(u => u.id !== userData.id));
  };

  const handleSaveUser = () => {
    if (currentUser) {
      if (currentUser.id) {
        // Editing existing user
        setUsers(users.map(u => 
          u.id === currentUser.id ? currentUser : u
        ));
      } else {
        // Adding new user
        const newUser = {
          ...currentUser,
          id: users.length + 1
        };
        setUsers([...users, newUser]);
      }
      setIsModalOpen(false);
      setCurrentUser(null);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setCurrentUser({ 
            username: '', 
            email: '', 
            roleId: mockRoles[2].id // Default to User role
          });
          setIsModalOpen(true);
        }}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New User
      </button>

      <Table
        columns={userColumns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentUser(null);
          }}
          title={currentUser?.id ? 'Edit User' : 'Add New User'}
          onSubmit={handleSaveUser}
        >
          <div>
            <label className="block mb-2">
              Username
              <input
                type="text"
                value={currentUser?.username || ''}
                onChange={(e) => setCurrentUser({
                  ...currentUser,
                  username: e.target.value
                })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter username"
                required
              />
            </label>

            <label className="block mb-2 mt-4">
              Email
              <input
                type="email"
                value={currentUser?.email || ''}
                onChange={(e) => setCurrentUser({
                  ...currentUser,
                  email: e.target.value
                })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter email"
                required
              />
            </label>

            <label className="block mb-2 mt-4">
              Role
              <select
                value={currentUser?.roleId || ''}
                onChange={(e) => setCurrentUser({
                  ...currentUser,
                  roleId: parseInt(e.target.value)
                })}
                className="w-full p-2 border rounded mt-1"
              >
                {mockRoles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;