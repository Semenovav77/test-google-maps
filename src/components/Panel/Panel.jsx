import React, {useState, useCallback, useEffect} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {connect} from "react-redux";

import {addDotTC, removeDotTC, reOrderTC} from "../../redux/mainReducer";
import {ItemList} from '../../components';
import {Button} from '../../components';
import {Input} from '../../components';


const Panel = ({dots, addDotTC, reOrderTC, removeDotTC}) => {
  /*  useEffect(() => {
        localStorage.setItem('dots', JSON.stringify(dots))
    }, [dots]);*/

    const [value, setValue] = useState('');
    const [LatLng, setLatLng] = useState(null);

    const handleChange = (address) => {
        setValue(address);
    };

    const addHandleDot = () => {
        (value) && addDotTC(LatLng.lat, LatLng.lng, value);
        setValue('');
    };

    const onDragEnd = useCallback((result) => {
        const {destination, source, draggableId} = result;
        console.log(destination);
        console.log(source);
        console.log(draggableId);
        if (!destination) return;
        reOrderTC(destination.index, source.index);
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
                                {dots.map((item, index) => <ItemList key={index} dot={item} id={index} removeDot={removeDotTC}/>
                                )}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

const mapStateToProps = (state) => ({
    dots: state.mainPage.dots
});

export default connect(mapStateToProps, {addDotTC, reOrderTC, removeDotTC})(Panel);