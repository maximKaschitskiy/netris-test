import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Player from '../Components/Player';

describe('Player Component', () => {
  test('renders video element with correct attributes', () => {
    const url = 'http://example.com/video.mp4';
    const { container } = render(<Player url={url} />);
    const videoElement = container.querySelector('.video-element');
    expect(videoElement).toBeTruthy();
    expect(videoElement).toHaveAttribute('src', url);
    expect(videoElement).toHaveAttribute('controls');
  });
});