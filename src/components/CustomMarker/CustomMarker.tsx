import React from 'react';
import {Marker} from "google-maps-react";
import {DotType} from "../../types/types";

type PropsType = {
    marker: DotType,
    index: number,
    onMarkerClick: (props: any, marker: any) => void,
    onMarkerDragEnd: (coord: any, index: number) => void
}

const CustomMarker: React.FC<PropsType> = React.memo(({marker, index, onMarkerClick, onMarkerDragEnd, ...props}) => {
    return (
        <>
            <Marker
                {...props}
                key={marker.id}
                //@ts-ignore
                position={marker.coordinates}
                draggable={true}
                onDragend={(t: any, map: any, coord: any) => onMarkerDragEnd(coord, index)}
                name={marker.address}
                onClick={onMarkerClick}
                //@ts-ignore
                animation={(window.renderedMarkers.indexOf(marker.id) === -1) && props.google.maps.Animation.DROP}
            />
        </>
    );
});

export default CustomMarker;