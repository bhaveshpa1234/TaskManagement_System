import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Form, message } from "antd";
import API from "../utils/api";

const { TextArea } = Input;
const { Option } = Select;

const AddTaskModal = ({
  isOpen,
  onClose,
  groupId,
  boardId,
  refreshGroups,
  task,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);
  const isEdit = Boolean(task);

  useEffect(() => {
    if (isOpen && boardId) {
      API.get(`/board/${boardId}/groups/`)
        .then((res) => {
          setGroupOptions(res.data);
        })
        .catch((err) => {
          console.error("Failed to load groups:", err);
        });
    }
  }, [isOpen, boardId]);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && task) {
        form.setFieldsValue({
          name: task.name,
          description: task.description,
          status: task.status,
          priority:
            {
              High: 3,
              Medium: 2,
              Low: 1,
            }[task.priority] || 1,
          due_date: task.due_date ? task.due_date.slice(0, 16) : null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, isEdit, task, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const [selectedGroupId, selectedGroupName] = values.status.split("::");

      const payload = {
        name: values.name,
        description: values.description,
        status: selectedGroupName,
        priority: values.priority,
        due_date: values.due_date,
        group: selectedGroupId,
        board: boardId,
      };

      if (isEdit) {
        await API.patch(`/task/${task.id}/`, payload);
        message.success("Task updated successfully!");
      } else {
        await API.post("/task/", payload);
        message.success("Task added successfully!");
      }

      form.resetFields();
      onClose();
      refreshGroups();
    } catch (err) {
      console.error(
        "Failed to update task:",
        err.response?.data || err.message
      );
      message.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Task" : "Add Task"}
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      destroyOnClose
      width={320}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Task Name"
          name="name"
          rules={[{ required: true, message: "Please enter task name" }]}
        >
          <Input placeholder="Enter task name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea placeholder="Enter task description" rows={3} />
        </Form.Item>

        <Form.Item name="due_date" label="Due Date">
          <Input type="datetime-local" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select status">
            {groupOptions.map((g) => (
              <Option key={`group-${g.id}`} value={`${g.id}::${g.name}`}>
                {g.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select a priority" }]}
        >
          <Select placeholder="Select priority">
            <Option value={1}>★☆☆</Option>
            <Option value={2}>★★☆</Option>
            <Option value={3}>★★★</Option>
          </Select>
        </Form.Item>

        <Form.Item className="text-right mb-0">
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEdit ? "Update Task" : "Add Task"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
