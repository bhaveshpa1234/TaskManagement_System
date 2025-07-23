import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Select, message } from 'antd';
import API from '../utils/api'; 

const AddTask = ({
  boardId,
  onTaskAdd,
  onTaskEdit,
  initialTask = null,
  trigger,
  clearTrigger,
}) => {
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To do',
  });

  useEffect(() => {
    if (initialTask) {
      setTask({
        title: initialTask.title,
        description: initialTask.description,
        status: initialTask.status,
      });
      setVisible(true);
    }
  }, [initialTask]);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
    }
  }, [trigger]);

  const handleSubmit = async () => {
    if (!task.title.trim()) {
      return message.warning('Task title cannot be empty.');
    }

    const payload = {
      name: task.title,
      description: task.description,
      status: task.status,
      board: boardId,
    };

    try {
      if (initialTask) {
        const res = await API.put(`/task/${initialTask.id}/`, payload);
        onTaskEdit(res.data);
        message.success('Task updated');
      } else {
        const res = await API.post('/task/', payload);
        onTaskAdd(res.data);
        message.success('Task added');
      }

      handleClose();
    } catch (err) {
      console.error('Task submit error:', err.response?.data || err.message);
      message.error('Something went wrong.');
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTask({ title: '', description: '', status: 'To do' });
    if (clearTrigger) clearTrigger();
  };

  return (
    <>
      {!initialTask && (
        <Button onClick={() => setVisible(true)}>+ Add Task</Button>
      )}
      <Modal
        open={visible}
        onCancel={handleClose}
        onOk={handleSubmit}
        title={initialTask ? 'Edit Task' : 'Add Task'}
      >
        <Input
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input.TextArea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          rows={4}
          style={{ marginBottom: 10 }}
        />
        <Select
          value={task.status}
          onChange={(val) => setTask({ ...task, status: val })}
          style={{ width: '100%' }}
        >
          <Select.Option value="To do">To do</Select.Option>
          <Select.Option value="In progress">In progress</Select.Option>
          <Select.Option value="Done">Done</Select.Option>
        </Select>
      </Modal>
    </>
  );
};

export default AddTask;
