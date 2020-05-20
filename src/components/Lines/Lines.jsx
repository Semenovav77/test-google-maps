import React, {useContext} from 'react';
import {Line} from "../index";
import {changeCoordsFromMap, ContextAPP} from "../../redux/mainReducer";
import {connect} from "react-redux";

const Lines = ({directions}) => {
  /*  const {state,dispatch} = useContext(ContextAPP);
    const {dots, directions} = state;*/
    return (
        <div>
            {(directions) && directions.map((item, index) => <Line key={index} line={item}/>)}
        </div>
    );
};

const mapStateToProps = (state) => ({
    directions: state.mainPage.directions
});

export default connect(mapStateToProps, {changeCoordsFromMap})(Lines);