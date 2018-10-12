// Expenses Reducer
const expensesReducerDefaultState = [];
export default (state=expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        // remove all existing expenses in store and 
        // add a new set of expenses passed
        // in the action (the expenses fetched from
        // firebase) So basically, it loads expenses
        // from Firebase db:
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};
