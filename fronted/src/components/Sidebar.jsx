import React from 'react';

const Sidebar = ({ boards, selectedBoardIndex, setSelectedBoardIndex, openAddBoardModal }) => {
  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Task Pilot</h1>
      <p className="text-xs uppercase mb-2">All Boards ({boards.length})</p>
      <div className="flex flex-col gap-2">
        {boards.map((board, index) => (
          <button
            key={index}
            onClick={() => setSelectedBoardIndex(index)}
            className={`flex items-center p-2 rounded-md ${
              index === selectedBoardIndex ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'
            }`}
          >
            📋 {board.name}
          </button>
        ))}
      </div>

      <button
        onClick={openAddBoardModal}
        className="mt-4 text-indigo-600 hover:underline text-sm"
      >
        + Create New Board
      </button>
    </div>
  );
};

export default Sidebar;
