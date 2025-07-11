import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { Trash2 } from 'react-feather'; 
import API from '../utils/api';

const AddBoard = ({ onBoardAdd, onBoardDelete, boards }) => {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await API.post('boards/', { name: boardName });
      onBoardAdd(res.data);
      setBoardName('');
      setOpen(false);
    } catch (err) {
      console.error('Add board error:', err);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Add Board</Button>
      <Modal open={open} onCancel={() => setOpen(false)} onOk={handleSubmit} title="New Board">
        <Input value={boardName} onChange={e => setBoardName(e.target.value)} placeholder="Board Name" />
      </Modal>
      <div className="mt-4 space-y-2">
        {boards.map(board => (
          <div
            key={board.id}
            className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded"
          >
            <span>{board.name}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => onBoardDelete(board.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddBoard;
