import React, { useContext } from 'react';
import { MoreHorizontal, UserPlus, Edit2 } from 'react-feather';
import CardAdd from './CardAdd';
import { BoardContext } from '../context/BoardContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddList from './Addlist';
import Utils from '../utils/Utils';

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];

    const onDragEnd = (res) => {
        if (!res.destination) {
            console.log('No Destination');
            return;
        }

        const newList = [...bdata.list];
        const sourceIndex = parseInt(res.source.droppableId);
        const destinationIndex = parseInt(res.destination.droppableId);

        const [movedItem] = newList[sourceIndex - 1].items.splice(res.source.index, 1);
        newList[destinationIndex - 1].items.splice(res.destination.index, 0, movedItem);

        const updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list = newList;
        setAllBoard(updatedBoard);
    };

    const cardData = (e, index) => {
        const newList = [...bdata.list];
        newList[index].items.push({ id: Utils.makeid(5), title: e });

        const updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list = newList;
        setAllBoard(updatedBoard);
    };

    const listData = (e) => {
        const newList = [...bdata.list];
        newList.push({ id: (newList.length + 1).toString(), title: e, items: [] });

        const updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list = newList;
        setAllBoard(updatedBoard);
    };

    return (
        <div className='flex flex-col w-full' style={{ backgroundColor: bdata.bgcolor }}>
            <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
                <h2 className='text-lg'>{bdata.name}</h2>
                <div className='flex items-center justify-center'>
                    <button className='bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex items-center'>
                        <UserPlus size={16} className='mr-2' />
                        Share
                    </button>
                    <button className='hover:bg-gray-500 px-2 py-1 h-8 rounded'>
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>

            <div className='flex flex-col w-full flex-grow relative'>
                <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {bdata.list && bdata.list.map((listItem, index) => (
                            <div key={index} className='mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0'>
                                <div className='list-body'>
                                    <div className='flex justify-between p-1'>
                                        <span>{listItem.title}</span>
                                        <button className='hover:bg-gray-500 p-1 rounded-sm'>
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>

                                    <Droppable droppableId={String(listItem.id)}>
                                        {(provided, snapshot) => (
                                            <div
                                                className='py-1'
                                                ref={provided.innerRef}
                                                style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                                                {...provided.droppableProps}
                                            >
                                                {listItem.items && listItem.items.map((item, idx) => (
                                                    <Draggable key={String(item.id)} draggableId={String(item.id)} index={idx}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div className='item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500'>
                                                                    <span>{item.title}</span>
                                                                    <span className='flex justify-start items-start'>
                                                                        <button className='hover:bg-gray-600 p-1 rounded-sm'>
                                                                            <Edit2 size={16} />
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>

                                    <CardAdd getcard={(e) => cardData(e, index)} />
                                </div>
                            </div>
                        ))}
                    </DragDropContext>

                    <AddList getlist={listData} />
                </div>
            </div>
        </div>
    );
};

export default Main;
