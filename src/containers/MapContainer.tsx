import {connect} from 'react-redux';
import {changeCoordsFromMapTC, setCenter} from '../redux/mainReducer';
import {GoogleApiWrapper} from 'google-maps-react';
import {Maps} from './../components';
import {DirectionType, DotType} from "../types/types";

type MapStatePropType = {
    dots: Array<DotType>,
    directions: Array<DirectionType>
}

type MapDispatchPropTypes = {
    changeCoordsFromMapTC: (lat: number, lng: number, id: number) => void,
    setCenter: (lat:number, lng: number) => void
}

type OwnPropTypes = {

}

const mapStateToProps = (state: any):MapStatePropType => ({
    dots: state.mainPage.dots,
    directions: state.mainPage.directions
});

const MapContainer = connect<MapStatePropType, MapDispatchPropTypes, OwnPropTypes, any>(mapStateToProps,
    {changeCoordsFromMapTC, setCenter})(Maps);

export default GoogleApiWrapper({
    // @ts-ignore
    apiKey: process.env.REACT_APP_GOOGLE_API_TOKEN
})(MapContainer)