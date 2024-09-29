import type { Moment } from "moment"

type EventType = {
    timestamp: number,
    duration: number,
    zone: {
        left: number,
        top: number,
        width: number,
        height: number
    },
    id?: string
    selected?: boolean
    localProgress?: number
    timestampSeconds?: Moment
    durationSeconds?: Moment
}

type UIType = {
    paused: boolean,
    currentTime: 0,
    width: 0,
    height: 0,
    eventsList: EventType[],
    currentEvents: EventType[],
}

export type { EventType, UIType }