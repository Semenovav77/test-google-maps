import React, {useState, useEffect} from 'react';
import {Map, Polyline, InfoWindow} from 'google-maps-react';

import './Map.scss';
import {CustomMarkers} from '../index'
import {DirectionType, DotType} from "../../types/types";

const coords = {
    lat: 55.755826,
    lng: 37.6172999
};

type PropsType = {
    google: any,
    directions: Array<DirectionType>,
    dots: Array<DotType>,
    changeCoordsFromMapTC: (lat: number, lng: number, id: number) => void,
    setCenter: (lat: number, lng: number) => void
}

const Maps: React.FC<PropsType> = ({google, directions, dots, changeCoordsFromMapTC, setCenter}) => {

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
                    setCenter(coords.latitude, coords.longitude)
                },
                (positionError) => {
                    alert(positionError.message);
                    setCurrentLocation({
                            coordin: coords,
                            isShown: true
                        },
                    );
                    setCenter(coords.lat, coords.lng);
                }
            );
        }
    };


    useEffect(() => {
        getLocation();
    }, []);

    const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false);
    const [activeMarker, setActiveMarker] = useState<any>(null);
    const [selectedPlace, setSelectedPlace] = useState<any>(null);

    const onMarkerDragEnd = (coord: any, id: number) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        changeCoordsFromMapTC(lat, lng, id)
    };

    const onMarkerClick = (props: any, marker: any) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
        debugger
    };

    const onMapClick = () => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    };

    const centerMoved = (mapProps: any, map: any) => {
        const lat = map.center.lat();
        const lng = map.center.lng();
        setCenter(lat, lng);
    };

    return (
        <div className='map'>
            {(currentLocation.isShown) &&
            <>
                <Map
                    google={google}
                    containerStyle={{
                        position: "relative",
                        width: "456px",
                        height: "488px",
                    }}
                    //@ts-ignore
                    zoom={7}
                    initialCenter={currentLocation.coordin}
                    onIdle={centerMoved}
                    onClick={onMapClick}
                >
                    <CustomMarkers dots={dots}
                                   onMarkerDragEnd={onMarkerDragEnd}
                                   onMarkerClick={onMarkerClick}/>

                    {(selectedPlace) && <InfoWindow marker={activeMarker}
                                                    visible={showingInfoWindow}
                        //@ts-ignore
                                                    onClose={onMapClick}>
                        <div>
                            <p className='head'>{(selectedPlace.name) && selectedPlace.name}</p>
                            <p>lat: {(selectedPlace.position) && selectedPlace.position.lat}</p>
                            <p>lng: {(selectedPlace.position) && selectedPlace.position.lng}</p>
                        </div>
                    </InfoWindow>}
                    {(directions) && <Polyline
                        path={directions}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}/>}
                </Map>
            </>}

        </div>
    );

};

export default Maps;


