import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { checkPermission } from '../utils/rbacUtils';
import { mockPermissions } from '../data/mockData';
import RoleManagement from './RoleManagement';
import UserManagement from './UserManagement';
import TaskManagement from './TaskManagement';
import UserTaskView from './UserTaskView';
import Modal from './common/Modal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPermissionModal, setShowPermissionModal] = useState(false);


  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);


  const handleLogout = () => {
    

    logout();
   


  };

  if (!user) {
    return null;
  }

  const isAdmin = checkPermission(user, mockPermissions.MANAGE_ROLES);
  const isManager = checkPermission(user, mockPermissions.ASSIGN_ROLES);
  const isUser = !isAdmin && !isManager;

  const handleUnauthorizedAction = () => {
    setShowPermissionModal(true);
  };

  return (
    <div className="dashboard p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user.username} ({user.role.name})
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-4 border-b">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Overview
          </button>
          {(isAdmin || isManager) && (
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-2 px-4 ${
                activeTab === 'roles'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Roles
            </button>
          )}
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-2 px-4 ${
              activeTab === 'tasks'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Tasks
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-bold">Total Users</h3>
              <p className="text-2xl">42</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-bold">Active Roles</h3>
              <p className="text-2xl">3</p>
            </div>
            <div className="bg-purple-100 p-4 rounded">
              <h3 className="font-bold">Permissions</h3>
              <p className="text-2xl">5</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (isAdmin || isManager) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Role Management</h2>
          {isAdmin ? <RoleManagement /> : <UserManagement />}
        </div>
      )}

      {activeTab === 'roles' && isUser && handleUnauthorizedAction()}

      {activeTab === 'tasks' && (
        isManager ? (
          <TaskManagement />
        ) : (
          <UserTaskView onUnauthorized={handleUnauthorizedAction} />
        )
      )}

      {/* Modal for "No Permission" */}
      <Modal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        title="Access Denied"
        onSubmit={() => setShowPermissionModal(false)} 
      >
        <p>You do not have permission to perform this action.</p>
      </Modal>
    </div>
  );
};

export default Dashboard;

