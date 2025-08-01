import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import AddTaskModal from './Tasks';
import { MoreVertical } from 'react-feather';
import { Dropdown, Menu, message } from 'antd';
import { Move } from 'react-feather';

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable
} from '@dnd-kit/core';

const Group = () => {
  const { boardId } = useParams();
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [editGroupId, setEditGroupId] = useState(null);
  const [editGroupName, setEditGroupName] = useState('');
  const [editingTask, setEditingTask] = useState(null); 

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchBoard();
    fetchGroups();
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      const res = await API.get(`/board/${boardId}/`);
      setBoardName(res.data.name);
    } catch (err) {
      console.error('Failed to fetch board name:', err);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await API.get(`/board/${boardId}/groups/`);
      setGroups(res.data);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    }
  };

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) return;
    try {
      await API.post(`/board/${boardId}/groups/`, { name: newGroupName });
     
      setNewGroupName('');
      setShowInput(false);
      fetchGroups();
    } catch (err) {
      console.error('Failed to add group', err);
    }
  };

  const handleOpenTaskModal = (groupId) => {
    setSelectedGroupId(groupId);
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditGroup = async (groupId) => {
    try {
      await API.patch(`/groups/${groupId}/`, { name: editGroupName });
      setEditGroupId(null);
      setEditGroupName('');
      fetchGroups();
      message.success('Group name updated');
    } catch (err) {
      console.error('Failed to edit group', err);
      message.error('Failed to edit group');
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await API.delete(`/groups/${groupId}/`);
      fetchGroups();
      message.success('Group deleted');
    } catch (err) {
      console.error('Failed to delete group', err);
      message.error('Failed to delete group');
    }
  };

  const handleEditTask = (task, groupId) => {
    setSelectedGroupId(groupId);
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/task/${taskId}/`);
      fetchGroups();
      message.success('Task deleted');
    } catch (err) {
      console.error('Failed to delete task', err);
      message.error('Failed to delete task');
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const taskId = active.id;
    const newGroupId = over.data.current?.groupId;

    try {
      await API.patch(`/task/${taskId}/`, { group: newGroupId });
      fetchGroups();
      message.success('Task moved');
    } catch (err) {
      console.error('Error updating task group', err);
      message.error('Move failed');
    }
  };

  const DraggableTask = ({ task, groupId }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
    data: { groupId },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes} 
      className="bg-blue-300 text-black p-3 rounded-xl shadow hover:shadow-lg transition-shadow relative"
    >
      <div className="flex justify-between items-start">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="font-semibold max-w-[100px] truncate">{task.name}</div>
            
            <div
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-gray-500 text-lg"
              title="Drag"
            >
              <Move size={16} />
            </div>
          </div>

          <div className="text-sm text-gray-700 mt-1 max-w-[150px] break-words whitespace-normal">
            Details: {task.description}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Due Date: {task.due_date ? new Date(task.due_date).toLocaleString() : 'No deadline'}
          </div>
          <div className="text-xs text-gray-600 mt-2 flex items-center gap-1 whitespace-nowrap">
            Priority:
            <span className="text-yellow-500 ml-1">
              {'★'.repeat(task.priority)}{'☆'.repeat(3 - task.priority)}
            </span>
            | Status:<span className="capitalize">{task.status}</span>
          </div>
        </div>

        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: <span onClick={() => handleEditTask(task, groupId)}>Edit</span>,
              },
              {
                key: 'delete',
                danger: true,
                label: <span onClick={() => handleDeleteTask(task.id)}>Delete</span>,
              },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
          arrow
        >
          <span className="cursor-pointer">
            <MoreVertical />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};


  const DroppableGroup = ({ groupId, children }) => {
    const { setNodeRef } = useDroppable({
      id: groupId,
      data: { groupId },
    });
    return <div ref={setNodeRef}>{children}</div>;
  };

  return (
    <div className="p-4 min-h-screen bg-blue-100 text-black flex flex-col">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">{boardName}</h1>
        <p className="text-lg text-gray-600">Manage and monitor tasks as a team</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 w-max pb-4">

          <div className="bg-blue-200 w-64 p-4 rounded-xl flex-shrink-0 shadow-md relative">
              {!showInput ? (
                <button onClick={() => setShowInput(true)} className="hover:underline">
                  + Add group
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Group name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="bg-white text-black px-2 py-1 rounded focus:outline-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowInput(false)}
                      className="text-sm text-gray-700 hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddGroup}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}
            </div>

            {groups.map((group) => (
              <DroppableGroup key={group.id} groupId={group.id}>
                <div className="bg-blue-200 w-64 p-4 rounded-xl flex-shrink-0 shadow-md relative">
                  <div className="flex justify-between items-center mb-2">
                    {editGroupId === group.id ? (
                      <input
                        value={editGroupName}
                        onChange={(e) => setEditGroupName(e.target.value)}
                        className="bg-blue-300 text-black px-2 py-1 rounded w-full"
                        onBlur={() => setEditGroupId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditGroup(group.id);
                        }}
                        autoFocus
                      />
                    ) : (
                      <div className="font-bold truncate">{group.name}</div>
                    )}

                    <Dropdown
                    menu={{
                     items: [
                     {
                     key: 'edit',
                      label: (
                  <span
                   onClick={() => {
                     setEditGroupId(group.id);
                    setEditGroupName(group.name);
                }}
                  >
                Edit
              </span>
              ),
                   },
             {
            key: 'delete',
              danger: true,
            label: (
              <span onClick={() => handleDeleteGroup(group.id)}>
                Delete
              </span>
        ),
      },
    ],
  }}
  trigger={['click']}
  placement="bottomRight"
           arrow
      >
          <MoreVertical className="cursor-pointer" />
        </Dropdown>

                  </div>

                  {group.tasks && group.tasks.length > 0 ? (
                    <div className="mt-4 space-y-3 ">
                      {group.tasks.map((task) => (
                        <DraggableTask key={task.id} task={task} groupId={group.id} />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 mb-3 text-sm text-gray-500 italic"></div> //No tasks
                  )}

                  <button
                    onClick={() => handleOpenTaskModal(group.id)}
                    className="mt-8 p-4 w-full text-white py-1 px-2 rounded hover:bg-blue-300 transition "
                  >
                    + Add item
                  </button>
                </div>
              </DroppableGroup>
            ))}

            
          </div>
        </div>
      </DndContext>

      <AddTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        groupId={selectedGroupId}
        boardId={boardId}
        refreshGroups={fetchGroups}
        task={editingTask}
      />
    </div>
  );
};

export default Group;
