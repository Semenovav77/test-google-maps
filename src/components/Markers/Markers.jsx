import React from 'react';
import {connect} from 'react-redux';

import {MarkerItem} from "../../components";
import {changeCoordsFromMapTC} from "../../redux/mainReducer";

const Markers = ({dots, changeCoordsFromMapTC}) => {
    return (
        <div>
            {(dots) && dots.map((item, index) => <MarkerItem key={index} dot={item} id={index} changeCoordsFromMapTC={changeCoordsFromMapTC}/>)}
        </div>
    );
};

const mapStateToProps = (state) => ({
    dots: state.mainPage.dots
});

export default connect(mapStateToProps, {changeCoordsFromMapTC})(Markers);