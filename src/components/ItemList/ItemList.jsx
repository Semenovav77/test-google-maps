import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

import close from './../../assets/close.svg';
import group from './../../assets/group.svg';
import './ItemList.scss'

const ItemList = ({dot: {address}, id, removeDot}) => {
    const onRemoveDot = () => {
        removeDot(id);
    };
    return (
        <>
            <Draggable draggableId={`${id}`} index={id}>
                {(provided, snapshot) => (
                    <div className='item'
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                    >
                        <div className='item__left'>
                            <img src={group} alt='svg group' />
                        </div>
                        <div className='item__center'>
                            {address}
                        </div>
                        <div className='item__right' onClick={onRemoveDot}>
                            <img src={close} alt='svg close' />
                        </div>
                   {/*     <button onClick={onRemoveDot}>Delete</button>*/}
                    </div>
                )}

            </Draggable>
        </>
    );
};


export default ItemList;