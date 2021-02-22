/* eslint-disable no-undef */
import React from 'react';
import Loading from './index.js';

it('test loading component', () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper).toMatchSnapshot();
});
