// src/components/TaskManagement.jsx
import React, { useState } from 'react';
import Table from './common/Table';
import Modal from './common/Modal';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Project Kickoff',
      description: 'Initial meeting for new project',
      assignedTo: 'John Doe',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Design Review',
      description: 'Review design mockups',
      assignedTo: 'Jane Smith',
      status: 'In Progress',
      priority: 'Medium'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  

  const taskColumns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Description', accessor: 'description' },
    { header: 'Assigned To', accessor: 'assignedTo' },
    { header: 'Status', accessor: 'status' },
    { header: 'Priority', accessor: 'priority' }
  ];

  const handleEdit = (task) => {
    setCurrentTask({...task});
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    if (currentTask) {
      if (currentTask.id) {
        // Editing existing task
        setTasks(tasks.map(t => 
          t.id === currentTask.id ? currentTask : t
        ));
      } else {
        // Adding new task
        const newTask = {
          ...currentTask,
          id: tasks.length + 1
        };
        setTasks([...tasks, newTask]);
      }
      setIsModalOpen(false);
      setCurrentTask(null);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setCurrentTask({ 
            title: '', 
            description: '', 
            assignedTo: '',
            status: 'Pending',
            priority: 'Medium'
          });
          setIsModalOpen(true);
        }}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create New Task
      </button>

      <Table
        columns={taskColumns}
        data={tasks}
        onEdit={handleEdit}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentTask(null);
          }}
          title={currentTask?.id ? 'Edit Task' : 'Create New Task'}
          onSubmit={handleSaveTask}
        >
          <div>
            <label className="block mb-2">
              Title
              <input
                type="text"
                value={currentTask?.title || ''}
                onChange={(e) => setCurrentTask({
                  ...currentTask,
                  title: e.target.value
                })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter task title"
                required
              />
            </label>

            <label className="block mb-2 mt-4">
              Description
              <textarea
                value={currentTask?.description || ''}
                onChange={(e) => setCurrentTask({
                  ...currentTask,
                  description: e.target.value
                })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter task description"
                rows="3"
              />
            </label>

            <label className="block mb-2 mt-4">
              Assigned To
              <input
                type="text"
                value={currentTask?.assignedTo || ''}
                onChange={(e) => setCurrentTask({
                  ...currentTask,
                  assignedTo: e.target.value
                })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Assign to team member"
              />
            </label>

            <div className="flex space-x-4 mt-4">
              <label className="block mb-2 w-1/2">
                Status
                <select
                  value={currentTask?.status || 'Pending'}
                  onChange={(e) => setCurrentTask({
                    ...currentTask,
                    status: e.target.value
                  })}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>

              <label className="block mb-2 w-1/2">
                Priority
                <select
                  value={currentTask?.priority || 'Medium'}
                  onChange={(e) => setCurrentTask({
                    ...currentTask,
                    priority: e.target.value
                  })}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskManagement;