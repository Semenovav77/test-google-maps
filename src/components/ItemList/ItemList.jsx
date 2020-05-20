import React from 'react';
import {Draggable} from "react-beautiful-dnd";

const ItemList = ({dot: {address}, id, removeDot}) => {
    const onRemoveDot = () => {
        removeDot(id);
    };
    return (
        <>
            <Draggable draggableId={`${id}`} index={id}>
                {(provided, snapshot) => (
                    <div className='card'
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                    >
                        {address}
                        <button onClick={onRemoveDot}>Delete</button>
                    </div>
                )}

            </Draggable>
        </>
    );
};


export default ItemList;