import React from 'react';
import {Polyline} from "react-google-maps";

const Line = ({line}) => {
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

export default Line;