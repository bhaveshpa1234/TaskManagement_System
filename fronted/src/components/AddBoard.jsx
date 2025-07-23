import React, { useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { Edit2, Trash2 } from 'react-feather';
import API from '../utils/api'; 

const AddBoard = ({ onBoardAdd, onBoardDelete, onBoardEdit, boards }) => {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [editingBoard, setEditingBoard] = useState(null);

  const defaultColumns = [
    { name: 'To do', color: 'bg-blue-500', tasks: [] },
    { name: 'In progress', color: 'bg-yellow-500', tasks: [] },
    { name: 'Done', color: 'bg-green-500', tasks: [] },
  ];

  const handleSubmit = async () => {
    if (!boardName.trim()) {
      return message.warning('Board name cannot be empty.');
    }

    try {
      if (editingBoard) {
        const res = await API.put(`/board/${editingBoard.id}/`, {
          name: boardName,
        });
        onBoardEdit({ ...res.data, columns: editingBoard.columns || defaultColumns });
        message.success('Board updated successfully');
      } else {
        const res = await API.post('/board/', {
          name: boardName,
        });
        const newBoard = { ...res.data, columns: defaultColumns }; 
        onBoardAdd(newBoard);
        message.success('Board added successfully');
      }

      setBoardName('');
      setEditingBoard(null);
      setOpen(false);
    } catch (err) {
      console.error('Board operation error:', err);
      console.error('Response:', err?.response?.data);
      message.error('Something went wrong.');
    }
  };

  const handleEdit = (board) => {
    setBoardName(board.name);
    setEditingBoard(board);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setBoardName('');
    setEditingBoard(null);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Add Board</Button>

      <Modal
        open={open}
        onCancel={handleCancel}
        onOk={handleSubmit}
        title={editingBoard ? 'Edit Board' : 'New Board'}
      >
        <Input
          value={boardName}
          onChange={e => setBoardName(e.target.value)}
          placeholder="Board Name"
        />
      </Modal>

      <div className="mt-4 space-y-2">
        {boards.map(board => (
          <div
            key={board.id}
            className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded"
          >
            <span>{board.name}</span>
            <div className="flex items-center gap-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit(board)}
              >
                <Edit2 size={16} />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onBoardDelete(board.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddBoard;
