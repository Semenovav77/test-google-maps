import React, {useState, useCallback} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import {ItemList} from '../../components';
import {Button} from '../../components';
import {Input} from '../../components';
import './Panel.scss'

const getListStyle = isDraggingOver => ({
 /*   background: isDraggingOver ? '#ededed' : ''*/
})

const Panel = ({dots, center,  addDotTC, reOrderTC, removeDotTC}) => {

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };
   const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            (value) && addDotTC(center.lat, center.lng, value);
            setValue('');
        }
    };

    const addHandleDot = () => {
        (value) && addDotTC(center.lat, center.lng, value);
        setValue('');
    };

    const onDragEnd = useCallback((result) => {
        const {destination, source, draggableId} = result;
        if (!destination) return;
        reOrderTC(destination.index, source.index);
    }, []);

    return (
        <div className='panel'>
            <div className='panel__input'>
            <Input value={value} handleChange={handleChange} handleKeyPress={handleKeyPress}/>
            <Button addHandleDot={addHandleDot}/>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={`panel`} type="PERSON">
                    {(provided, snapshot) => (
                        <div className='panel__dots' ref={provided.innerRef} {...provided.droppableProps}
                             style={getListStyle(snapshot.isDraggingOver)}>
                            <div>
                                {dots.map((item, index) => <ItemList key={index} dot={item} id={index} removeDot={removeDotTC}/>
                                )}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Panel;