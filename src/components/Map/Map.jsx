import React, {useState, useEffect} from 'react';
import {Map, GoogleApiWrapper, Polyline, Marker, InfoWindow} from 'google-maps-react';
import {connect} from "react-redux";

import {changeCoordsFromMapTC, setCenter} from '../../redux/mainReducer'
import './Map.scss'


const coords = {
    lat: 55.755826,
    lng: 37.6172999
}

const Maps = ({google, directions, dots, changeCoordsFromMapTC, setCenter}) => {

    const [currentLocation, setCurrentLocation] = useState({
        coordin: coords,
        isShown: false
    });

    const getLocation = () => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                    const coords = position.coords;
                    setCurrentLocation({
                            coordin: {
                                lat: coords.latitude,
                                lng: coords.longitude
                            },
                            isShown: true
                        },
                    );
                    setCenter( coords.latitude, coords.longitude)
                },
                (positionError) => {
                    alert(positionError.message);
                    setCurrentLocation({
                            coordin: coords,
                            isShown: true
                        },
                    );
                    setCenter(coords.lat, coords.lng);
                    debugger
                }
            );
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const onMarkerDragEnd = (coord, id) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        changeCoordsFromMapTC(lat, lng, id)
    };

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
        console.log(selectedPlace);
        debugger
    };

   const onMapClick = (props) => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    };

    const centerMoved = (mapProps, map) => {
        const lat = map.center.lat();
        const lng = map.center.lng();
        setCenter(lat, lng);
    };

    return (
        <div className='map'>
            {(currentLocation.isShown) &&
            <Map
                google={google}
                style={{
                    width: "456px",
                    height: "488px"
                }}
                zoom={7}
                initialCenter={currentLocation.coordin}
                onDragend={centerMoved}
                onClick = {onMapClick}
            >
                {dots.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.coordinates}
                        draggable={true}
                        onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
                        name={marker.address}
                        onClick={onMarkerClick}
                        animation={google.maps.Animation.DROP}
                    />

                ))}
                {(selectedPlace) && <InfoWindow marker={activeMarker}
                                              visible={showingInfoWindow}
                                                onClose={onMapClick}>
                    <div>
                        <h4>{(selectedPlace.name) && selectedPlace.name}</h4>
                        <p>lat: {(selectedPlace.position) && selectedPlace.position.lat}</p>
                        <p>lng: {(selectedPlace.position) && selectedPlace.position.lng}</p>
                    </div>
                </InfoWindow>}
                <Polyline
                    path={directions}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={2}/>
            </Map>}
        </div>
    );

};

export default Maps;

