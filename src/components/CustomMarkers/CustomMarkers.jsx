import React from 'react';
import {CustomMarker} from "../../components";

const CustomMarkers = ({dots, ...props }) => {
    return (
        <>
            {dots.map((marker, index) => (
                <CustomMarker
                    {...props}
                    key={marker.id}
                    index={index}
                    marker={marker}
                    onMarkerDragEnd={props.onMarkerDragEnd}
                    onMarkerClick={props.onMarkerClick}
                    google={props.google}
                />
            ))}
        </>
    );
}

export default CustomMarkers;

/*
{marker, onMarkerDragEnd,onMarkerClick, key, google}
*/
{/*
<Marker
    key={index}
    position={marker.coordinates}
    draggable={true}
    onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
    name={marker.address}
    onClick={onMarkerClick}
    animation={(window.renderedMarkers.indexOf(marker.id) == -1) && google.maps.Animation.DROP}
/>*/}
