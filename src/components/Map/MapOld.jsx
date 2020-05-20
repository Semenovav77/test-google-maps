/*global google*/
import React from "react";
import {
    withGoogleMap,
    GoogleMap, Marker,
} from "react-google-maps";

import {Markers} from '../../components'
import {Lines} from '../../components'
const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
        defaultCenter={/*dots[0].coordinates || */{lat: 56.6402225, lng: 47.883858}}
        defaultZoom={7}
    >

        <Markers/>
        <Lines/>
    </GoogleMap>
));

const MapOld = () => {
    return (
        <div>
            <GoogleMapExample
                containerElement={<div style={{height: `500px`, width: "500px"}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        </div>
    )
};


export default MapOld;