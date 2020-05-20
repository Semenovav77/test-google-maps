import React from 'react';
import {withScriptjs} from "react-google-maps";
import {Map} from "../index";

const MapRender =() => {
    const MapLoader = withScriptjs(Map);
    return (
        <div>
            <MapLoader
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtYEQcK_penjrSlD3ZRIwfsMbGhvPEOY8"
                loadingElement={<div style={{height: `100%`}}
                />}
            />
        </div>
    );
}

export default MapRender;