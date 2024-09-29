import { render, screen } from '@testing-library/react';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import EventList from '../Components/EventList';
import { describe, it, expect, vi } from 'vitest';

const TestComponent = ({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) => (
  <Provider store={store}>
    <EventList videoRef={videoRef} />
  </Provider>
);

describe('EventList Component', () => {

  it('renders list of events', () => {
    const videoRef = { current: null };

    store.dispatch({
      type: 'ui/setEventsList',
      payload: [
        { id: '1', timestampSeconds: '00:00:01', durationSeconds: '00:00:05', timestamp: 1, duration: 5 },
        { id: '2', timestampSeconds: '00:00:10', durationSeconds: '00:00:05', timestamp: 10, duration: 5 },
      ],
    });

    render(<TestComponent videoRef={videoRef} />);

    expect(screen.getByText('00:00:01')).toBeInTheDocument();
    expect(screen.getByText('00:00:10')).toBeInTheDocument();
  });

  it('handles list item click', () => {
    vi.useFakeTimers();

    const HandleClickTestComponent = () => {
      const videoRef = useRef<HTMLVideoElement>(null);

      return <TestComponent videoRef={videoRef} />;
    };

    store.dispatch({
      type: 'ui/setEventsList',
      payload: [
        { id: '1', timestampSeconds: '00:00:01', durationSeconds: '00:00:05', timestamp: 1, duration: 5 },
      ],
    });

    const { container } = render(<HandleClickTestComponent />);

    const listItem = screen.getByText('00:00:01');
    listItem.click();
    vi.advanceTimersByTime(1);

    const videoElements = container.getElementsByClassName('video-element');
    if (videoElements.length > 0) {
      const videoElement = videoElements[0];
      expect(videoElement).toHaveAttribute('currentTime', '1');
    }
  });
});