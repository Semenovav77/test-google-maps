import React, {useState, useCallback, useEffect} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import {ItemList} from '../../components';
import {Button} from '../../components';
import {Input} from '../../components';
import './Panel.scss'
import {DotType} from "../../types/types";

/*const getListStyle = isDraggingOver => ({
       background: isDraggingOver ? '#ededed' : ''
});*/
let timerDel: Array<ReturnType<typeof setTimeout> > = [];

type Props = {
    dots: Array<DotType>,
    center: {
        lat: number,
        lng:number
    },
    addDotTC: (lat: number, lng: number, address: string) => void,
    reOrderTC: (destination: number, source: number) => void,
    removeDotTC: (id: number) => void,
}

const Panel: React.FC<Props> = ({dots, center, addDotTC, reOrderTC, removeDotTC}) => {

    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            (value) && addDotTC(center.lat, center.lng, value);
            setValue('');
        }
    };

    useEffect(() => {
         return () => timerDel.forEach((item) => clearTimeout(item));
    }, []);

    const onRemoveDot = (index: number, dot:DotType) => {
        let timerItem: ReturnType<typeof setTimeout>  = setTimeout(() => {
            // @ts-ignore
            if (window.renderedMarkers.findIndex(n => n === dot.id) !== -1) {
                // @ts-ignore
                window.renderedMarkers.splice(index, 1);
            }
        },10000);
        timerDel = [...timerDel, timerItem];
        removeDotTC(index);
    };

    const addHandleDot = () => {
        (value) && addDotTC(center.lat, center.lng, value);
        setValue('');
    };

    const onDragEnd = useCallback((result) => {
        const {destination, source} = result;
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
                             /*style={getListStyle(snapshot.isDraggingOver)}*/
                             style={{ height: '100%' }}>
                            <div>
                                {dots.map((item, index) => <ItemList key={index} dot={item} index={index}
                                                                     onRemoveDot={onRemoveDot}/>
                                )}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Panel;