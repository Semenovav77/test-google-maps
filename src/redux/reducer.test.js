import mainReducer, {addDirection, addDot, removeDot} from "./mainReducer";
// for testing of reducer should be changed crypto in Action ADD_DOT
let state = {
    dots: [
        {
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
        }
    ],
    directions: [
        {lat: 56.6402225, lng: 47.883858},
        {lat: 55.8722768, lng: 48.356852},
        {lat: 56.3294182, lng: 46.5530163}
    ],
    center: {lat: 0, lng: 0},
    id: '1'
};

test('length of dot should be inc', () => {
    //1. test data
    let action = addDot(55, 45, "Test");

    //2.action
    let newState = mainReducer(state,action);

    //3.expectation
    expect(newState.dots.length).toBe(4);
});

test('address of new dot shuold be "Test"', () => {
    //1. test data
    let action = addDot(55, 45, "Test");

    //2.action
    let newState = mainReducer(state,action);

    //3.expectation
    expect(newState.dots[3].address).toBe('Test');
});

test('length of dots should be decremented after deleting', () => {
    //1. test data
    let action = removeDot(1);

    //2.action
    let newState = mainReducer(state,action);

    //3.expectation
    expect(newState.dots.length).toBe(2);
});

test('length of dots not should be decremented after deleting dot with incorrect id', () => {
    //1. test data
    let action = removeDot(54);

    //2.action
    let newState = mainReducer(state,action);

    //3.expectation
    expect(newState.dots.length).toBe(3);
});

test('length of directions  should be inremented after adding direction', () => {
    //1. test data
    let action = addDirection(54, 54);

    //2.action
    let newState = mainReducer(state,action);

    //3.expectation
    expect(newState.directions.length).toBe(4);
});

test('lat and lng of directions should be 54, 54 ', () => {
    //1. test data
    let action = addDirection(54, 54);

    //2.action
    let newState = mainReducer(state,action);

    //3.expectation
    expect(newState.directions[3].lat).toBe(54);
    expect(newState.directions[3].lng).toBe(54);
});
