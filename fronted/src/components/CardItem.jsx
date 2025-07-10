import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Trash2 } from 'react-feather';

const CardItem = ({ card, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white p-2 mb-2 shadow rounded relative"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      <Trash2
        size={16}
        className="text-red-500 cursor-pointer absolute top-2 right-2"
        onClick={() => onDelete(card.id)}
      />
      <h4 className="font-semibold">{card.title}</h4>
      <p className="text-xs text-gray-600">{card.description}</p>
    </div>
  );
};

export default CardItem;
