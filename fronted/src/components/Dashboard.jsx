import React, { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import API from '../utils/api';
import AddBoard from './AddBoard';
import AddTask from './AddTask';
import CardItem from './CardItem';
import Header from './Header';

const statusList = ['To do', 'In progress', 'Done'];

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    API.get('boards/')
      .then(res => {
        setBoards(res.data);
        if (res.data.length) setActiveBoard(res.data[0].id);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (activeBoard) {
      API.get(`cards/?board_id=${activeBoard}`)
        .then(res => setCards(res.data))
        .catch(err => console.error(err));
    }
  }, [activeBoard]);

  const getCardsByStatus = (status) => {
    return cards.filter(card => card.status === status);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const card = cards.find(c => c.id === active.id);
    if (!card) return;

    const newStatus = over.id;
    if (card.status !== newStatus) {
      const updated = { ...card, status: newStatus };
      API.put(`cards/${card.id}/`, updated)
        .then(() => {
          setCards(prev => prev.map(c => (c.id === card.id ? updated : c)));
        })
        .catch(err => console.error(err));
    }
  };

  const handleBoardDelete = async (id) => {
    try {
      await API.delete(`boards/${id}/`);
      const updatedBoards = boards.filter(b => b.id !== id);
      setBoards(updatedBoards);

      if (id === activeBoard) {
        if (updatedBoards.length > 0) {
          setActiveBoard(updatedBoards[0].id);
        } else {
          setActiveBoard(null);
          setCards([]);
        }
      }
    } catch (err) {
      console.error('Delete board error:', err);
    }
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <AddBoard
            onBoardAdd={(board) => {
              setBoards([...boards, board]);
              setCards([]);
              setActiveBoard(board.id);
            }}
            onBoardDelete={handleBoardDelete}
            boards={boards}
          />

          <select
            onChange={e => setActiveBoard(e.target.value)}
            value={activeBoard || ""}
            className="border px-2 py-1 rounded"
          >
            {boards.map(b => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {statusList.map(status => (
              <div
                key={status}
                id={status}
                className="bg-gray-100 p-2 rounded shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{status}</h3>
                  <AddTask
                    boardId={activeBoard}
                    onTaskAdd={(task) => setCards([...cards, task])}
                  />
                </div>

                {getCardsByStatus(status).map(card => (
                  <CardItem
                    key={card.id}
                    card={card}
                    onDelete={(id) => {
                      API.delete(`cards/${id}/`)
                        .then(() =>
                          setCards(prev => prev.filter(c => c.id !== id))
                        )
                        .catch(err => console.error(err));
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </DndContext>
      </div>
    </>
  );
};

export default Dashboard;
