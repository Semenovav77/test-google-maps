import {connect} from 'react-redux';
import {changeCoordsFromMapTC, setCenter} from '../redux/mainReducer';
import {GoogleApiWrapper} from 'google-maps-react';
import {Maps} from './../components';

const mapStateToProps = (state) => ({
    dots: state.mainPage.dots,
    directions: state.mainPage.directions
});

const MapContainer = connect(mapStateToProps, {changeCoordsFromMapTC, setCenter})(Maps);

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_TOKEN
})(MapContainer)