import React from 'react';
import {Marker} from "google-maps-react";

const CustomMarker = React.memo((props) => {
    return (
        <>
            <Marker
                {...props}
                key={props.marker.id}
                position={props.marker.coordinates}
                draggable={true}
                onDragend={(t, map, coord) => props.onMarkerDragEnd(coord, props.index)}
                name={props.marker.address}
                onClick={props.onMarkerClick}
                animation={(window.renderedMarkers.indexOf(props.marker.id) === -1) && props.google.maps.Animation.DROP}
            />
        </>
    );
})

export default CustomMarker;