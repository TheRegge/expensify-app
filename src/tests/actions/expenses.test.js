import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// Create the config
const createMockStore = configureMockStore([thunk]);

// Write some data to the test database for before
// each test. Using `done` to make sure the data is
// written (async) before the test runs.
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount , createdAt};
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from Firebase', (done) => {
    // Below, creating the store:
    // looks like we don't need to pass expenses to the store
    // because the test doesn't care if the expense
    // is removed or not from the redux store. Just care for Firebase
    const store = createMockStore({expenses});
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense({id}))
    .then(() => {
        // check that the last action on the store
        // was the 'REMOVE_EXPENSE' action with the correct id:
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        // then check if the expense was removed from Firebase:
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });;
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { note: 'New note value'}
    });
});

test('should setup addExpense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

// Testing Asychronous action generators
// will need to use redux-mock-store to mock
// the redux store.
// Because it is async, we need to pass 'done' to 
// the function to catch async calls. It resolves the
// test only after we call done()
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };
    // Using promises method chainning by having promises
    // return promises, so the next then is the callback of 
    // a resolved promise.
    store.dispatch(startAddExpense(expenseData)).then(() => {
        // Get all actions dispatchd to the mock store
        const actions = store.getActions(); // returns an array of actions
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        // here we 'return' the ref call, which is a promise itself. So we
        // are returning a promise so we can use a non-nested 'then' call
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });;
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {};
    const defaultExpenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpenseData);
        done();
    });;
});

// this on is NOT async
test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from Firebase', (done) => {
    // First create the empty mock store
    // that will be filled by Firebase:
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses // those were seeded in the beforeEach, so they should be returned here by Firebase
        });
        done();
    });
});

