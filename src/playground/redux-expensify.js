import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE 
const addExpense = (
    {description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0} = {}) =>({
    type: 'ADD_EXPENSE',
    expense:{
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
//REMOVE_EXPENSE 
const removeExpense = ({id} = {}) =>({
    type: 'REMOVE_EXPENSE',
    id
});
//EDIT_EXPENSE
const editExpense = (id, updates) =>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
//SET_TEXT_FILTER 
const setTextFilter = (text = '') =>({
    type: 'SET_TEXT_FILTER',
    text
});
//SORT_BY_DATE 
const sortByDate = () =>({
    type: 'SORT_BY_DATE',
});
//SORT_BY_AMOUNT 
const sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT',
});
//SET_START_DATE 
const setStartDate = (date) =>({
    type: 'SET_START_DATE',
    date
});
//SET_END_DATE
const setEndDate = (date) =>({
    type: 'SET_END_DATE',
    date
});

//EXPENSES REDUCER
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id){
                    return{
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }             
            })
        default:
            return state;
    }
};

//FILTERS REDUCER
const filtersReducerDefaultState = {
    text: '',
    sortBy: '',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.date
            };
        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.date
            };
        default:
            return state;
    }
};
//GET VISABLE EXPENSES
const getVisableExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1; 
        } else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};


//STORE CREATION
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);



store.subscribe(() => {
    const state = store.getState();
    const visableExpenses = getVisableExpenses(state.expenses, state.filters);
    console.log(visableExpenses);
});

const expense1 = store.dispatch(addExpense({description: 'Rent', amount: 1000, createdAt: -1000}));
const expense2 = store.dispatch(addExpense({description: 'Tea', amount: 500, createdAt: 1000}));
//store.dispatch(removeExpense({id: expense1.expense.id}));
store.dispatch(editExpense(expense2.expense.id, {amount: 50}));
store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter(''));
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
//store.dispatch(setTextFilter('rent'));
//store.dispatch(setStartDate(-1500));
//store.dispatch(setEndDate(0));


console.log('FINAL STATE', store.getState());


const demoState = {
    expenses: [{
        id: '001',
        description: 'Jan Rent',
        note: 'Fuck UV',
        amount: 62000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //Date or amount
        startDate: undefined,
        endDate: undefined
    }
};
