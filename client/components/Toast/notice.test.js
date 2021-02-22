/* eslint-disable no-undef */
import "babel-polyfill";
import React from 'react';
import Notice from './Notice';

jest.useFakeTimers();
test('toast component animation', async () => {
  const notice = shallow(<Notice />);
  const instance = notice.instance();
  jest.runAllTimers();
  notice.update();
  expect(notice).toMatchSnapshot();
  await instance.componentWillUnmount();
  expect(notice).toMatchSnapshot();
});
test('toast component with content', () => {
  const notice = shallow(<Notice content="test content" />);
  expect(notice).toMatchSnapshot();
});
test('toast component with nomask', () => {
  const notice = shallow(<Notice mask={false} />);
  expect(notice).toMatchSnapshot();
});
