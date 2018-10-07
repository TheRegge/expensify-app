import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => (
    <div>
    Viewing {props.expenses.length} expense{props.expenses.length > 1 ? 's':''}.
        Total: {
            numeral(props.expensesTotal/100).format('$0,0.00')}
    </div>
);


const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        expensesTotal: expensesTotal(selectExpenses(state.expenses,state.filters))
    };
};

export default connect(mapStateToProps)(ExpensesSummary);