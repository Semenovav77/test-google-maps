import {DirectionType, DotType} from "../types/types";
import {ActionCreatorsMapObject, Dispatch} from "redux";

const CHANGE_DRAGGABLE_MAP_DOT = 'main/CHANGE_DRAGGABLE_MAP_DOT';
const UPDATE_DIRECTIONS = 'main/UPDATE_DIRECTIONS';
const ADD_DOT = 'main/ADD_DOT';
const REMOVE_DOT = 'main/REMOVE_DOT';
const REORDER_LIST = 'main/REORDER_LIST';
const SET_CENTER = 'main/SET_CENTER';
const ADD_DIRECTION = 'main/ADD_DIRECTION';
const REMOVE_DIRECTION = 'main/REMOVE_DIRECTION';

type InitialStateType ={
    dots: Array<DotType>,
    directions: Array<DirectionType>,
    center: {
        lat: number,
        lng: number
    }
}

export const initialState: InitialStateType = {
    dots: [],
    directions: [],
    center: {
        lat: 0,
        lng: 0
    },
};

const mainReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
                    //@ts-ignore
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

type ActionsType = changeCoordsFromMapActionType | updateDirectionsActionType | addDotActionType | addDiectionActionType
| removeDotActionType | reOrder | setCenterActionType | removeDirectionActionType

type changeCoordsFromMapActionType = {
    type: typeof CHANGE_DRAGGABLE_MAP_DOT,
    payload: {
        lat: number,
        lng: number,
        id: number
    }
}

export const changeCoordsFromMap = (lat: number, lng: number, id: number): changeCoordsFromMapActionType => {
    return {
        type: CHANGE_DRAGGABLE_MAP_DOT,
        payload: {lat, lng, id}
    }
};

type updateDirectionsActionType = {
    type: typeof UPDATE_DIRECTIONS
};

export const updateDirections = (): updateDirectionsActionType => {
    return {
        type: UPDATE_DIRECTIONS
    }
};

type addDotActionType = {
    type: typeof ADD_DOT,
    payload: {
        lat: number,
        lng:number,
        address: string
    }
};

export const addDot = (lat: number, lng: number, address: string): addDotActionType => {
    return {
        type: ADD_DOT,
        payload: {lat, lng, address}
    }
};

type addDiectionActionType = {
    type: typeof ADD_DIRECTION,
    payload: {
        lat: number,
        lng: number
    }
}

export const addDirection = (lat: number, lng: number): addDiectionActionType => {
    return {
        type: ADD_DIRECTION,
        payload: {lat, lng}
    }
};

type removeDotActionType = {
    type: typeof REMOVE_DOT,
    payload: {id: number}
};

export const removeDot = (id: number): removeDotActionType => {
    return {
        type: REMOVE_DOT,
        payload: {id}
    }
};

type removeDirectionActionType = {
    type: typeof REMOVE_DIRECTION,
    payload: number
}

export const removeDirection = (id: number): removeDirectionActionType => {
    return {
        type: REMOVE_DIRECTION,
        payload: id
    }
};

type reOrder = {
    type: typeof REORDER_LIST,
    payload: {
        destination: number,
        source: number
    }
}

export const reOrder = (destination: number, source: number):reOrder => {
    return {
        type: REORDER_LIST,
        payload: {destination, source}
    }
};

type setCenterActionType = {
    type: typeof SET_CENTER,
    payload: {
        lat: number,
        lng:number
    }
}

export const setCenter = (lat: number, lng: number): setCenterActionType => {
    return {
        type: SET_CENTER,
        payload: {
            lat,
            lng
        }
    }
};

export const addDotTC = (lat: number, lng: number, address: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(addDot(lat, lng, address));
        dispatch(addDirection(lat, lng));
    }
};

export const changeCoordsFromMapTC = (lat: number, lng: number, id: number) => {
    return (dispatch: Dispatch<ActionsType>) => {
        let promise = dispatch(changeCoordsFromMap(lat, lng, id));
        Promise.all([promise])
            .then(() => {
                dispatch(updateDirections());
            });
    }
};

export const removeDotTC = (id: number) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(removeDot(id));
        dispatch(removeDirection(id));
    }
};
export const reOrderTC = (destination: number, source: number) => {
    return (dispatch: Dispatch<ActionsType>) => {
        let promise = dispatch(reOrder(destination, source));
        Promise.all([promise])
            .then(() => {
                dispatch(updateDirections());
            });
    }
};


