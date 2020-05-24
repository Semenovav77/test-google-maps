import {connect} from "react-redux";
import {addDotTC, removeDotTC, reOrderTC} from "../redux/mainReducer";
import {Panel} from '../components'
import {DotType} from "../types/types";
import {AppStateType} from "../redux/redux-store";

type MapStatePropType = {
    dots: Array<DotType>,
    center: {
        lat: number,
        lng: number
    }
}

type MapDispatchPropType = {
    addDotTC: (lat: number, lng: number, address: string) => void,
    reOrderTC: (destination: number, source: number) => void,
    removeDotTC: (id: number) => void,
}

type OwnPropType = {}

const mapStateToProps = (state: AppStateType): MapStatePropType => ({
    dots: state.mainPage.dots,
    center: state.mainPage.center,
});

export default connect<MapStatePropType, MapDispatchPropType, OwnPropType, AppStateType>(mapStateToProps,
    {addDotTC, reOrderTC, removeDotTC})(Panel);