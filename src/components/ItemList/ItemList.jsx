import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

import group from './../../assets/group.svg';
import './ItemList.scss';


/*const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
     /!* padding: grid * 2,
      margin: `0 0 ${grid}px 0`,*!/
    cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,

    // opt out of pointer-events: none for dragging items
    ...(isDragging && { pointerEvents: 'auto' })
});*/

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
                         /*style={getItemStyle(
                             snapshot.isDragging,
                             snapshot.draggableProps.style,
                         )}*/
                    >
                        <div className='item__left'>
                            <img src={group} alt='svg group' />
                        </div>
                        <div className='item__center'>
                            {address}
                        </div>
                        <div className='item__right' onClick={onRemoveDot}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.70819 7L11.2971 2.72207C11.3572 2.65098 11.3066 2.54297 11.2137 2.54297H10.1226C10.0584 2.54297 9.99686 2.57168 9.95448 2.6209L6.99452 6.14961L4.03456 2.6209C3.99354 2.57168 3.93202 2.54297 3.86639 2.54297H2.77538C2.68241 2.54297 2.63182 2.65098 2.69198 2.72207L6.28085 7L2.69198 11.2779C2.6785 11.2938 2.66986 11.3132 2.66707 11.3338C2.66428 11.3544 2.66747 11.3754 2.67625 11.3942C2.68503 11.4131 2.69904 11.429 2.71661 11.4402C2.73418 11.4513 2.75458 11.4571 2.77538 11.457H3.86639C3.93065 11.457 3.99218 11.4283 4.03456 11.3791L6.99452 7.85039L9.95448 11.3791C9.99549 11.4283 10.057 11.457 10.1226 11.457H11.2137C11.3066 11.457 11.3572 11.349 11.2971 11.2779L7.70819 7Z" fill="#8C8C8C"/>
                            </svg>
                        </div>
                    </div>
                )}

            </Draggable>
        </>
    );
};


export default ItemList;