import { forwardRef } from 'react';

const Player = forwardRef<HTMLVideoElement, { url: string }>(({ url }, ref) => {

    return <video ref={ref} src={url} controls
      className='video-element'
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        position: 'absolute',
        boxSizing: 'border-box',
      }}
    />;
});

export default Player;