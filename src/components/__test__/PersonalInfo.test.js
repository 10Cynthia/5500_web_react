import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PersonalInfo from '../PersonalInfo';
import {useSelector} from "react-redux"; // Assuming this is the correct path to your component

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('PersonalInfo Component', () => {
    beforeEach(() => {
        useSelector.bind({
            profile: {
                username: 'TestUser',
                avatar: '/images/avatar/profile.png',
                // Other necessary profile data
            },
        });
    });

    test('Renders with profile information', () => {
        const { getByText, getByPlaceholderText } = render(<PersonalInfo login country_="TestCountry" />);
        expect(getByText('TestUser')).toBeInTheDocument(); // Replace 'TestUser' with actual username
        expect(getByText('Country')).toBeInTheDocument();
        expect(getByPlaceholderText('Country')).toBeInTheDocument();
    });

    test('Clicking Edit button should trigger edit mode', () => {
        const { getByText } = render(<PersonalInfo login />);
        fireEvent.click(getByText('Edit'));
        expect(getByText('Country')).toBeInTheDocument();
    });

    test('Submitting form should trigger handleSubmit function', async () => {
        const { getByText, getByPlaceholderText } = render(<PersonalInfo login />);
        fireEvent.click(getByText('Edit'));
        fireEvent.change(getByPlaceholderText('Country'), { target: { value: 'NewCountry' } });
        fireEvent.click(getByText('Submit'));

        // You might need to wait for async operations to complete
        await waitFor(() => {
            // Assertions based on expected behavior after form submission
        });
    });

    // Write additional tests for other functionality as needed
});
