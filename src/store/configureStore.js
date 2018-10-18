import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        // if we were not using the redux dev tools, we could
        // just add:
        // applyMiddleware(thunk)
        // but it wouldn't work, this is why we need to use
        // the extra code with const composeEnhancers using 'compose' from redux.
        // so we instead have to wrap applyMiddleware like so:
        composeEnhancers(applyMiddleware(thunk))

        // arg below is to work with redux dev tools in chrome
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}
