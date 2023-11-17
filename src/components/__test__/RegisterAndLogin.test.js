import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonalInfoOther from '../PersonalInfoOther'; // Assuming this is the correct path to your component

describe('PersonalInfoOther Component', () => {
    const mockProfile = {
        username: 'TestUser',
        country: 'TestCountry',
        avatar: '/images/avatar/profile.png',
        // Other necessary profile data
    };

    const followHandler = jest.fn();
    const unfollowHandler = jest.fn();

    test('Renders profile information and follow button', () => {
        const { getByText } = render(
            <PersonalInfoOther profileData={mockProfile} iffollowed={false} followHandler={followHandler} unfollowHandler={unfollowHandler} />
        );
        expect(getByText('TestUser')).toBeInTheDocument(); // Replace 'TestUser' with actual username
        expect(getByText('TestCountry')).toBeInTheDocument(); // Replace 'TestCountry' with actual country
        expect(getByText('FOLLOW')).toBeInTheDocument();
    });

    test('Clicking Follow/Unfollow button should trigger appropriate handler', () => {
        const { getByText } = render(
            <PersonalInfoOther profileData={mockProfile} iffollowed={false} followHandler={followHandler} unfollowHandler={unfollowHandler} />
        );
        fireEvent.click(getByText('FOLLOW'));
        expect(followHandler).toHaveBeenCalled();
        fireEvent.click(getByText('UNFOLLOW'));
        expect(unfollowHandler).toHaveBeenCalled();

    });

});
