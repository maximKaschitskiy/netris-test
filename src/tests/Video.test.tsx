import { render } from '@testing-library/react';
import Video from '../Components/Video';

describe('Video Component', () => {
  test('renders Player and Overlay components', () => {
    const url = 'http://example.com/video.mp4';
    const videoRef = { current: null };

    const { container } = render(<Video url={url} videoRef={videoRef} />);
    
    const videoElement = container.querySelector('.video-element');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', url);
    
    const overlayElement = container.querySelector('.video-element');
    expect(overlayElement).toBeInTheDocument();
  });
});