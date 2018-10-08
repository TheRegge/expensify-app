import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';


test('should render singular expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={195} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render multiple expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={114195} />);
    expect(wrapper).toMatchSnapshot();
});