import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import type { EventType } from '../types';
import { useEffect, useRef } from 'react';

export default function EventList({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) {
  const eventsList = useSelector((state: RootState) => state.ui.eventsList);
  const currentEvents: EventType[] = useSelector((state: RootState) => state.ui.currentEvents);
  const listItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleListItemClick = (
    eventObjet: EventType,
    videoRef: React.RefObject<HTMLVideoElement>
  ) => {
    if (videoRef.current) {
      videoRef.current.currentTime = eventObjet.timestamp;
    }
  };

  const isSelected = (events: EventType[], event: EventType) => {
    return events.some((currentEvent) => currentEvent.id === event.id);
  };

  useEffect(() => {
    const firstSelectedIndex = eventsList.findIndex(event => isSelected(currentEvents, event));
    if (firstSelectedIndex !== -1 && listItemRefs.current[firstSelectedIndex]) {
      listItemRefs.current[firstSelectedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentEvents, eventsList]);

  return (
    <List
      className='list-wrapper'
      sx={{ width: '100%', height: '50%', bgcolor: 'background.paper', overflow: 'auto', boxSizing: 'border-box' }}>
      {eventsList.map((eventObjet, index) => (
        <ListItemButton
          selected={isSelected(currentEvents, eventObjet)}
          onClick={() => handleListItemClick(eventObjet, videoRef)}
          key={eventObjet.id}
          ref={el => listItemRefs.current[index] = el}
        >
          <ListItemText
            primary={eventObjet.timestampSeconds?.toString() || ''}
            secondary={eventObjet.durationSeconds?.toString() || ''}
          />
        </ListItemButton>
      ))}
    </List>
  );
}