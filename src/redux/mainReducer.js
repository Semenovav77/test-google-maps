const CHANGE_DRAGGABLE_MAP_DOT = 'main/CHANGE_DRAGGABLE_MAP_DOT';
const UPDATE_DIRECTIONS = 'main/UPDATE_DIRECTIONS';
const ADD_DOT = 'main/ADD_DOT';
const REMOVE_DOT = 'main/REMOVE_DOT';
const REORDER_LIST = 'main/REORDER_LIST';
const SET_CENTER = 'main/SET_CENTER';
const ADD_DIRECTION = 'main/ADD_DIRECTION';
const REMOVE_DIRECTION = 'main/REMOVE_DIRECTION';

export const initialState = {
    dots: [
        /*{
            address: 'Йошкар-Ола',
            coordinates: {lat: 56.6402225, lng: 47.883858}
        },
        {
            address: 'Волжск',
            coordinates: {lat: 55.8722768, lng: 48.356852}
        },
        {
            address: 'Козьмодемьянск',
            coordinates: {lat: 56.3294182, lng: 46.5530163}
        }*/
    ],
    directions: [
        /*  {lat: 56.6402225, lng: 47.883858},
          {lat: 55.8722768, lng: 48.356852},
          {lat: 56.3294182, lng: 46.5530163}*/
    ],
    center: {lat: 0, lng: 0},
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DRAGGABLE_MAP_DOT:
            return {
                ...state,
                dots: state.dots.map((item, index) => {
                    if (index === action.payload.id) {
                        return {
                            address: item.address,
                            coordinates: {
                                lat: action.payload.lat,
                                lng: action.payload.lng
                            },
                            id: item.id
                        }
                    } else
                        return item
                })
            };
        case UPDATE_DIRECTIONS:
            const newDir = [];
            for (let i = 0; i < state.dots.length; i++) {
                newDir[i] = state.dots[i].coordinates
            }
            return {
                ...state,
                directions: newDir
            };
        case ADD_DOT:
            return {
                ...state,
                dots: [...state.dots, {
                    address: action.payload.address,
                    coordinates: {
                        lat: action.payload.lat,
                        lng: action.payload.lng
                    },
                    id: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
                }]
            };
        case REMOVE_DOT:
            return {
                ...state,
                dots: state.dots.filter((el, index) => action.payload.id !== index)
            };
        case REORDER_LIST:
            const newDots = [...state.dots];
            const [delItem] = newDots.splice(action.payload.source, 1);
            newDots.splice(action.payload.destination, 0, delItem);
            return {
                ...state,
                dots: newDots
            };
        case SET_CENTER:
            return {
                ...state,
                center: {
                    lat: action.payload.lat,
                    lng: action.payload.lng
                }
            };
        case ADD_DIRECTION:
            return {
                ...state,
                directions: [...state.directions,
                    {
                        lat: action.payload.lat,
                        lng: action.payload.lng
                    }]
            };
        case REMOVE_DIRECTION:
            return {
                ...state,
                directions: state.directions.filter((el, index) => action.payload !== index)
            };
        default:
            return state
    }
};

export default mainReducer;

export const changeCoordsFromMap = (lat, lng, id) => {
    return {
        type: CHANGE_DRAGGABLE_MAP_DOT,
        payload: {lat, lng, id}
    }
};

export const updateDirections = () => {
    return {
        type: UPDATE_DIRECTIONS
    }
};

export const addDot = (lat, lng, address) => {
    return {
        type: ADD_DOT,
        payload: {lat, lng, address}
    }
};

export const addDirection = (lat, lng) => {
    return {
        type: ADD_DIRECTION,
        payload: {lat, lng}
    }
};

export const removeDot = (id) => {
    return {
        type: REMOVE_DOT,
        payload: {id}
    }
};

export const removeDirection = (id) => {
    return {
        type: REMOVE_DIRECTION,
        payload: id
    }
};

export const reOrder = (destination, source) => {
    return {
        type: REORDER_LIST,
        payload: {destination, source}
    }
};

export const setCenter = (lat, lng) => {
    return {
        type: SET_CENTER,
        payload: {lat, lng}
    }
};

export const addDotTC = (lat, lng, address) => {
    return (dispatch) => {
        dispatch(addDot(lat, lng, address));
        dispatch(addDirection(lat, lng));
    }
};

export const changeCoordsFromMapTC = (lat, lng, id) => {
    return (dispatch) => {
        let promise = dispatch(changeCoordsFromMap(lat, lng, id));
        Promise.all([promise])
            .then(() => {
                dispatch(updateDirections());
            });
    }
};

export const removeDotTC = (id) => {
    return (dispatch) => {
        dispatch(removeDot(id));
        dispatch(removeDirection(id));
    }
};
export const reOrderTC = (destination, source) => {
    return (dispatch) => {
        let promise = dispatch(reOrder(destination, source));
        Promise.all([promise])
            .then(() => {
                dispatch(updateDirections());
            });
    }
};


