import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import AdminManage from '../AdminManage/index.js'; // Assuming this is the path to your component file

// Mock axios and its methods
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [{ _id: 1, username: 'TestUser', country: 'TestCountry', gender: 'TestGender', userType: 'TestUserType' }] })),
    delete: jest.fn(() => Promise.resolve({ data: { message: 'User deleted successfully' } })),
}));

describe('AdminManage Component', () => {
    it('renders table rows with user data', async () => {
        const { getByText } = render(<AdminManage />);

        // Wait for component to fetch users (mocked response)
        await waitFor(() => {
            expect(getByText('TestUser')).toBeInTheDocument();
            expect(getByText('TestCountry')).toBeInTheDocument();
            expect(getByText('TestGender')).toBeInTheDocument();
            expect(getByText('TestUserType')).toBeInTheDocument();
        });
    });

    it('deletes user when delete button is clicked', async () => {
        const { getByText } = render(<AdminManage />);

        fireEvent.click(getByText('Delete'));

        // Wait for delete operation (mocked response)
        await waitFor(() => {
            expect(getByText('User deleted successfully')).toBeInTheDocument();
        });
    });
});
