import React from 'react';
import {Draggable} from "react-beautiful-dnd";

import {removeDot} from '../../reducer/reducer'

const ItemList = ({dot: {address}, id, dispatch}) => {
    const onRemoveDot = () => {
        dispatch(removeDot(id));
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