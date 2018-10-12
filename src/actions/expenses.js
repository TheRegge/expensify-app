import uuid from 'uuid';
import database from '../firebase/firebase';

// Works this way:
// Synchronous action:
// -------------------
// component call action generator
// action generator returns object
// component dispatches object
// redux store changes

// Asychronous action:
// -------------------
// component call action generator
// action generator returns function
// component dispatches function (use redux-thunk)
// function runs (has the ability to
// dispatch other actions and do 
// whatever it wants).

// ADD_EXPENSE ACTION GENERATOR
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// This below on works because we have
// installed redux-thunk in the 'configureStore.js'
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        // Update firebase data, then dispatch to update the store
        // also, we are returning the call so we can use promises
        // method chainning in the test .then().then(), because when
        // a then returns something, the returned value is available in
        // the next then()... then(return x).then(x)
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
}


// REMOVE_EXPENSE ACTION GENERATOR
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE ACTION GENERATOR
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});