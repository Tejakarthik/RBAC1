// src/components/UserTaskView.jsx
import React from 'react';
import Table from './common/Table';

const UserTaskView = () => {
  // Mock tasks for the user
  const userTasks = [
    {
      id: 1,
      title: 'Project Kickoff',
      description: 'Initial meeting for new project',
      status: 'Pending',
      priority: 'High',
      dueDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Design Review',
      description: 'Review design mockups',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2024-01-20'
    }
  ];

  const taskColumns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Description', accessor: 'description' },
    { header: 'Status', accessor: 'status' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Due Date', accessor: 'dueDate' }
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
      <Table
        columns={taskColumns}
        data={userTasks}
        actions={false}
      />
    </div>
  );
};

export default UserTaskView;