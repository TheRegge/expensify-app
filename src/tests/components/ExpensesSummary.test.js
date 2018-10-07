import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses} expensesTotal={114195} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render singular expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]} expensesTotal={195} />);
    expect(wrapper.find('div').text()).toBe('Viewing 1 expense. Total: $1.95');
});

test('should render plural expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses} expensesTotal={114195} />);
    expect(wrapper.find('div').text()).toBe('Viewing 3 expenses. Total: $1,141.95');
});