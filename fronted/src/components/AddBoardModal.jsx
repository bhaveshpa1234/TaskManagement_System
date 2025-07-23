import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const AddBoardModal = ({ onClose, onAddBoard, initialData = null }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(initialData?.name || '');
  }, [initialData]);

  const defaultColumns = [
    { name: 'To do', color: 'bg-blue-500', tasks: [] },
    { name: 'In progress', color: 'bg-yellow-500', tasks: [] },
    { name: 'Done', color: 'bg-green-500', tasks: [] },
  ];

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      const res = initialData?.id
        ? await API.put(`/board/${initialData.id}/`, { name })
        : await API.post('/board/', { name });

      const boardWithColumns = {
        ...res.data,
        columns: defaultColumns,
      };

      onAddBoard(boardWithColumns);
      setName('');
      onClose();
    } catch (err) {
      console.error('Board submit error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 bg-black">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[90%] max-w-sm space-y-6 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {initialData ? '✏️ Edit Board' : '🧩 Create New Board'}
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Board Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Project Alpha"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {initialData ? 'Update Board' : 'Add Board'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBoardModal;
