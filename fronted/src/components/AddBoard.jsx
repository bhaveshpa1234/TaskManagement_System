import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import API from '../utils/api';

const AddBoard = ({ onBoardAdd }) => {
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
    </>
  );
};

export default AddBoard;
