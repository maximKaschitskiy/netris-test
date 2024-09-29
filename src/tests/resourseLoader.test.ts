import { loadVideo, loadEvents } from '../resourseLoader';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { Mock } from 'vitest';

describe('Resource Loader', () => {
  describe('loadVideo', () => {
    it('resolves when video data is loaded', async () => {
      const mockVideoElement = document.createElement('video');
      const mockRef = { current: mockVideoElement };

      const promise = loadVideo(mockRef);
      mockVideoElement.dispatchEvent(new Event('loadeddata'));

      await expect(promise).resolves.toBeUndefined();
    });

    it('rejects when video element is not found', async () => {
      const mockRef = { current: null };

      await expect(loadVideo(mockRef)).rejects.toThrow('Video element not found');
    });

    it('rejects on video error', async () => {
      const mockVideoElement = document.createElement('video');
      const mockRef = { current: mockVideoElement };

      const promise = loadVideo(mockRef);
      mockVideoElement.dispatchEvent(new Event('error'));

      await expect(promise).rejects.toBeInstanceOf(Event);
    });
  });

  describe('loadEvents', () => {
    beforeEach(() => {
      global.fetch = vi.fn();
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    it('fetches and processes events successfully', async () => {
      const mockResponse = [
        { id: '1', timestamp: 1620000000, duration: 60, zone: { x: 1.5, y: 2.5 } },
        { id: '2', timestamp: 1620000060, duration: 30, zone: { x: 3.5, y: 4.5 } },
      ];

      (global.fetch as Mock).mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      const events = await loadEvents('http://example.com/events');

      expect(events).toHaveLength(2);
      expect(events[0]).toHaveProperty('id', '1');
      expect(events[0]).toHaveProperty('timestampSeconds', '00:00:00.000');
      expect(events[0]).toHaveProperty('durationSeconds', '00:01:00.000');
      expect(events[0]).toHaveProperty('zone', { x: 2, y: 3 });
      expect(events[1]).toHaveProperty('id', '2');
    });

    it('rejects on fetch error', async () => {
      (global.fetch as Mock).mockRejectedValueOnce(new Error('Fetch error'));

      await expect(loadEvents('http://example.com/events')).rejects.toThrow('Fetch error');
    });
  });
});