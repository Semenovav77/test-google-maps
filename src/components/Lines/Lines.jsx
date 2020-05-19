import React from 'react';
import {GoogleMap, Polyline} from "react-google-maps";

const Lines = ({line}) => {
    return (
        <div>
            <Polyline
                path={line}
                geodesic={true}
                options={{
                    strokeColor: "blue",
                    strokeOpacity: 0.75,
                    strokeWeight: 2
                }}
            />
        </div>
    );
};

export default Lines;