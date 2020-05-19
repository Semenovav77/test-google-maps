import React, {useState, useCallback} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import {addDot} from "../../reducer/reducer";
import {ItemList} from '../../components';
import {Button} from '../../components';
import {Input} from '../../components';
import {reOrder} from "../../reducer/reducer";

const Panel = ({dots, dispatch}) => {

    const [value, setValue] = useState('');
    const [LatLng, setLatLng] = useState(null);

    const handleChange = (address) => {
        setValue(address);
    };

    const addHandleDot = () => {
        (value) && dispatch(addDot(LatLng.lat, LatLng.lng, value));
        setValue('');
    };

    const onDragEnd = useCallback((result) => {
        const {destination, source, draggableId} = result;
        console.log(destination);
        console.log(source);
        console.log(draggableId);
        if (!destination) return;
        dispatch(reOrder(destination.index, source.index));
    }, []);

    return (
        <>
            <Input value={value} handleChange={handleChange} setValue={setValue} setLatLng={setLatLng}/>
            <Button addHandleDot={addHandleDot}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={`panel`} type="PERSON">
                    {(provided, snapshot) => (
                        <div className='panel' ref={provided.innerRef} {...provided.droppableProps}>
                            <div>
                                {dots.map((item, index) => <ItemList key={index} dot={item} id={index} dispatch={dispatch}/>
                                )}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default Panel;
