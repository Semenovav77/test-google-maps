import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker , Polyline,} from 'google-maps-react';
import {connect} from "react-redux";
import {changeCoordsFromMapTC} from "../../redux/mainReducer";

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [
                {
                    name: "Current position",
                    position: {
                        lat: 56.6402225, lng: 47.883858
                    }
                }
            ]

        }
    }

    onMarkerDragEnd = (coord, id) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.props.changeCoordsFromMapTC(lat, lng, id)
    };

    getLocation = () => {
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
    }

    componentDidMount() {
        this.getLocation()
    }

    handleSubmit = async e => {
        e.preventDefault();

        const location = {
            latitude: this.state.markers[0].position.lat,
            longitude: this.state.markers[0].position.lng
        }

    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Map
                    google={this.props.google}
                    style={{
                        width: "500px",
                        height: "500px"
                    }}
                    zoom={7}
                    initialCenter={{ lat: this.state.markers[0].position.lat, lng: this.state.markers[0].position.lng }}
                >
                    {this.props.dots.map((marker, index) => (

                        <Marker
                            key={index}
                            position={marker.coordinates}
                            draggable={true}
                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                            name={marker.address}
                        />
                    ))}
                    <Polyline
                        path={this.props.directions}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2} />
                </Map>
                <button type="submit" onClick={this.handleSubmit} >submit</button>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    dots: state.mainPage.dots,
    directions: state.mainPage.directions,
});

const MapsContainer = connect(mapStateToProps, {changeCoordsFromMapTC})(Maps);

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAtYEQcK_penjrSlD3ZRIwfsMbGhvPEOY8'
})(MapsContainer);

