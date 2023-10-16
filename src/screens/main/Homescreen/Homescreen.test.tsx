import React from 'react';
import Homescreen from './Homescreen';
import {render, fireEvent, screen} from '@testing-library/react-native';

// test('testing test', () => {
//   expect(true).toBe(true);
// });

// describe(Homescreen, () => {
//   it('should render the TextHeader', function () {
//     const {getByTestId} = render(<Homescreen />);
//     const headerText = getByTestId('headertext');
//     expect(headerText).toBeTruthy();
//   });

//   it('should render the TextHeader correctly', function () {
//     const {getByText} = render(<Homescreen />);
//     const headerText = getByText('TECH STACK FOR THIS PROJECT');
//     expect(headerText).toBeTruthy();
//   });

//   it('should render the TextHeader', function () {
//     const {getByTestId} = render(<Homescreen />);
//     fireEvent.press(getByTestId('themeswitch'));
//   });

//   //   test('renders a list of users', async () => {
//   //     render(<Homescreen />);

//   //     const users = await screen.findAllByRole('listItem');
//   //     expect(users).toHaveLength(3);
//   //   });
// });
