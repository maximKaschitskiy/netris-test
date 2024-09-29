import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import config from '../config';
import type { EventType } from '../types';

const Overlay = forwardRef((_props, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const context = canvasRef.current?.getContext('2d');

    const drawEvents = (events: EventType[]) => {
        if (context && events.length !== 0) {
            events.forEach((event) => {
                context.strokeRect(event.zone.left, event.zone.top, event.zone.width, event.zone.height);
            });
        }
    };

    const clearCanvas = () => {
        if (context) {
            context.clearRect(0, 0, config.resoulution.width, config.resoulution.height);
        }
    };

    useEffect(() => {
        if (context && canvasRef.current) {
            canvasRef.current.width = config.resoulution.width;
            canvasRef.current.height = config.resoulution.height;

            context.strokeStyle = 'red';
            context.lineWidth = 10;
        }
    }, [context]);

    const render = (events: EventType[]) => {
        if (context && canvasRef.current) {
            clearCanvas();
            drawEvents(events);
        }
    };

    useImperativeHandle(ref, () => ({
        render,
    }));

    return (
        <canvas ref={canvasRef}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 1,
                objectFit: 'contain',
                boxSizing: 'border-box',
                pointerEvents: 'none',
            }}
            className='overlay'
        ></canvas>
    );
});

export default Overlay;