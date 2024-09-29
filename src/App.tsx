import { useEffect, useRef, useCallback } from 'react';
import EventList from './Components/EventList';
import { Box } from '@mui/material';
import { loadVideo, loadEvents, loadResources } from './resourseLoader';
import config from './config';
import { setEventsList, setCurrentEvents } from './redux/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Video from './Components/Video';
import type { EventType } from './types';
import { RootState } from './redux/store/store';

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoComponentRef = useRef(null); // Ref for the Video component
  const eventsList = useSelector((state: RootState) => state.ui.eventsList);
  const currentEvents = useSelector((state: RootState) => state.ui.currentEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    loadResources(
      loadVideo(videoRef),
      loadEvents(config.eventsURL)
        .then((events) => {
          dispatch(setEventsList([events[0], events[1], events[2]]));
        })
    )
      .catch((error) => {
        console.error('Error loading resources:', error);
      });
  }, [dispatch]);

  const getCurrentEvents = useCallback((events: EventType[], currentTime: number) => {
    return events.filter((event) => {
      const eventStart = event.timestamp;
      const eventEnd = event.timestamp + event.duration;
      return eventStart <= Number(currentTime.toFixed(4)) && eventEnd >= currentTime;
    });
  }, []);

  const handleTimeUpdate = useCallback((event: Event) => {
    const currentTime = (event.target as HTMLVideoElement).currentTime;
    const actualEvents = getCurrentEvents(eventsList, currentTime);
    if (JSON.stringify(actualEvents) !== JSON.stringify(currentEvents)) {
      dispatch(setCurrentEvents(actualEvents));
      if (videoComponentRef.current && 'renderOverlay' in videoComponentRef.current) {
        (videoComponentRef.current as { renderOverlay: (events: EventType[]) => void }).renderOverlay(actualEvents);
      }
    }
  }, [eventsList, currentEvents, getCurrentEvents, dispatch]);

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [handleTimeUpdate]);

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      boxSizing: 'border-box',
      flexDirection: 'column',
    }}>
      <Video
        url={config.videosURL}
        videoRef={videoRef}
        ref={videoComponentRef}
      />
      <EventList videoRef={videoRef} />
    </Box>
  );
}

export default App;