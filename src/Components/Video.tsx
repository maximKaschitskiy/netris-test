import Player from './Player';
import Overlay from './Overlay';
import { Box } from '@mui/material';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { EventType } from '../types';

const Video = forwardRef(({ url, videoRef }: { url: string, videoRef: React.RefObject<HTMLVideoElement> }, ref) => {
  const overlayRef = useRef(null);

  useImperativeHandle(ref, () => ({
    renderOverlay: (events: EventType[]) => {
      if (overlayRef.current && 'render' in overlayRef.current) {
        (overlayRef.current as { render: (events: EventType[]) => void }).render(events);
      }
  }}));

  return (
    <Box
      style={{
        width: '100%',
        height: '50%',
        position: 'relative',
      }}
      className='video-wrapper'
    >
      <Overlay ref={overlayRef} />
      <Player url={url} ref={videoRef} />
    </Box>
  );
});

export default Video;