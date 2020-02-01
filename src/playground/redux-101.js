import {createStore} from 'redux';
console.log("REDUX 101");

const incrementCount = ({incrementBy = 1} = {}) => ({
        type: 'INCREMENT',
        incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({set = 1} = {}) => ({
    type: 'SET',
    set
});

const resetCount = () => ({
    type: 'RESET',
});

const store = createStore((state = {count: 0}, action) => {
    switch(action.type){
        case 'INCREMENT':
             return{
            count: state.count + action.incrementBy
        };
        case 'DECREMENT':
            return{
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return{
                count: state.count = 0
            };
        case 'SET':
            return{
                count: action.set
            }
        default:
            return state;
    }
});

const unsubscribe = store.subscribe(() => {
console.log(store.getState());
});

store.dispatch(incrementCount());
store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 2}));
store.dispatch(setCount({set: 100}));
store.dispatch(resetCount());

// store.dispatch({
//     type: 'SET', count: 10
// });

