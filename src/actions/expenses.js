import uuid from 'uuid';


// ADD_EXPENSE ACTION GENERATOR
export const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(), // this would be given by database... 
        description,
        note,
        amount,
        createdAt
    }
});

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