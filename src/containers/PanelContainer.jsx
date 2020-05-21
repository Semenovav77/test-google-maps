import {connect} from "react-redux";
import {addDotTC, removeDotTC, reOrderTC} from "../redux/mainReducer";
import {Panel} from './../components'

const mapStateToProps = (state) => ({
    dots: state.mainPage.dots,
    center: state.mainPage.center,
});

export default connect(mapStateToProps, {addDotTC, reOrderTC, removeDotTC})(Panel);