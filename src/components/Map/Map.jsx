import React, {useState} from 'react';
import {Map, GoogleApiWrapper, Polyline, Marker, InfoWindow} from 'google-maps-react';
import {connect} from "react-redux";

import {changeCoordsFromMapTC} from '../../redux/mainReducer'


const Maps = ({google, directions, dots, changeCoordsFromMapTC}) => {

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
        debugger
        console.log('yoyoyo')
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true)
    };

    /* const getLocation = () => {
         if (navigator && navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(pos => {
                 const coords = pos.coords;

                 let newState = Object.assign({}, this.state);
                 newState.markers[0].position.lat = coords.latitude;
                 newState.markers[0].position.lng = coords.longitude;

                 this.setState(newState);
                 console.log("map", this.state.markers[0].position.lat, this.state.markers[0].position.lng)
             });
         }
     }*/

    /*    componentDidMount() {
            this.getLocation()
        }*/

    const handleSubmit = async e => {
        e.preventDefault();

        const location = {
            latitude: this.state.markers[0].position.lat,
            longitude: this.state.markers[0].position.lng
        }

    }

    return (
        <div>
            <Map
                google={google}
                style={{
                    width: "500px",
                    height: "500px"
                }}
                zoom={7}
                /*
                                initialCenter={{lat: this.state.markers[0].position.lat, lng: this.state.markers[0].position.lng}}
                */
                initialCenter={{lat: 56.6402225, lng: 47.883858}}
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
                        <p>lat: {(selectedPlace.mapCenter)&&selectedPlace.mapCenter.lat}</p>
                        <p>lng: {(selectedPlace.mapCenter)&&selectedPlace.mapCenter.lng}</p>
                    </div>
                </InfoWindow>
                <Polyline
                    path={directions}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={2}/>
            </Map>
            {/*
            <button type="submit" onClick={handleSubmit}>submit</button>
*/}
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

