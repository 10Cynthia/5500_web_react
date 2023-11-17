import React from 'react';
import { render } from '@testing-library/react';
import LikedVideo from '../LikedVideo';
import {useSelector} from "react-redux";

// Mocking useSelector from react-redux
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

describe('LikedVideo Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    const myString: string = 'example';

    useSelector.mockReturnValue = function (mockLikes) {
        return { likes: mockLikes };
    };
    it('renders liked videos correctly', () => {
        const mockLikes = [
            { videoId: 1, title: 'Video Title 1', channel: 'Channel 1' },
            { videoId: 2, title: 'Video Title 2', channel: 'Channel 2' },
        ];

        // Mock useSelector hook
        useSelector.mockReturnValue({ likes: mockLikes });

        const { getByText } = render(<LikedVideo />);

        expect(getByText('Videos Liked')).toBeInTheDocument();

        // Check if Video titles and Channel names are rendered
        expect(getByText('Video Title 1')).toBeInTheDocument();
        expect(getByText('Channel 1')).toBeInTheDocument();
        expect(getByText('Video Title 2')).toBeInTheDocument();
        expect(getByText('Channel 2')).toBeInTheDocument();
    });

    it('renders "No videos liked" message when there are no likes', () => {
        // Mock useSelector hook with empty likes array
        useSelector.mockReturnValue({ likes: [] });

        const { getByText } = render(<LikedVideo />);

        expect(getByText('Videos Liked')).toBeInTheDocument();
        expect(getByText('No videos liked')).toBeInTheDocument();
    });
});
