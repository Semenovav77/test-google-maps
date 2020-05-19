/*global google*/
import React, {useContext, useEffect} from "react";
import {
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";

import {ContextAPP} from "../../reducer/reducer";
import {Markers} from '../../components'
import {Lines} from '../../components'

const Map = React.memo(() => {

    const {state,dispatch} = useContext(ContextAPP);
    const {dots, directions} = state;
    useEffect(() => {
    }, []);

    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={/*dots[0].coordinates || */{ lat: 56.6402225, lng:  47.883858  }}
            defaultZoom={7}
        >
            {(dots) && dots.map((item, index) => <Markers key={index} dot={item} dispatch={dispatch} id={index}/>)}
            {(directions) && directions.map((item, index) => <Lines key={index} line={item}/>)}
        </GoogleMap>
    ));

    return (
        <div>
            <GoogleMapExample
                containerElement={<div style={{ height: `500px`, width: "500px" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
})


export default Map;