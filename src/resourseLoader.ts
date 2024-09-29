import type { EventType } from './types';
import { nanoid } from 'nanoid';
import moment from 'moment';

const loadVideo = (
    ref: React.RefObject<HTMLVideoElement>
  ) => new Promise<void>((resolve, reject) => {
    const video = ref.current;
    if (video) {
        const handleLoadedData = () => {
            resolve();
        };

        const handleError = (error: Event) => {
            reject(error);
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleError);
        };
    } else {
        reject(new Error('Video element not found'));
    }
});

const loadEvents = (url: string): Promise<EventType[]> => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const events = data.map((event: EventType) => ({
                    ...event,
                    id: event.id || nanoid(),
                    selected: false,
                    timestampSeconds: moment.utc(event.timestamp * 1000).format('HH:mm:ss.SSS'),
                    durationSeconds: moment.utc(event.duration * 1000).format('HH:mm:ss.SSS'),
                    zone: Object.fromEntries(
                        Object.entries(event.zone).map(([key, value]) => [key, Math.round(value)])
                    ),
                    timestamp: Number(event.timestamp.toFixed(4)),
                    duration: Number(event.duration.toFixed(4))
                }))
                .sort((a: EventType, b: EventType) => a.timestamp - b.timestamp);
                resolve(events);
            })
            .catch(error => reject(error));
    });
};

const loadResources = async (...requests: (Promise<void | EventType[]>)[]) => {
    await Promise.all([...requests]);
}

export { loadVideo, loadEvents, loadResources };