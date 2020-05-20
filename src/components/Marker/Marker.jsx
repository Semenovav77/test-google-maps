import React, {useState} from 'react';
import {InfoWindow, Marker} from "react-google-maps";

const MarkerItem = React.memo(({dot: {address, coordinates}, id, changeCoordsFromMapTC}) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const handleMouseOver = () => {
        setShowInfoWindow(true)
    };
    const handleMouseExit = () => {
        setShowInfoWindow(false)
    };
    const onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        console.log(coord)
        const lat = latLng.lat();
        const lng = latLng.lng();
        changeCoordsFromMapTC(lat, lng, id);

    };
    return (
        <div>
            <Marker
                position={coordinates}
                onClick={handleMouseOver}
                draggable={true}
                onDragEnd={onMarkerDragEnd}
            >
                {showInfoWindow && (
                    <InfoWindow onCloseClick={handleMouseExit}>
                        <>
                            <h4>{address}</h4>
                            <p>lat: {coordinates.lat} </p>
                            <p>lng: {coordinates.lng} </p>
                        </>
                    </InfoWindow>
                )}
            </Marker>
        </div>
    );
});

export default MarkerItem;