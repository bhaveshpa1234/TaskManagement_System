import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { MoreVertical, Star, LogOut, Sun, Moon } from "react-feather";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";

const Boards = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("default");
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [starredBoards, setStarredBoards] = useState(() => {
    const stored = localStorage.getItem("starredBoards");
    return stored ? JSON.parse(stored) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const boardsPerPage = 3;

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleStar = (boardId) => {
    const updated = starredBoards.includes(boardId)
      ? starredBoards.filter((id) => id !== boardId)
      : [...starredBoards, boardId];

    setStarredBoards(updated);
    localStorage.setItem("starredBoards", JSON.stringify(updated));
  };

  useEffect(() => {
    fetchBoards();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("account/profile/");
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchBoards = async () => {
    try {
      const response = await API.get("/board/");
      setBoards(response.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const handleAddBoard = async () => {
    if (!newBoardName.trim()) return;
    try {
      await API.post("/board/", { name: newBoardName });
      setNewBoardName("");
      fetchBoards();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  const handleEditBoard = async (board) => {
    const newName = prompt("Enter new board name:", board.name);
    if (!newName || newName.trim() === "") return;
    try {
      await API.put(`/board/${board.id}/`, { name: newName });
      fetchBoards();
    } catch (error) {
      console.error("Error editing board:", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (!window.confirm("Are you sure you want to delete this board?")) return;
    try {
      await API.delete(`/board/${boardId}/`);
      fetchBoards();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    toast.success("Logout successful!");
    window.location.href = "./login";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const filteredBoards = showOnlyStarred
    ? boards.filter((board) => starredBoards.includes(board.id))
    : boards;

  const sortedBoards = [...filteredBoards].sort((a, b) => {
    if (sortOption === "starred") {
      const aStarred = starredBoards.includes(a.id);
      const bStarred = starredBoards.includes(b.id);
      if (aStarred && !bStarred) return -1;
      if (!aStarred && bStarred) return 1;
      return 0;
    }
    if (sortOption === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const indexOfLastBoard = currentPage * boardsPerPage;
  const indexOfFirstBoard = indexOfLastBoard - boardsPerPage;
  const currentBoards = sortedBoards.slice(indexOfFirstBoard, indexOfLastBoard);

  const totalPages = Math.ceil(sortedBoards.length / boardsPerPage);

  return (
    <>
      <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white relative p-3 sm:p-6">
 
        <div className="absolute top-4 right-4 flex flex-wrap gap-3 items-center">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-3 py-1 border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
          >
            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-blue-600 dark:text-white border border-blue-300 dark:border-gray-600 px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-gray-700 transition text-sm"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>

        <div className="flex justify-center mb-8 mt-10 sm:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Welcome {name}
          </h1>
        </div>

        
        <div className="flex flex-col sm:flex-row justify-center mb-6 px-4 sm:space-x-7 space-y-3 sm:space-y-0">
          <div className="flex w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Enter board name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              className="flex-1 p-2 rounded-l bg-white dark:bg-gray-800 border border-r-0 border-blue-300 dark:border-gray-600 focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={handleAddBoard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 rounded-r text-sm sm:text-base"
            >
              Add
            </button>
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-blue-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base w-full sm:w-auto"
          >
            <option value="default"></option>
            <option value="alphabetical">Sort A–Z</option>
            <option value="starred">Starred</option>
          </select>
        </div>

        
        <div className="max-w-3xl mx-auto px-4">
          <ul className="space-y-3">
            {currentBoards.map((board) => (
              <li
                key={board.id}
                className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between bg-blue-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-700 transition cursor-pointer"
                onClick={async () => {
                  try {
                    await API.post(`/board/${board.id}/view/`);
                  } catch (error) {
                    console.error("Error marking board as viewed:", error);
                  }
                  navigate(`/boards/${board.id}`);
                }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-yellow-600 p-2 rounded-lg flex-shrink-0">
                    <span className="text-white text-lg sm:text-xl">📋</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      {board.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {name} · Last viewed on {formatDate(board.last_viewed)}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 mt-3 sm:mt-0 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Star
                    className={`cursor-pointer ${
                      starredBoards.includes(board.id)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => toggleStar(board.id)}
                  />
                  <MoreVertical
                    className="text-gray-700 dark:text-gray-200 cursor-pointer"
                    onClick={() =>
                      setDropdownOpenId(
                        dropdownOpenId === board.id ? null : board.id
                      )
                    }
                  />
                  {dropdownOpenId === board.id && (
                    <div className="absolute right-0 top-8 w-32 sm:w-36 bg-white dark:bg-gray-800 rounded shadow-md z-10">
                      <button
                        onClick={() => {
                          handleEditBoard(board);
                          setDropdownOpenId(null);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteBoard(board.id);
                          setDropdownOpenId(null);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

  
      <div className="flex flex-wrap justify-center gap-2 mt-4 px-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-sm sm:text-base disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 border rounded text-sm sm:text-base ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm sm:text-base disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Boards;
