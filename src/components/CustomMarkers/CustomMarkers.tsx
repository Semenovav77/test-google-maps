import React, {useEffect} from 'react';
import {CustomMarker} from "../index";
import {DotType} from "../../types/types";

declare global {
    interface Window {
        renderedMarkers: Array<string>
    }
}
window.renderedMarkers = [];
let timer: Array<ReturnType<typeof setTimeout>> = [];

type PropsType = {
    dots: Array<DotType>,
    onMarkerDragEnd: (coord: any, index: number) => void,
    onMarkerClick: (props: any, marker: any) => void
}

const CustomMarkers: React.FC<PropsType> = React.memo(({dots, onMarkerDragEnd, onMarkerClick, ...props}) => {

    useEffect(() => {
        return () => {
            timer.forEach((item) => clearTimeout(item));
        }
    }, []);

    const toogleRenderMarkers = () => {
        let timerAdd = (dots) && setTimeout(() => dots.map((dots) => {
            if (window.renderedMarkers.indexOf(dots.id) == -1) {
                window.renderedMarkers = [...window.renderedMarkers, dots.id]
            }
        }), 0);
        timer = [...timer, timerAdd]
    };

    return (
        <>
            {dots.map((marker: DotType, index: number) => (
                <CustomMarker
                    {...props}
                    key={marker.id}
                    index={index}
                    marker={marker}
                    onMarkerDragEnd={onMarkerDragEnd}
                    onMarkerClick={onMarkerClick}
                />
            ))}
            {toogleRenderMarkers()}
        </>
    );
})
export default CustomMarkers;

