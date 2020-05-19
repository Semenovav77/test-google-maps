import React from 'react';

const CHANGE_DRAGGABLE_MAP_DOT = 'main/CHANGE_DRAGGABLE_MAP_DOT';
const UPDATE_DIRECTIONS = 'main/UPDATE_DIRECTIONS';
const ADD_DOT = 'main/ADD_DOT';
const REMOVE_DOT = 'main/REMOVE_DOT';
const REORDER_LIST = 'main/REORDER_LIST';
const INITIALIZE_APP = 'main/INITIALIZE_APP';
const TOOGLE_INITIALIZE_APP = 'main/TOOGLE_INITIALIZE_APP';

export const ContextAPP = React.createContext();

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
/*                [{lat: 56.6402225, lng: 47.883858}, {lat: 55.8722768, lng: 48.356852}],
                [{lat: 55.8722768, lng: 48.356852}, {lat: 56.3294182, lng: 46.5530163}]*/
    ],
    initialize: false
};

export const reducer = (state, action) => {
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
                            }
                        }
                    } else
                        return item
                })
            };
        case UPDATE_DIRECTIONS:
            const newDir = [];
            for (let i = 0; i < state.dots.length - 1; i++) {
                newDir[i] = [state.dots[i].coordinates, state.dots[i + 1].coordinates]
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
                    }
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
        case INITIALIZE_APP:
            return {
                ...state,
                dots: action.payload
            };
        default:
            return state
    }
};

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

export const removeDot = (id) => {
    return {
        type: REMOVE_DOT,
        payload: {id}
    }
};

export const reOrder = (destination, source) => {
    return {
        type: REORDER_LIST,
        payload: {destination, source}
    }
};

export const initializedApp = (dots) => {
    return {
        type: INITIALIZE_APP,
        payload: dots
    }
};
