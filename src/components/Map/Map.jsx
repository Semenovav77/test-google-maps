import React, {useState, useEffect} from 'react';
import {Map, GoogleApiWrapper, Polyline, Marker, InfoWindow} from 'google-maps-react';
import {connect} from "react-redux";

import {changeCoordsFromMapTC} from '../../redux/mainReducer'


const Maps = ({google, directions, dots, changeCoordsFromMapTC}) => {

    const [currentLocation, setCurrentLocation] = useState({
        coordin: {
            lat: 55.755826,
            lng: 37.6172999
        },
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
                },
                (positionError) => {
                    alert(positionError.message);
                    setCurrentLocation({
                            coordin: {
                                lat: 55.755826,
                                lng: 37.6172999
                            },
                            isShown: true
                        },
                    );
                    console.log()
                    debugger
                }
            );
        }
    };

    useEffect(() => {
        getLocation();

    }, []);

    const [showingInfoWindow, setShowingInfoWindow] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState('');

    const onMarkerDragEnd = (coord, id) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        changeCoordsFromMapTC(lat, lng, id)
    };

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true)
        debugger
    };

    return (
        <div>
            {console.log(currentLocation)}
            {(currentLocation.isShown) && <Map
                google={google}
                style={{
                    width: "500px",
                    height: "500px"
                }}
                zoom={7}
                initialCenter={currentLocation.coordin}
            >
                {dots.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.coordinates}
                        draggable={true}
                        onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
                        name={marker.address}
                        onClick={onMarkerClick}
                    />

                ))}
                <InfoWindow marker={activeMarker}
                            visible={showingInfoWindow}>
                    <div>
                        <h4>{selectedPlace.name}</h4>
                        <p>lat: {(selectedPlace.mapCenter) && selectedPlace.mapCenter.lat}</p>
                        <p>lng: {(selectedPlace.mapCenter) && selectedPlace.mapCenter.lng}</p>
                    </div>
                </InfoWindow>
                <Polyline
                    path={directions}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={2}/>
            </Map>}
        </div>
    );

};

const mapStateToProps = (state) => ({
    dots: state.mainPage.dots,
    directions: state.mainPage.directions
});

const MapContainer = connect(mapStateToProps, {changeCoordsFromMapTC})(Maps);

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAtYEQcK_penjrSlD3ZRIwfsMbGhvPEOY8'
})(MapContainer);

