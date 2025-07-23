import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import AddBoardModal from './AddBoardModal';
import AddTaskModal from './AddTaskModal';
import API from '../utils/api';
import Header from './Header';

const defaultColumns = [
  { name: 'To do', color: 'bg-blue-500' },
  { name: 'In progress', color: 'bg-yellow-500' },
  { name: 'Done', color: 'bg-green-500' },
];

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchBoards = async () => {
    try {
      const res = await API.get('/board/');
      const boardsWithColumns = res.data.map(board => ({
        ...board,
        columns: defaultColumns.map(col => ({ ...col, tasks: [] })),
      }));
      setBoards(boardsWithColumns);
    } catch (err) {
      console.error('Failed to fetch boards:', err);
    }
  };


  const fetchTasks = useCallback(async (boardId) => {
    try {
      const res = await API.get('/task/');
      const boardTasks = res.data.filter(task => task.board === boardId);

      setBoards(prevBoards =>
        prevBoards.map(board => {
          if (board.id !== boardId) return board;
          const updatedColumns = defaultColumns.map(col => ({
            ...col,
            tasks: boardTasks.filter(
              task => task.status?.toLowerCase().trim() === col.name.toLowerCase()
            ),
          }));
          return { ...board, columns: updatedColumns };
        })
      );
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  }, []);

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
  if (selectedBoardIndex !== null) {
    const boardId = boards?.[selectedBoardIndex]?.id;
    if (boardId) {
      fetchTasks(boardId);
    }
  }
}, [selectedBoardIndex, fetchTasks]);


  const handleAddBoard = async (boardData) => {
    try {
      const res = await API.post('/board/', { name: boardData });
      const newBoard = {
        ...res.data,
        columns: defaultColumns.map(col => ({ ...col, tasks: [] })),
      };
      setBoards(prev => [...prev, newBoard]);
      setSelectedBoardIndex(boards.length);
      await fetchTasks(newBoard.id);
    } catch (err) {
      console.error('Error creating board:', err);
    } finally {
      setShowAddBoardModal(false);
    }
  };

  const handleAddTask = async (taskData) => {
    const board = boards[selectedBoardIndex];
    if (!board) return;

    try {
      if (editingTask) {
        await API.put(`/task/${editingTask.id}/`, {
          ...taskData,
          board: board.id,
        });
      } else {
        await API.post('/task/', {
          ...taskData,
          board: board.id,
          status: taskData.status || 'To do',
        });
      }
      await fetchTasks(board.id);
    } catch (err) {
      console.error('Error saving task:', err);
    } finally {
      setEditingTask(null);
      setShowAddTaskModal(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const board = boards[selectedBoardIndex];
    if (!board) return;

    try {
      await API.delete(`/task/${taskId}/`);
      await fetchTasks(board.id);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const selectedBoard = boards[selectedBoardIndex];

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          boards={boards}
          selectedBoardIndex={selectedBoardIndex}
          setSelectedBoardIndex={setSelectedBoardIndex}
          openAddBoardModal={() => setShowAddBoardModal(true)}
        />

        <div className="flex-1 p-6 overflow-y-auto">
          {selectedBoard ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{selectedBoard.name}</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddTaskModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    ➕ Add Task
                  </button>
                </div>
                <div className="relative group">
                  <button className="text-2xl px-3 py-1 rounded hover:bg-gray-200">⋯</button>
                  <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-md hidden group-hover:block z-50">
                    <button
                      onClick={async () => {
                        const newName = prompt('Enter new board name:', selectedBoard.name);
                        if (newName?.trim()) {
                          try {
                            await API.patch(`/board/${selectedBoard.id}/`, {
                              name: newName.trim(),
                            });
                            setBoards(prevBoards =>
                              prevBoards.map(board =>
                                board.id === selectedBoard.id
                                  ? { ...board, name: newName.trim() }
                                  : board
                              )
                            );
                          } catch (error) {
                            console.error('Error updating board:', error);
                          }
                        }
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      ✏️ Edit Board
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this board?')) {
                          try {
                            await API.delete(`/board/${selectedBoard.id}/`);
                            const updatedBoards = boards.filter(
                              (_, index) => index !== selectedBoardIndex
                            );
                            setBoards(updatedBoards);
                            setSelectedBoardIndex(null);
                          } catch (error) {
                            console.error('Error deleting board:', error);
                          }
                        }
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                    >
                      🗑️ Delete Board
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                {selectedBoard.columns.map((col, idx) => (
                  <div key={idx} className="w-80">
                    <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                      <span className={`w-3 h-3 rounded-full ${col.color}`}></span>
                      {col.name} ({col.tasks.length})
                    </h3>
                    <div className="flex flex-col gap-4 min-h-[200px]">
                      {col.tasks.map((task, tIdx) => (
                        <div
                          key={task.id || tIdx}
                          className="bg-white p-4 rounded shadow-sm"
                        >
                          <p className="font-semibold">{task.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => {
                                setEditingTask(task);
                                setShowAddTaskModal(true);
                              }}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-sm text-red-500 hover:underline"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-400 text-xl">
              Select or create a board to get started.
            </div>
          )}
        </div>

        {showAddBoardModal && (
          <AddBoardModal
            onClose={() => setShowAddBoardModal(false)}
            onAddBoard={handleAddBoard}
          />
        )}

        {showAddTaskModal && selectedBoard && (
          <AddTaskModal
            onClose={() => {
              setShowAddTaskModal(false);
              setEditingTask(null);
            }}
            onTaskCreated={handleAddTask}
            boardId={selectedBoard.id}
            initialData={editingTask}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
