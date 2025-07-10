import React, { useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import API from '../utils/api';

const AddTask = ({ boardId, onTaskAdd }) => {
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To do',
  });

  const handleSubmit = async () => {
    try {
      const res = await API.post('cards/', { ...task, board: boardId });
      onTaskAdd(res.data);
      setVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>+ Add Task</Button>
      <Modal open={visible} onCancel={() => setVisible(false)} onOk={handleSubmit} title="Add Task">
        <Input
          placeholder="Title"
          value={task.title}
          onChange={e => setTask({ ...task, title: e.target.value })}
        />
        <Input.TextArea
          placeholder="Description"
          value={task.description}
          onChange={e => setTask({ ...task, description: e.target.value })}
          rows={4}
        />
        <Select value={task.status} onChange={val => setTask({ ...task, status: val })} style={{ width: '100%', marginTop: 10 }}>
          <Select.Option value="To do">To do</Select.Option>
          <Select.Option value="In progress">In progress</Select.Option>
          <Select.Option value="Done">Done</Select.Option>
        </Select>
      </Modal>
    </>
  );
};

export default AddTask;
